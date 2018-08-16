import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon } from 'native-base';
import CategoryData from '../navigation/RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from '../navigation/NavigationService';
import VenderMapView from '../view/VenderMapView';
import ImagePagerView from '../view/ImagePagerView';
import ScrollTopView from '../view/ScrollTopView';
const propTypes = {
}

const defaultProps = {
}

const INTERVAL_TIME = 5000;

//Todo Google Map으로 다시 해봐야함.  https://github.com/react-community/react-native-maps/blob/master/docs/installation.md
class StoreDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storeItem: {},
            mapVisable: false,
            headerItems: []
        }
        this.compId = props.navigation.getParam("compId", "");
        this.venId = props.navigation.getParam("venId", "");
    }

    componentDidMount() {
        if (this.venId) {
            this.getData()
        }

        //Screen state값 lifecycle과 유사함.
        this.didFocus = this.props.navigation.addListener('didFocus', payload => {
            this.timer = setInterval(this.pagerTimer, INTERVAL_TIME);
        });

        //Screen state값 lifecycle과 유사함.
        this.didBlur = this.props.navigation.addListener('didBlur', payload => {
            if (this.timer) {
                clearInterval(this.timer);
            }
        });
    }

    componentWillUnmount() {
        //timer와 screen lifecycle callback 제거
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.didFocus) {
            this.didFocus.remove();
        }
        if (this.didBlur) {
            this.didBlur.remove();
        }
    }

    render() {
        const { storeItem, mapVisable, headerItems } = this.state;

        if (_.isEmpty(storeItem)) {
            return null;
        }

        const lat = _.get(storeItem, "vendorDetail.latitude");
        const lon = _.get(storeItem, "vendorDetail.longitude");
        const title = _.get(storeItem, "vendorDetail.venNm");
        return (
            <View style={ style.rootView }>
                <Container style={ { backgroundColor: "#ffffff" } }>
                    <Header style={ { backgroundColor: "#fdd002" } }>
                        <Left>
                            <Button transparent onPress={ this.onBackPress } >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={ { color: "#000000" } }>{ title ? title : "" }</Title>
                        </Body>
                    </Header>
                    <ScrollView ref="scrollView"
                        onScroll={ this.onScroll }>
                        { headerItems.length > 0 ?
                            <ImagePagerView
                                ref="pagerRef"
                                items={ headerItems }
                                height={ 150 }
                            /> : null }
                        <Button onPress={ this.ToggleMapView } >
                            <Text>mapView</Text>
                        </Button>
                        <Button onPress={ this.setScroll }
                            onLayout={ this.onLayout }>
                            <Text>move scroll</Text>
                        </Button>
                        <Text>{ JSON.stringify(storeItem) }</Text>
                    </ScrollView>
                </Container>
                <ScrollTopView ref="topView" layoutPosition="right" callTop={this.onTop} />
                <VenderMapView location={ { lat, lon } }
                    visable={ mapVisable }
                    callback={ this.ToggleMapView }
                    title={ title } />
            </View>
        );
    }

    onTop = () => {
        this.refs.scrollView.scrollTo({ x: 0, y: 0 });
    }

    onScroll = (e) => {
        if(this.refs.topView){
            this.refs.topView.onChangeScroll(e);
        }
    }

    onLayout = (e) => {
        const { layout } = e.nativeEvent;
        this.scrollHeight = layout.y;
    }

    //interval timer callback
    pagerTimer = () => {
        try {
            if (this.refs.pagerRef) {
                this.refs.pagerRef.nextPage();
            }
        } catch (err) {
            console.error(err);
        }
    }

    setScroll = (e) => {
        this.refs.scrollView.scrollTo({ x: 0, y: this.scrollHeight });
    }

    ToggleMapView = () => {
        const { mapVisable } = this.state;
        this.setState({
            mapVisable: !mapVisable
        });
    }

    onBackPress = () => {
        NavigationService.goBack();
    }

    getData = () => {
        const venId = this.venId;
        const compId = this.compId;

        CategoryData.getVenderDetail({ venId, compId })
            .then(result => {
                if (!result) {
                    return;
                }

                const { storeItem, headerItems } = this.state;

                const fileList = _.get(result, "vendorDetail.fileList");

                let items = [];
                let height = 0;

                if (_.get(fileList, "[5]")) {
                    const url5 = _.get(fileList, "[5]");
                    const url6 = _.get(fileList, "[6]");
                    const url7 = _.get(fileList, "[7]");

                    if (url5 && url5.fileNm) {
                        const item = {
                            url: url5.fileNm,
                        }
                        items.push(item)
                    }
                    if (url6 && url6.fileNm) {
                        const item = {
                            url: url6.fileNm,
                        }
                        items.push(item)
                    }
                    if (url7 && url7.fileNm) {
                        const item = {
                            url: url7.fileNm,
                        }
                        items.push(item)
                    }
                } else {
                    const url4 = _.get(fileList, "[4]");
                    const url0 = _.get(fileList, "[0]");
                    const url1 = _.get(fileList, "[1]");

                    if (url4 && url4.fileNm) {
                        const item = {
                            url: url4.fileNm,
                        }
                        items.push(item)
                    }
                    if (url0 && url0.fileNm) {
                        const item = {
                            url: url0.fileNm,
                        }
                        items.push(item)
                    }
                    if (url0 && url1.fileNm) {
                        const item = {
                            url: url1.fileNm,
                        }
                        items.push(item)
                    }
                }


                this.setState({
                    storeItem: update(storeItem, {
                        $set: result
                    }),
                    headerItems: update(headerItems, {
                        $set: items
                    }),
                })
            })
    }
};

const style = StyleSheet.create({
    rootView: {
        display: "flex",
        flex: 1
    },
});

StoreDetail.defaultProps = defaultProps;
StoreDetail.propTypes = propTypes;

export default StoreDetail;