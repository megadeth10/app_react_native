import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon } from 'native-base';
import CategoryData from '../navigation/RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from '../navigation/NavigationService';
import MapView from 'react-native-maps';

const propTypes = {
}

const defaultProps = {
}
//Todo Google Map으로 다시 해봐야함.  https://github.com/react-community/react-native-maps/blob/master/docs/installation.md
class StoreDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storeItem: {},
            mapVisable: false
        }
        this.compId = props.navigation.getParam("compId", "");
        this.venId = props.navigation.getParam("venId", "");
    }

    componentDidMount() {
        if (this.venId) {
            this.getData()
        }
    }

    render() {
        const { storeItem } = this.state;

        if (_.isEmpty(storeItem)) {
            return null;
        }
        const { width, height } = Dimensions.get('window');
        const title = _.get(storeItem, "vendorDetail.venNm");
        const lat = _.get(storeItem, "vendorDetail.latitude");
        const lon = _.get(storeItem, "vendorDetail.longitude");
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
                            <Title style={ { color: "#000000", paddingLeft: 20 } }>{ title ? title : "" }</Title>
                        </Body>
                    </Header>
                    <Content>
                        <View>
                            <Button onPress={ this.ToggleMapView } >
                                <Text>mapView</Text>
                            </Button>
                            <Text>{ JSON.stringify(this.state.storeItem) }</Text>
                        </View>
                    </Content>
                </Container>
                <View style={ {
                    display: this.state.mapVisable ? "flex" : "none",
                    position: this.state.mapVisable ? "absolute" : "relative",
                    flex: 1,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'red',
                    opacity: 0.3
                } }>
                    <Button transparent onPress={ this.ToggleMapView } >
                        <Icon name='arrow-back' />
                    </Button>
                    <MapView
                        initialRegion={ {
                            latitude: lat,
                            longitude: lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        } }
                        mapType="standard"
                        style={ { width, height, flex: 1 } }
                        zoomEnabled={ false }>
                        {/* <MapView.Marker coordinate={ {
                            latitude: lat,
                            longitude: lon
                        } } title="aaa" description="aaa"/> */}
                    </MapView>
                </View>
            </View>
        );
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

                const { storeItem } = this.state;
                this.setState({
                    storeItem: update(storeItem, {
                        $set: result
                    })
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