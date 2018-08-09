import React, { Component } from 'react';
import { Button, View, AppState, BackHandler, Platform, PermissionsAndroid, ViewPagerAndroid } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { Container, Header, Left, Body, Right, Title, Text, Content } from 'native-base';
import { connect } from 'redux-zero/react';
import action from '../redux_zero/action';

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
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if ((Platform.OS === "android") && Platform.Version >= 23) {
            this.requestCameraPermission();
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
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
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, rationale
            ).then(result => {
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn("You can use the READ_EXTERNAL_STORAGE");
                } else {
                    console.warn(result);
                }
            });

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