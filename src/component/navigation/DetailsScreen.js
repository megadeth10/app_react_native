import React, { Component } from 'react';
import { Button, View, Text, NativeModules, BackHandler, DatePickerAndroid, DrawerLayoutAndroid, PermissionsAndroid } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { connect } from 'redux-zero/react';
import actions from '../redux_zero/action';

class DetailsScreen extends Component {
    // static navigationOptions = {
    //     title: 'Details',
    // };

    constructor(props) {
        super(props);
        console.log("constructor");
        this.drawer = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    render() {
        const { setUser, userInfo } = this.props;
        const drawView = (<View style={ { flex: 1, backgroundColor: '#fff' } }>
            <Text style={ { margin: 10, fontSize: 15, textAlign: 'left' } }>I'm in the Drawer!</Text>
        </View>);
        return (
            <DrawerLayoutAndroid
                ref={ ref => this.drawer = ref }
                drawerWidth={ 300 }
                drawerPosition={ DrawerLayoutAndroid.positions.Left }
                renderNavigationView={ () => drawView }>
                <View style={ { flex: 1, alignItems: 'center' } }>
                    <Button
                        title="Back to Home"
                        onPress={ () =>
                            NavigationService.popToTop()
                        }
                    />

                    <Text>{ setUser ? userInfo.name : "redux undefine" }</Text>

                    <Button
                        title="go to Category"
                        onPress={ () =>
                            NavigationService.navigate(AppStack.SCREEN_NAME[1].key, {})
                        }
                    />
                    <Button
                        title="change user"
                        onPress={ () =>
                            setUser({ name: "ccccccc" })
                        }
                    />

                    <Button
                        title="show toast"
                        onPress={
                            this.showToast
                        }
                    />

                    <Button
                        title="show datePicker"
                        onPress={
                            this.showDatePicker
                        }
                    />

                    <Button
                        title="show drawer"
                        onPress={
                            this.toggleDrawer
                        }
                    />

                    <Button
                        title="check permission"
                        onPress={
                            this.requestCameraPermission
                        }
                    />

                    <Button
                        title="reset Home"
                        onPress={
                            this.resetHome
                        }
                    />
                </View>
            </DrawerLayoutAndroid>

        );
    }

    resetHome = () => {
        NavigationService.popToResetTop();
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    toggleDrawer = () => {
        this.drawer.openDrawer();
    }

    navigationView = () => {
        return (<View style={ { flex: 1, backgroundColor: '#fff' } }>
            <Text style={ { margin: 10, fontSize: 15, textAlign: 'left' } }>I'm in the Drawer!</Text>
        </View>);
    }

    async showDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.warn(`${year}년 ${month}월 ${day}일`);
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    showToast = () => {
        NativeModules.ToastExample.show("으하하하하", NativeModules.ToastExample.SHORT);
    }

    handleBackPress = () => {
        return false;
    }
}
const mapToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapToProps, actions)(DetailsScreen);