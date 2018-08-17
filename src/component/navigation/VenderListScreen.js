import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon } from 'native-base';
import CategoryData from '../navigation/RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from '../navigation/NavigationService';
import VenderList from '../view/VenderList';

const propTypes = {
}

const defaultProps = {
}

class VenderListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            pageNum: -1
        }
        this.isRequest = false;
    }

    componentWillMount() {
        const { items } = this.state;

        if (items.length === 0) {
            this.getData();
        }
    }

    render() {
        return (
            <View style={ style.rootView }>
                <Container style={ { backgroundColor: "#ffffff" } }>
                    <Header style={ { backgroundColor: "#fdd002" } }>
                        <Left>
                            <Button transparent onPress={ this.onBackPress } >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={ { color: "#000000" } }>상점 목록</Title>
                        </Body>
                    </Header>
                    <VenderList ref="list" data={ this.state.items } getMore={ this.getData }
                        refresh={ this.refreshing } />
                </Container>
            </View>
        );
    }

    getData = () => {
        if (this.isRequest) {
            return;
        }

        this.isRequest = true;
        let { items, pageNum } = this.state;
        pageNum += 1;
        CategoryData.getCategoryVendors({ pageNum })
            .then(result => {

                const { list } = result;

                if (list && list.length > 0) {

                    this.setState({
                        items: update(items, {
                            $push: list
                        }),
                        pageNum: update(pageNum, {
                            $set: pageNum + 1
                        }),
                    });

                }
                this.isRequest = false;
            })
            .catch(error => {
                this.isRequest = false;
            });
    }

    refreshing = () => {
        const { pageNum, items } = this.state;
        this.setState({
            items: update(items, {
                $set: []
            }),
            pageNum: update(pageNum, {
                $set: -1
            }),
        }, this.getData());
    }

    onBackPress = () => {
        NavigationService.goBack();
    }
};

const style = StyleSheet.create({
    rootView: {
        display: "flex",
        flex: 1
    },
});

VenderListScreen.defaultProps = defaultProps;
VenderListScreen.propTypes = propTypes;

export default VenderListScreen;