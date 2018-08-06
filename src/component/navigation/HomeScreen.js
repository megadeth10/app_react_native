import React, { Component } from 'react';
import { Button, View } from 'react-native';
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

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Left />
                    <Body>
                        <Title style={ { color: "#000000" } }>Home</Title>
                    </Body>
                    <Right />
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
                    <Text>{this.props.userInfo.name}</Text>
                </View>
            </Container>

        );
    }
}

const mapToProps = ({userInfo}) => ({userInfo})
export default connect(mapToProps, action)(HomeScreen);