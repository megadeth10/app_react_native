import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const propTypes = {
    layoutPosition: PropTypes.string,
    callTop: PropTypes.func
}

const defaultProps = {
    layoutPosition: undefined,
    callTop: undefined
}

const WIDTH = 15;

class ScrollTopView extends Component {
    constructor(props) {
        super(props);
        console.debug(props);
        const { width, height } = Dimensions.get('window');
        this.height = height;
        this.width = width;

        this.state = {
            visable: false
        }
    }

    render() {
        const { visable } = this.state;
        const { layoutPosition } = this.props;
        let left = (this.width - WIDTH) / 2;

        if (typeof layoutPosition === "string") {
            if (layoutPosition === "left") {
                left = WIDTH;
            } else if (layoutPosition === "right") {
                left = this.width - (WIDTH * 2);
            }
        }

        return (
            <TouchableOpacity style={ {
                display: visable ? "flex" : "none",
                position:  visable ? "absolute" : "relative",
                backgroundColor: "red",
                bottom: 10,
                left,
                width: WIDTH,
                height: WIDTH,
            } } onPress={ this._onPress }>
                <Text>{ "^" }</Text>
            </TouchableOpacity>
        );
    }

    _onPress = () => {
        const { callTop } = this.props;

        if (callTop && (typeof callTop === 'function')) {
            callTop();
        }
    }

    onChangeScroll = (e) => {
        const { visable } = this.state;

        let vis = false;
        if (this.height <= e.nativeEvent.contentOffset.y) {
            vis = true;
        }

        if (visable !== vis){
            this.setState({
                visable : vis
            });
        }
    }
};

ScrollTopView.defaultProps = defaultProps;
ScrollTopView.propTypes = propTypes;

export default ScrollTopView;