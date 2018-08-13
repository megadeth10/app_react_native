import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const propTypes = {
}

const defaultProps = {
}

class CusImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: props.source,
        }
    }
    render() {
        return (
            <Image { ...this.props } source={ this.state.uri } onError={ this.onError } />
        );
    }

    onError = () => {
        this.setState({
            uri: require("../../img/order_bike.png")
        });
    }
};

CusImageView.defaultProps = defaultProps;
CusImageView.propTypes = propTypes;

export default CusImageView;