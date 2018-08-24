import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreen';
import PagerScreen from './PagerScreen';
import StoreDetail from './StoreDetail';
import VenderListScreen from './VenderListScreen';
import AddressinMapScreen from './AddressinMapScreen';
import InputScreen from './InputScreen';
import WebViewScreen from './WebViewScreen';
import NavigationService from './NavigationService';
import React, { Component } from 'react';

let AStack = undefined;

function setScreenName() {
    return [
        {
            key: "Home",
            value: {
                screen: HomeScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "Category",
            value: {
                screen: CategoryScreen,
                mode: "card",
                navigationOptions :{
                    header : null
                }
            },
        },
        {
            key: "Details",
            value: {
                screen: DetailsScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "Pager",
            value: {
                screen: PagerScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "StoreDetail",
            value: {
                screen: StoreDetail,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "VenderListScreen",
            value: {
                screen: VenderListScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "AddressinMapScreen",
            value: {
                screen: AddressinMapScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "InputScreen",
            value: {
                screen: InputScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
        {
            key: "WebViewScreen",
            value: {
                screen: WebViewScreen,
                navigationOptions :{
                    header : null
                }
            }
        },
    ];
}

const SCREEN_NAME = new setScreenName();

function getStack() {
    if (AStack === undefined) {
        AStack = createStackNavigator(
            {
                [SCREEN_NAME[0].key]: SCREEN_NAME[0].value,
                [SCREEN_NAME[1].key]: SCREEN_NAME[1].value,
                [SCREEN_NAME[2].key]: SCREEN_NAME[2].value,
                [SCREEN_NAME[3].key]: SCREEN_NAME[3].value,
                [SCREEN_NAME[4].key]: SCREEN_NAME[4].value,
                [SCREEN_NAME[5].key]: SCREEN_NAME[5].value,
                [SCREEN_NAME[6].key]: SCREEN_NAME[6].value,
                [SCREEN_NAME[7].key]: SCREEN_NAME[7].value,
                [SCREEN_NAME[8].key]: SCREEN_NAME[8].value,
            },
            {
                initialRouteName: SCREEN_NAME[0].key,
            }
        );
    }
    return (
        <AStack ref={ stackRef => {
            NavigationService.setTopLevelNavigator(stackRef)
        } } />
    );
}

export default {
    getStack,
    SCREEN_NAME
};