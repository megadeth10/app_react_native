import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    Animated,
    Dimensions,
} from 'react-native';
import update from 'immutability-helper';
import ParallaxScrollView from './ParallaxScrollView'

// normal: 'http://image.ddingdong.net:8083/vendor/F0000000000000294281.jpg',
const SAMPLE_DATA = {
    normal: 'http://image.ddingdong.net:8083/vendor/F0000000000000294281.jpg',
    action: 'asdfasdfasfda',
    title: '무슨 맛집?',
};

const window = Dimensions.get('window');
export default class StickHeader extends Component {
    HeaderHeight = 44;

    constructor(props) {
        super(props);

        // request params?
        // this.goodsId = props.navigation.getParam('goodsId', undefined);
        this.state = {
            item: SAMPLE_DATA,
            headerSize: 0,
        };
        // this.navigator = NavigatorAdapterFactory.create(this.props);
    }

    componentDidMount() {
        const { item, headerSize } = this.state;
        Image.getSize(item.normal, (width, height) => {
            const scaleWidth = width / window.width;
            this.setState({
                headerSize: update(headerSize, {
                    $set: height / scaleWidth,
                }),
            });
        }, () => {
            this.setState({
                headerSize: update(headerSize, {
                    $set: 0,
                }),
            });
        });
    }

    onScroll = (event) => {
        // const { headerSize } = this.state;
        // const { opacity } = this.state;
        // const { y } = event.nativeEvent.contentOffset;
        // console.log(y);
        // let afterOp = 0;
        // if (y >= headerSize) {
        //     afterOp = 1;
        // } else {
        //     afterOp = 1 * (y / headerSize);
        // }
        // if (opacity !== afterOp) {
        //     this.setState({
        //         opacity: afterOp,
        //     });
        // }
        // console.log(`renderTitle ${afterOp}`);
    }

    onClickShare = () => {

    }

    renderFixHeader = (title) => {
        const style = {
            position: 'absolute',
            height: this.HeaderHeight,
            width: window.width,
            justifyContent: 'flex-end',
            backgroundColor:'red',
        };
        return (
            <View key="fixed-header" style={style}>
                {/* <NavigationBar
                    title={title}
                    navigator={this.navigator}
                    rightButton={{ title: '공유', handler: this.onClickShare }}
                /> */}
                <Text>kajsdf;ioahjsdopihaosdifhapsodiasdfpsdfpoidfhpodfaposifpoidfhasdhfaisdhahsdfpoiasf</Text>
            </View>
        );
    }


    renderStickyHeader = (title) => {
        const style = {
            height: this.HeaderHeight,
            width: window.width,
            justifyContent: 'flex-end',
            backgroundColor:'red',
        };
        return (
            <View key="sticky-header" style={style}>
                {/* <NavigationBar
                    title={title}
                    navigator={this.navigator}
                    rightButton={{ title: '공유', handler: this.onClickShare }}
                /> */}
                <Text>kajsdf;ioahjsdopihaosdifhapsodiasdfpsdfpoidfhpodfaposifpoidfhasdhfaisdhahsdfpoiasf</Text>
            </View>
        );
    }

    renderGoodsImage = (url) => {
        const { headerSize } = this.state;
        if ((headerSize === 0) || (url === undefined)) {
            // return (
            //     <View
            //         key="background"
            //         style={{
            //             width: LayoutConfig.SCREEN_WIDTH,
            //             height: headerSize,
            //         }}
            //     />
            // );
            return undefined;
        }
        return (
            <View key="background">
                <Image
                    source={{
                        uri: url,
                    }}
                    style={{
                        width: window.width,
                        height: headerSize,
                    }}
                />
            </View>
        );
    }

    render() {
        const { item, headerSize } = this.state;
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                stickyHeaderHeight={this.HeaderHeight}
                parallaxHeaderHeight={headerSize === 0 ? this.HeaderHeight : headerSize}
                backgroundSpeed={10}
                renderBackground={() => this.renderGoodsImage(item.normal)}
                renderStickyHeader={() => (
                    headerSize === 0
                        ? undefined
                        : this.renderStickyHeader(item.title)
                )}
                renderFixedHeader={() => (
                    headerSize === 0
                        ? this.renderFixHeader(item.title)
                        : undefined
                )}
            >
                <View style={{ height: 1000 }}>
                    <Text>Scroll me</Text>
                </View>
            </ParallaxScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    scrollLayout: {
        padding: 10,
    },
});
