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
import AppStack from '../navigation/AppStack';

const propTypes = {
}

const defaultProps = {
}

class VenderListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            pageNum: 0,
            endData: false
        }
        this.isRequest = false;
    }

    componentDidMount() {
        const { items, pageNum } = this.state;

        if (items.length === 0) {
            this.getData(pageNum);
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
                    <VenderList { ...this.state } ref="list" getMore={ this.getData }
                        refresh={ this.refreshing } itemClick={ this.onItemClick } />
                </Container>
            </View>
        );
    }

    onItemClick = (item) => {
        console.debug(item);
        const { venId } = item.item;
        if (venId) {
            NavigationService.navigate("StoreDetail", { compId: "DD1", venId });
        }
    }

    getData = (pageNum) => {
        if (this.isRequest) {
            return;
        }
        this.isRequest = true;
        CategoryData.getCategoryVendors({ pageNum })
            .then(result => {
                const { list } = result;
                const { items, endData } = this.state;
                if (list && list.length > 0) {
                    this.setState({
                        items: update(items, {
                            $push: list
                        }),
                        pageNum: update(pageNum, {
                            $set: pageNum
                        }),
                        endData: update(endData, {
                            $set: false
                        }),
                    });
                } else {
                    this.setState({
                        endData: update(endData, {
                            $set: true
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
        const { items } = this.state;
        this.setState({
            items: update(items, {
                $set: []
            }),
        }, this.getData(0));
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