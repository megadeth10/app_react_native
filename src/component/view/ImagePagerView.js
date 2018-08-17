import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';
import DeviceUtil from '../utils/DeviceUtil';
import CusImageView from '../view/CusImageView';
import _ from 'lodash';

const propTypes = {
    items: PropTypes.array,     //출력 data items 
    height: PropTypes.number,    //높이 값
    clickAction: PropTypes.func  //itemClickFunc
}

const defaultProps = {
    items: [],
    height: 0,
}

class ImagePagerView extends Component {
    constructor(props) {
        super(props);
        const { height } = props;
        const h = DeviceUtil.ratioSize(height, 360);

        this.styles = StyleSheet.create({
            viewPager: {
                height: h,
                width: "100%",
            },
        })
        this.currentPosition = 0;
    }
    render() {
        const { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <ViewPagerAndroid
                ref="pagerComp"
                style={ this.styles.viewPager }
                onPageSelected={ this.pageSelected }
                initialPage={ this.currentPosition }>
                { this.renderPageItemView() }
            </ViewPagerAndroid>
        );
    }

    //pagsing scroll시 선택 index check
    pageSelected = (e) => {
        this.currentPosition = e.nativeEvent.position;
    }

    renderPageItemView = () => {
        const { items } = this.props;

        return items.map((item, index) => {

            return (
                <View key={ item.url } >
                    <TouchableOpacity onPress={ this._onPress } >
                        <CusImageView item={ { uri: item.url } } style={ { height: "100%" } } />
                    </TouchableOpacity>
                </View>
            )
        });
    }

    _onPress = () => {
        try {
            const { items } = this.props;
            const item = _.get(items, `[${this.currentPosition}]`);
            item && this.props.clickAction(item);
        } catch (error) {

        }
    }

    nextPage = () => {
        try {
            const { items } = this.props;
            if (items && (items.length > 0)) {
                let nextIndex = this.currentPosition + 1;
                if (nextIndex >= items.length) {
                    nextIndex = 0;
                }
                this.currentPosition = nextIndex;
                this.refs.pagerComp.setPage(this.currentPosition);
            }
        } catch (err) {
            console.error(err);
        }
    }
};

ImagePagerView.defaultProps = defaultProps;
ImagePagerView.propTypes = propTypes;

export default ImagePagerView;