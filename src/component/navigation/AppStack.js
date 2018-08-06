import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreen';
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