import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Linking, Platform, NativeModules } from 'react-native';
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
        this.imageLoaded = false;
        this.nativeVersionChecked = false;
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

        NativeModules.AppCheck.getCurrentVersionName()
            .then((result) => {
                console.log("getCurrentVersionName : " + result);
                this.nativeVersionChecked = true;
                this.gotoHome();
            })
            .catch((code, error) => {
                this.nativeVersionChecked = false;
                this.gotoHome();
            });
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
        this.timer = setTimeout(this.imageLoadedChecker, 3000);
    }

    imageLoadedChecker = () => {
        this.imageLoaded = true;
        this.gotoHome();
    }

    gotoHome = () => {
        if (this.imageLoaded && this.nativeVersionChecked) {
            this.props.navigation.replace("Home", {
                deeplink: this.deeplink,
                transition: "up"
            }, {});
        }
    }
};

SplashScreen.defaultProps = defaultProps;
SplashScreen.propTypes = propTypes;

export default SplashScreen;