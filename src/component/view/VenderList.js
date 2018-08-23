import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import DeviceUtil from '../utils/DeviceUtil';
import CusImageView from '../view/CusImageView';
import _ from 'lodash';
import ScrollTopView from '../view/ScrollTopView';

const propTypes = {
    getMore: PropTypes.func,
    refresh: PropTypes.func,
    items: PropTypes.array,
    endData: PropTypes.bool,
}

const defaultProps = {
    getMore: undefined,
    refresh: undefined,
    items: [],
    endData: false,
}

class VenderList extends Component {
    constructor(props) {
        super(props);

        const width = DeviceUtil.ratioSize(87, 360);
        const height = DeviceUtil.ratioSize(56, 360);

        this.imageStyle = {
            width, height,
            margin: (8.25, 10, 8.25, 6.5),
        };

        this.state = {
            refreshing: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { refreshing } = state;
        if (refreshing) {
            state.refreshing = false;
        }
        return {};
    }

    render() {
        const { refreshing } = this.state;
        const { items, endData } = this.props;
        console.log(items.length);
        //FlatList를 상위 Content(native-base)으로 감싸면 onEndReached를 호출하는 오류가 있음.
        //Content로 둘러 싸지 않으면 scroll 문제가 있으면 contentContainerStyle을 삭제하면 동작한다.
        return (
            <View style={ { flex: 1 } }>
                <FlatList style={ { width: "100%", height: "100%" } }
                    ref="flatList"
                    data={ items }
                    keyExtractor={ (item, index) => item.venId }
                    renderItem={ this.renderItem }
                    onEndReached={ this.onEndReached }
                    onEndReachedThreshold={ 0.1 }
                    ItemSeparatorComponent={ this.renderSeparator }
                    ListEmptyComponent={ this.renderEmpty }
                    refreshControl={
                        <RefreshControl
                            refreshing={ refreshing }
                            onRefresh={ this.onRefresh }
                        /> }
                    ListFooterComponent={ ((items.length > 0) && !endData) ?
                        <ActivityIndicator
                            style={ [this.imageStyle, { alignSelf: "center" }] }
                            size="large" color="#fdd002"
                        /> : null }
                    onScroll={ this.onScroll }
                />
                <ScrollTopView ref="topView" layoutPosition="right" callTop={ this.onTop } />
            </View>
        );
    }

    renderEmpty = () => {
        return (
            <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
                <Text>No Item</Text>
            </View>
        );
    }

    renderItem = (rowData) => {
        const { item } = rowData;
        let url = _.get(imageList, "[8].fileNm");
        const { imageList } = item;

        if (_.isEmpty(url)) {
            url = _.get(imageList, "[3].fileNm");
        }

        return (
            <TouchableOpacity onPress={ () => this.onPress(rowData) }>
                <View style={ style.itemView }>
                    <CusImageView item={ { uri: url } } style={ this.imageStyle } />
                    <Text>{ item.venNm }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    onPress = (item) => {
        const { itemClick } = this.props;
        if (itemClick) {
            itemClick(item);
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={ {
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000000",
                } }
            />
        );
    };

    onEndReached = (info) => {
        const { getMore, pageNum } = this.props;
        if (getMore) {
            getMore(pageNum + 1);
        }
    }

    onRefresh = () => {
        const { refresh } = this.props;
        if (refresh) {
            const { refreshing } = this.state;
            this.setState({
                refreshing: true
            }, refresh());
        }
    }

    onTop = () => {
        this.refs.flatList.scrollToIndex({ index: 0 });
    }

    onScroll = (e) => {
        if (this.refs.topView) {
            this.refs.topView.onChangeScroll(e);
        }
    }
};

const style = StyleSheet.create({
    itemView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#6495ED',
    },
});

VenderList.defaultProps = defaultProps;
VenderList.propTypes = propTypes;

export default VenderList;