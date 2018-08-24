import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, ViewPagerAndroid, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Keyboard, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Button } from 'native-base';
import NavigationService from './NavigationService';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';

const propTypes = {
}

const defaultProps = {
}

const STORE_KEY = "INPUT_DATA";
class InputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            mobile: ""
        }

        this.inputObject = {
            input: ""
        }

        this._retrieveData();
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this._storeData();

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        const { inputText } = this.state;
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Left>
                        <Button transparent onPress={ this.onBackPress } >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={ { color: "#000000" } }>입력 화면</Title>
                    </Body>
                </Header>
                <ScrollView style={ { flex: 1 } }>
                    <Text>{ inputText }</Text>
                </ScrollView>
                <TextInput style={ { width: "100%", borderWidth: 1 } } editable={ true }
                    multiline={ false } onChangeText={ this.onChangeText }
                    returnKeyType="done" placeholder="입력해 주세요."
                    ref="inputText"
                />
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.onPress }>
                    <Text>add text</Text>
                </Button>
            </Container>
        );
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(STORE_KEY);
            if (value !== null) {
                this.setState({
                    inputText: update(this.state.inputText, {
                        $set: value
                    })
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(STORE_KEY, this.state.inputText);
        } catch (error) {
            console.log(error);
        }
    }

    _keyboardDidShow = () => {
        this.isShowKeyboard = true;
    }

    _keyboardDidHide = () => {
        this.isShowKeyboard = false;
    }

    onChangeText = (text) => {
        // this.setState({
        //     mobile: text.replace(/[^0-9]/g, ''),
        // });
        this.inputObject.input = text;
    }

    onPress = () => {
        console.debug(this.inputObject.input);
        const { inputText } = this.state;
        this.setState({
            inputText: update(inputText, {
                $set: inputText + this.inputObject.input
            })
        });

        this.isShowKeyboard && Keyboard.dismiss();
    }

    onBackPress = () => {
        NavigationService.goBack();
    }
};

InputScreen.defaultProps = defaultProps;
InputScreen.propTypes = propTypes;

export default InputScreen;