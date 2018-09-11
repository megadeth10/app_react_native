import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, ViewPagerAndroid, StyleSheet, Dimensions, Image, TouchableOpacity, WebView } from 'react-native';
import ImageWithConstraints from "../view/ImageWithConstraints";
const propTypes = {
}

const defaultProps = {
}

const image = require("../../img/login_img_default.png");

class ImageLayoutScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>이미지 Layout</Text>
                <ImageWithConstraints
                    source={ image }
                    style={
                        {
                            width:"100%"
                        }
                    }
                    originalWidth={360}
                    originalHeight={326}
                    resizeMode="contain" />

            </View>
        );
    }
};

ImageLayoutScreen.defaultProps = defaultProps;
ImageLayoutScreen.propTypes = propTypes;

export default ImageLayoutScreen;