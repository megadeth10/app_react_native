import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const propTypes = {
    originalWidth: PropTypes.number.isRequired,
    originalHeight: PropTypes.number.isRequired,
}

const defaultProps = {
}

class ImageWithConstraints extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: undefined
        }
    }

    onImageLayout = (e) => {
        var layout = e.nativeEvent.layout;
        var aspectRatio = this.props.originalWidth / this.props.originalHeight;
        var measuredHeight = layout.width / aspectRatio;
        var currentHeight = layout.height;

        if (measuredHeight != currentHeight) {
            this.setState({
                style: {
                    height: measuredHeight
                }
            });
        }
    }

    render() {
        return (
            <Image
                { ...this.props }
                style={ [this.props.style, this.state.style] }
                onLayout={ this.onImageLayout }
            />
        );
    }
};

ImageWithConstraints.defaultProps = defaultProps;
ImageWithConstraints.propTypes = propTypes;

export default ImageWithConstraints;