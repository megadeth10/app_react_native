import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import _ from 'lodash';

const propTypes = {
}

const defaultProps = {
}

class CusImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: props.item,
        }
    }
    render() {
        const { uri } = this.state;

        if (_.isEmpty(uri.uri)) {
            return (
                <Image { ...this.props } source={ require("../../img/order_bike.png") } />
            );
        }
        return (
            <Image { ...this.props } source={ uri } onError={ this.onError } />
        );
    }

    onError = () => {
        this.setState({
            uri: require("../../img/order_bike.png")
        });
    }
};

const style = StyleSheet.create({
    imageStyle: {
        margin: 1,
    }
});
CusImageView.defaultProps = defaultProps;
CusImageView.propTypes = propTypes;

export default CusImageView;