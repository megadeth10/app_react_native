import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Linking, Platform, NativeModules, AppState } from 'react-native';
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
        this.inProgressVersionCheck = false;
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
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        Linking.removeEventListener('url', this.handleOpenURL);
        AppState.removeEventListener('change', this._handleAppStateChange);
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

    _handleAppStateChange = (nextAppState) => {
        if(!this.nativeVersionChecked && (nextAppState === 'active') && !this.inProgressVersionCheck){
            this.inProgressVersionCheck = true;
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
    }

    onLoadEnd = () => {
        this.timer = setTimeout(this.imageLoadedChecker, 3000);
    }

    imageLoadedChecker = () => {
        this.imageLoaded = true;
        this.gotoHome();
    }

    versionCheck = (version) => {
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
                            //Native Dialog 보다 Js Dialog로 출력하는 것이 편해 보임.
                            //이유는 dialog 버튼 동작 처리와 background=>foreground 변경시 중복 팝업 발생함.
                            NativeModules.AppCheck.gotoMarketDialog(
                                iosAppVer, 
                                "http://play.google.com/store/apps/details?id=com.honeybees.ddingdong"
                            ).then((result) => {
                                if(result){
                                    this.nativeVersionChecked = true;
                                    this.gotoHome();        
                                } else {
                                    this.nativeVersionChecked = false;
                                    this.inProgressVersionCheck = false;
                                }
                            });
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