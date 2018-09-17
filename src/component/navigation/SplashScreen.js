import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Linking, Platform, NativeModules, AppState, Alert } from 'react-native';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import CategoryData from './RestApi/CategoryData';

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
        // AppState.addEventListener('change', this._handleAppStateChange);
        NativeModules.AppCheck.getCurrentVersionName()
            .then((result) => {
                console.log("getCurrentVersionName : " + result);
                this.versionCheck(result);
            })
            .catch((code, error) => {
                this.nativeVersionChecked = false;
                this.gotoHome();
            });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        Linking.removeEventListener('url', this.handleOpenURL);
        // AppState.removeEventListener('change', this._handleAppStateChange);
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

    // _handleAppStateChange = (nextAppState) => {
    //     if(!this.nativeVersionChecked && (nextAppState === 'active')){
    //         NativeModules.AppCheck.getCurrentVersionName()
    //         .then((result) => {
    //             console.log("getCurrentVersionName : " + result);
    //             this.versionCheck(result);
    //         })
    //         .catch((code, error) => {
    //             this.nativeVersionChecked = false;
    //             this.gotoHome();
    //         });
    //     }
    // }

    onLoadEnd = () => {
        this.timer = setTimeout(this.imageLoadedChecker, 3000);
    }

    imageLoadedChecker = () => {
        this.imageLoaded = true;
        this.gotoHome();
    }

    versionCheck = (version) => {
        this.nativeVersionChecked = true;
        this.gotoHome();
        return;
        if (version) {
            CategoryData.getVersion()
                .then((result) => {
                    try {
                        const { iosAppVer } = result;

                        const localVersion = version.split(".");
                        const newVersion = iosAppVer.split(".");

                        var len = Math.min(localVersion.length, newVersion.length);
                        const isNew = false;

                        for (var i = 0; i < len; i++) {
                            // A bigger than B
                            if (parseInt(localVersion[i]) > parseInt(newVersion[i])) {
                                isNew = false;
                            }

                            // B bigger than A
                            if (parseInt(localVersion[i]) < parseInt(newVersion[i])) {
                                isNew = true;
                            }
                        }

                        if (isNew) {
                            const title = "업데이트";
                            const message = `현재 버전은 ${version} 입니다.\n최신 버전은 ${iosAppVer} 입니다.\n업데이트를 위해서 마켓으로 이동 하시겠습니까?`;
                            Alert.alert(title, message, [
                                {
                                    text: "아니요",
                                    onPress: () => { 
                                        this.nativeVersionChecked = true; 
                                        this.gotoHome();
                                    }
                                },
                                {
                                    text: "업데이트",
                                    onPress: () => {
                                        this.nativeVersionChecked = false;
                                        NativeModules.AppCheck.gotoMarket("http://play.google.com/store/apps/details?id=com.honeybees.ddingdong");
                                    }
                                }
                            ], { cancelable: false });
                        } else {
                            this.nativeVersionChecked = true;
                            this.gotoHome();
                        }
                    } catch (error) {
                        throw new Error(error);
                    }
                })
                .catch((error) => {
                    this.nativeVersionChecked = false;
                    this.gotoHome();
                })
        } else {
            this.nativeVersionChecked = false;
            this.gotoHome();
        }
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