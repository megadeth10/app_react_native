import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, ViewPagerAndroid, StyleSheet, Dimensions, Image, TouchableOpacity, WebView } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Button } from 'native-base';
import NavigationService from './NavigationService';
import update from 'immutability-helper';
import _ from 'lodash';

const propTypes = {
}

const defaultProps = {
}

class WebViewScreen extends Component {
    constructor(props) {
        super(props);
        this.item = props.navigation.getParam("url", "");

        this.state = {
            loadUrl: ""
        }

        //todo WebView에서 호출 되는 script function call은 되지만 호출한 
        //component의 function과 연결되지 않는 문제를 해결 해야함.
        this.injectScript = `window.topbanneraction ={
            sendBannerAction : function(msg){
                console.debug(msg);
        }}`;
    }

    componentDidMount() {
        this.setState({
            loadUrl: this.item ? this.item : "https://www.daum.net"
        });
    }

    componentWillUnmount() {
    }

    render() {
        const { loadUrl } = this.state;

        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Left>
                        <Button transparent onPress={ this.onBackPress } >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={ { color: "#000000" } }>웹 뷰</Title>
                    </Body>
                </Header>
                <View style={ { flex: 1 } }>
                    { (!loadUrl || (loadUrl && loadUrl.length === 0)) ? null :
                        <WebView
                            source={ { uri: loadUrl } }
                            onError={ this.onError } onLoadEnd={ this.onLoadEnd }
                            injectedJavaScript={ this.injectScript }
                            javaScriptEnabled={ true }
                            onNavigationStateChange={ this.onNavigationStateChange }>
                        </WebView>
                    }
                </View>
            </Container>
        );
    }

    onReceiveAction = (msg) => {
        console.log(msg);
    }

    onMessage = (event) => {
        console.debug(event);
    }

    onError = (event) => {
        console.debug(event);

    }

    onLoadEnd = (event) => {
        console.debug(event);
    }

    //url change listener
    onNavigationStateChange = (event) => {
        console.debug(event.url);
    }

    onBackPress = () => {
        NavigationService.goBack();
    }
};

WebViewScreen.defaultProps = defaultProps;
WebViewScreen.propTypes = propTypes;

export default WebViewScreen;