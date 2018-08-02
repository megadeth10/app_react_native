import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStack from './AppStack';

class MainNavigation extends Component {

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        return (AppStack.getStack());
    }
}
export default MainNavigation;