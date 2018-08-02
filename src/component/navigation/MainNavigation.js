import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreen';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Category: {
            screen: CategoryScreen,
            mode: "card"
        },
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);

class MainNavigation extends Component {

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return <RootStack />
    }
}
export default MainNavigation;