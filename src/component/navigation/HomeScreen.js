import React, { Component } from 'react';
import { Button, View, AppState, BackHandler, Platform, PermissionsAndroid, ViewPagerAndroid, NativeModules } from 'react-native';
import _ from 'lodash';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { Container, Header, Left, Body, Right, Title, Text, Content } from 'native-base';
import { connect } from 'redux-zero/react';
import action from '../redux_zero/action';

//fcm
import { RemoteMessage } from 'react-native-firebase';
import firebase from 'react-native-firebase';

class HomeScreen extends Component {
    // static navigationOptions = {
    //     title: 'Welcome',
    // };

    constructor(props) {
        super(props);
        console.log("constructor");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }
    componentWillMount() {
        NativeModules.FingerPushController.setDevice();
    }
    componentDidMount() {
        NativeModules.RNFirebaseAnalytics.setCurrentScreen("HomeScreen", null);
        NativeModules.FingerPushController.setIdentity("dondeath");
        AppState.addEventListener('change', this._handleAppStateChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if ((Platform.OS === "android") && Platform.Version >= 23) {
            this.requestCameraPermission();
        }

        //fcm
        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(message);

            const notification = new firebase.notifications.Notification();
            notification.setNotificationId("1");
            notification.setTitle("foreground 메시지");
            notification.setBody("되나요??");
            notification.android.setChannelId("리액트 테스트");

            firebase.notifications().displayNotification(notification);
        });
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            // Process your token as required
            console.log(fcmToken);
        });
        //fcm

        //notification
        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.

            console.log(notification);
        });
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            let notify = notification.android;

            if (Platform.OS === 'android') {
                notify.setSmallIcon("ic_launcher");
                notify.setAutoCancel(true);
                notify.setBigPicture(
                    "ic_launcher",
                    "ic_launcher",
                    notification.body,
                    "알림"
                );

                if (Platform.Version >= 26) {//set channel
                    notify.setChannelId("리액트 테스트");
                }

            }

            console.log(notification);
            firebase.notifications().displayNotification(notification);
        });
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;


            console.log(notification);
        });

        if ((Platform.OS === 'android') && (Platform.Version >= 26)) {//set channel
            const channel = new firebase.notifications.Android.Channel('리액트 테스트', '리액트 테스트', firebase.notifications.Android.Importance.High).setDescription('My apps test channel');
            firebase.notifications().android.createChannel(channel);
        }
        //notification
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

        //fcm
        this.messageListener();
        this.onTokenRefreshListener();
        //fcm

        //notification
        this.notificationDisplayedListener();
        this.notificationListener();
        this.notificationOpenedListener();
        //notification
    }

    render() {
        const { userInfo } = this.props;
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Body>
                        <Title style={ { color: "#000000", paddingLeft: 20 } }>Home</Title>
                    </Body>
                </Header>
                <Content>
                    <Button
                        title="Go to Category"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[1].key, {
                                itemId: 86,
                                otherParam: 'anything you want here',
                                group: ["aaa", "bbb"]
                            })
                        }
                    />
                    <Button
                        title="Go to Detail"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[2].key, {
                            })
                        }
                    />
                    <Text>{ userInfo ? userInfo.name : "" }</Text>
                    <Button
                        title="Go to Pager"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[3].key, {
                            })
                        }
                    />
                    <Button
                        title="Go to venderList"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[5].key, {
                            })
                        }
                    />
                    <Button
                        title="find my position"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[6].key, {
                            })
                        }
                    />
                    <Button
                        title="input screen"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[7].key, {
                            })
                        }
                    />
                    <Button
                        title="결제 화면"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[8].key, {
                            })
                        }
                    />
                    <Button
                        title="send notify"
                        onPress={ () => {
                            const notification = new firebase.notifications.Notification();
                            notification.setNotificationId("2");
                            notification.setTitle("TEST");
                            notification.setBody("되나요??");
                            notification.android.setChannelId("리액트 테스트");

                            firebase.notifications().displayNotification(notification);
                        }
                        }
                    />
                </Content>
            </Container>

        );
    }

    requestCameraPermission = () => {
        const rationale = {
            'title': 'Cool Photo App READ_EXTERNAL_STORAGE Permission',
            'message': 'Cool Photo App needs access to your READ_EXTERNAL_STORAGE ' +
                'so you can take awesome pictures.'
        };

        try {
            PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION]
                , rationale
            ).then(result => {
                const read_s = _.get(result, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                const write_s = _.get(result, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                const find_l = _.get(result, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

                if ((read_s === PermissionsAndroid.RESULTS.GRANTED) &&
                    (write_s === PermissionsAndroid.RESULTS.GRANTED) &&
                    (find_l === PermissionsAndroid.RESULTS.GRANTED)) {
                    console.log("You can use the READ_EXTERNAL_STORAGE");
                } else {
                    console.log(result);
                }

            });

            //fcm
            firebase.messaging().hasPermission()
                .then(enabled => {
                    if (enabled) {
                        console.log("fcm has Permission");
                    } else {
                        console.log("fcm has not Permission");
                    }
                });

            firebase.messaging().requestPermission()
                .then(() => {
                    console.log("fcm guarantee");
                    firebase.messaging().getToken()
                        .then(fcmToken => {
                            fcmToken && console.log(fcmToken);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("fcm not guarantee");
                });
            //fcm

        } catch (err) {
            console.warn(err)
        }
    }

    _handleAppStateChange = (nextAppState) => {
        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log(nextAppState)
        // }
        // this.setState({appState: nextAppState});
    }

    handleBackPress = () => {
        console.log("handleBackPress");
        return false;
    }
}

const mapToProps = ({ userInfo }) => ({ userInfo })
export default connect(mapToProps, action)(HomeScreen);