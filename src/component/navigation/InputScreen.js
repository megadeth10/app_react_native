import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, ViewPagerAndroid, StyleSheet, Dimensions, Image, TextInput, Keyboard, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Button } from 'native-base';
import NavigationService from './NavigationService';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import ImageWithConstraints from "../view/ImageWithConstraints";

const propTypes = {
}

const defaultProps = {
}

const image = require("../../img/login_img_default.png");

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
                <ScrollView style={ { flex: 1 } } ref="scrollView">
                    <View ref="mainImage"
                        onLayout={ this.handleLayoutChange }>
                        <ImageWithConstraints
                            source={ image }
                            style={
                                {
                                    width: "100%"
                                }
                            }
                            originalWidth={ 360 }
                            originalHeight={ 326 }
                            resizeMode="contain" />
                    </View>
                    <View ref="subImage"
                        onLayout={ this.handleLayoutChange2 }>
                        <Image
                            source={ { uri: "http://image.ddingdong.net:8083/vendor/F0000000000000004153.jpg" } }
                            style={
                                {
                                    width: 87,
                                    height: 56
                                }
                            }
                            resizeMode="contain" />
                    </View>
                    <Text>{ inputText }</Text>
                </ScrollView>
                <TextInput style={ { width: "100%", borderWidth: 1 } } editable={ true }
                    multiline={ false } onChangeText={ this.onChangeText }
                    returnKeyType="done" placeholder="입력해 주세요."
                    ref="inputText"
                />
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.goMainImage }>
                    <Text>goto main image</Text>
                </Button>
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.goSubImage }>
                    <Text>goto sub image</Text>
                </Button>
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.onPress }>
                    <Text>add text</Text>
                </Button>
            </Container>
        );
    }

    //TODO ScrollList에서 child Component의 offset을 어떻게 구하는가??????????????????(9.11)
    goMainImage = (e) => {
        if (this.refs.mainImage) {
            const { mainImage } = this.offset;
            this.refs.scrollView.scrollTo({ x: 0, y: 0, animated: true });
        }
    }

    handleLayoutChange = () => {
        this.refs.mainImage.measure((fx, fy, width, height, px, py) => {
            console.log('Main Component height is: ' + height);
            console.log('Main Y offset to page: ' + py);
            console.log('Main Y offset to frame: ' + fy);
            this.offset = { ...this.offset, ["mainImage"]: py };
        })
    }

    handleLayoutChange2 = () => {
        this.refs.subImage.measure((fx, fy, width, height, px, py) => {
            console.log('Sub Component height is: ' + height);
            console.log('Sub Y offset to page: ' + py);
            console.log('Sub Y offset to frame: ' + fy);
            this.offset = { ...this.offset, ["subImage"]: py };
        })
    }

    goSubImage = (e) => {
        if (this.refs.subImage) {
            const { subImage, mainImage } = this.offset;
            this.refs.scrollView.scrollTo({ x: 0, y: subImage - mainImage, animated: true });
        }
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