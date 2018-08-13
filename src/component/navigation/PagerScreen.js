import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';
import NavigationService from './NavigationService';
import CategoryData from './RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import BestVenderView from '../view/BestVenderView';

const propTypes = {
}

const defaultProps = {
}
const BANNER_TYPE = {
    top: "APP_0001",
    main: "APP_0044"
};

const INTERVAL_TIME = 5000;

class PagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topBannerItems: [],
            mainBannerItems: [],
            item: [],
        }
        this.topBannerComp = React.createRef();
        this.mainBannerComp = React.createRef();
        this.topBannerIndex = -1;
        this.mainBannerIndex = -1;
    }

    items = [
        <View style={ styles.pageStyle } key={ 0 }>
            <Image source={ { uri: "http://image.ddingdong.net:8083/event/F0000000000000109513.jpg" } }
                style={ { height: "100%" } }
            />
        </View>,
        <View style={ styles.pageStyle } key={ 1 }>
            <Image source={ { uri: "http://image.ddingdong.net:8083/event/F0000000000000109513.jpg" } }
                style={ { height: "100%" } }
            />
        </View>,
        <View style={ styles.pageStyle } key={ 2 }>
            <Image source={ { uri: "http://image.ddingdong.net:8083/event/F0000000000000109513.jpg" } }
                style={ { height: "100%" } }
            />
        </View>,
    ];

    componentDidMount() {
        const { topBannerItems, mainBannerItems } = this.state;
        if ((topBannerItems.length === 0) ||
            (mainBannerItems.length === 0)) {
            this.getData();
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
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Body>
                        <Title style={ { color: "#000000", paddingLeft: 20 } }>Pager</Title>
                    </Body>
                </Header>
                <ViewPagerAndroid
                    style={ styles.viewPager }
                    onPageSelected={ this.pageSelected }
                    initialPage={ 0 }>
                    { this.state.item }
                </ViewPagerAndroid>
                { this.renderTopPagerData() }
                { this.renderMainPagerData() }
                <Text>베스트 상점</Text>
                <Content>
                    <BestVenderView compid="DD1" />
                </Content>
                <Text>베스트 상점</Text>
                <Content>
                    <BestVenderView compid="DD1" />
                </Content>
            </Container>
        );
    }

    //interval timer callback
    pagerTimer = () => {
        const { topBannerItems, mainBannerItems } = this.state;
        try {
            if (mainBannerItems.length > 0) {
                let nextIndex = this.mainBannerIndex + 1;
                if (nextIndex >= mainBannerItems.length) {
                    nextIndex = 0;
                }
                this.mainBannerIndex = nextIndex;
                this.mainBannerComp.setPage(this.mainBannerIndex);
            }
        } catch (err) {
            console.error(err);
        }
        try {
            if (topBannerItems.length > 0) {
                let nextIndex = this.topBannerIndex + 1;
                if (nextIndex >= topBannerItems.length) {
                    nextIndex = 0;
                }
                this.topBannerIndex = nextIndex;
                this.topBannerComp.setPage(this.topBannerIndex);
            }
        } catch (err) {
            console.error(err);
        }
    }

    //ViewPagerAndroid 오류로 보이는 이슈: render 이후에 topBannerItems update 하면 content가 보이지 않음
    renderTopPagerData = () => {
        const { topBannerItems } = this.state;

        if (topBannerItems.length > 0) {
            return (<ViewPagerAndroid
                ref={ ref => this.topBannerComp = ref }
                style={ styles.topViewPager }
                onPageSelected={ this.onPageTop }
                initialPage={ this.topBannerIndex }>
                { topBannerItems.map((item, index) =>
                    (
                        <View style={ styles.pageStyle } key={ item.normal } >
                            <TouchableOpacity onPress={ (e) => this._onPress(e, item.action) } >
                                <Image source={ { uri: item.normal } } style={ { height: "100%" } } />
                            </TouchableOpacity>
                        </View>
                    )
                ) }
            </ViewPagerAndroid>);
        } else {
            return null;
        }
    }

    _onPress = (e, item) => {
        console.debug(item);
    }

    onPageTop = (e) => {
        console.log(e.nativeEvent.position);
        this.topBannerIndex = e.nativeEvent.position;
    }

    renderMainPagerData = () => {
        const { mainBannerItems } = this.state;

        if (mainBannerItems.length > 0) {
            return (<ViewPagerAndroid
                ref={ ref => this.mainBannerComp = ref }
                style={ styles.mainViewPager }
                onPageSelected={ this.onPageMain }
                initialPage={ this.mainBannerIndex }>
                { mainBannerItems.map((item, index) =>
                    (
                        <View style={ styles.pageStyle } key={ item.normal } >
                            <TouchableOpacity onPress={ (e) => this._onPress(e, item.action) } >
                                <Image source={ { uri: item.normal } } style={ { height: "100%" } } />
                            </TouchableOpacity>
                        </View>
                    )
                ) }
            </ViewPagerAndroid>);
        } else {
            return null;
        }
    }

    onPageMain = (e) => {
        console.log(e.nativeEvent.position);
        this.mainBannerIndex = e.nativeEvent.position
    }

    pageSelected = (e) => {
        console.debug(e.nativeEvent.position);
    }

    getData = () => {
        CategoryData.getFoodHomeData().then(
            (result) => {
                if (result) {
                    const { list } = result;
                    if (list && list.length > 0) {
                        const { topBannerItems, mainBannerItems, item } = this.state;
                        const top = list.filter(item => {
                            if (_.isEqual(item.exposePos, BANNER_TYPE.top)) {
                                return true;
                            }

                            return false;
                        });
                        const main = list.filter(item => {
                            if (_.isEqual(item.exposePos, BANNER_TYPE.main)) {
                                return true;
                            }

                            return false;
                        });

                        this.setState({
                            topBannerItems: update(topBannerItems, {
                                $set: top
                            }),
                            mainBannerItems: update(mainBannerItems, {
                                $set: main
                            }),
                            item: update(item, {
                                $set: this.items
                            }),
                        });
                    }
                } else {
                    console.warn("response error");
                }
            }
        );
    }
};

const styles = StyleSheet.create({
    topViewPager: {
        height: DeviceUtil.ratioSize(46, 360),
        width: "100%",
        backgroundColor: "#fdd002",
        marginTop: 10,
    },
    mainViewPager: {
        height: DeviceUtil.ratioSize(80, 360),
        width: "100%",
        backgroundColor: "#fdd002",
        marginTop: 10,
    },
    viewPager: {
        height: 70,
        width: "100%",
        backgroundColor: "#fdd002",
        marginTop: 10,
    },
    topPageStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: "gray",
    },
});

PagerScreen.defaultProps = defaultProps;
PagerScreen.propTypes = propTypes;

export default PagerScreen;