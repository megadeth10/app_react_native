import React, { Component } from 'react';
import { Button, View, AppState } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { Container, Header, Left, Body, Right, Title, Text } from 'native-base';
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
    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    render() {
        const {userInfo} = this.props;
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Body>
                        <Title style={ { color: "#000000", paddingLeft : 20 } }>Home</Title>
                    </Body>
                </Header>
                <View>
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
                    <Text>{userInfo ? userInfo.name : ""}</Text>
                </View>
            </Container>

        );
    }

    _handleAppStateChange = (nextAppState) => {
        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log(nextAppState)
        // }
        // this.setState({appState: nextAppState});
      }

}

const mapToProps = ({userInfo}) => ({userInfo})
export default connect(mapToProps, action)(HomeScreen);