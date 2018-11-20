import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

class HeaderScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerImages: 0,
        };
    }

    componentDidMount() {
        Image.getSize('https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg', (width, height) => {
            console.log(`The image dimensions are ${width}x${height}`);
            const scaleWidth = width / window.width;
            const scaleHeight = height / scaleWidth;
            console.log(`scaleHeight : ${scaleHeight}`);
            this.setState({
                headerImages : scaleHeight,
            })
        }, (error) => {
            console.error(`Couldn't get the image size: ${error.message}`);
        });
    }

    // 이미지가 있으면 parallaxHeaderHeight를 sticky header size로 하고 
    // renderBackground, renderForeground를 설정하지 않는다.
    render() {
        const {headerImages} = this.state;
        if(headerImages === 0){
            return null;
        }
        const header_size = headerImages;
        const backgroundStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: window.width,
            height: header_size
        };
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={header_size}
                backgroundSpeed={10}
                renderBackground={() => (
                    <View key="background">
                        <Image source={{
                            uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                            width: window.width,
                            height: header_size
                        }} />
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            width: window.width,
                            backgroundColor: 'rgba(0,0,0,.4)',
                            height: header_size
                        }} />
                    </View>
                )}

                renderForeground={() => (
                    <View key="parallax-header" style={styles.parallaxHeader}>
                        <Image style={styles.avatar} source={{
                            uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE
                        }} />
                        <Text style={styles.sectionSpeakerText}>
                            Talks by Rich Hickey
                </Text>
                        <Text style={styles.sectionTitleText}>
                            CTO of Cognitec, Creator of Clojure
                </Text>
                    </View>
                )}

                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
                    </View>
                )}

                renderFixedHeader={() => (
                    <View key="fixed-header" style={styles.fixedSection}>
                        <Text style={styles.fixedSectionText}
                            onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                            Scroll to top
                        </Text>
                    </View>
                )}
            >
                <View style={{ height: 1000 }}>
                    <Text>Scroll me</Text>
                </View>
            </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
// const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});

export default HeaderScrollView;