import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Linking, Platform } from 'react-native';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from './NavigationService';
import AppStack from './AppStack';

const propTypes = {
}

const defaultProps = {
}

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        DeviceUtil.ratioSize(360, 360);
        this.deeplink = undefined;
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                console.log("a deep link : " + url);
                url && (this.deeplink = url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        console.log("deep link : " + event.url);
    }

    render() {
        return (
            <View>
                <Image
                    style={ { height: "100%" } }
                    source={ { uri: "http://image.ddingdong.net:8083/open/splash_android.png" } }
                    resizeMode="cover"
                    onLoadEnd={ this.onLoadEnd }
                />
            </View>
        );
    }

    onLoadEnd = () => {
        const date = new Date();
        console.log(date.getSeconds());
        this.timer = setTimeout(this.gotoHome, 3000);
    }

    gotoHome = () => {
        const date = new Date();
        this.props.navigation.replace("Home", { deeplink: this.deeplink }, {});
        // NavigationService.navigate(AppStack.SCREEN_NAME[1].key , {});
        console.log(date.getSeconds());
    }
};

SplashScreen.defaultProps = defaultProps;
SplashScreen.propTypes = propTypes;

export default SplashScreen;