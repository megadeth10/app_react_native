import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import DeviceUtil from '../utils/DeviceUtil';
import CusImageView from '../view/CusImageView';
import _ from 'lodash';

const propTypes = {
    getMore: PropTypes.func,
    refresh: PropTypes.func,
    data: PropTypes.array,
}

const defaultProps = {
    getMore: undefined,
    refresh: undefined,
    data: [],
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
        const { data } = props;
        if(refreshing && (data && data.length > 0)){
            state.refreshing = false;
        }
        
        return null;
    }

    render() {
        const { refreshing } = this.state;
        const { data } = this.props;

        //FlatList를 상위 Content(native-base)으로 감싸면 onEndReached를 호출하는 오류가 있음.
        //Content로 둘러 싸지 않으면 scroll 문제가 있으면 contentContainerStyle을 삭제하면 동작한다.
        return (
            <View style={ { flex: 1 } }>
                <FlatList style={ { width: "100%", height: "100%" } }
                    data={ data }
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
                />
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
            <TouchableOpacity >
                <View style={ style.itemView }>
                    <CusImageView item={ { uri: url } } style={ this.imageStyle } />
                    <Text>{ item.venNm }</Text>
                </View>
            </TouchableOpacity>
        )
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
        const { getMore } = this.props;
        if (getMore) {
            getMore();
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