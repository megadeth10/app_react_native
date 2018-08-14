import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';
import CategoryData from '../navigation/RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import CusImageView from '../view/CusImageView';
import NavigationService from '../navigation/NavigationService';
import AppStack from '../navigation/AppStack';

const propTypes = {
}

const defaultProps = {
}

class BestVenderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bestVenderItems: []
        }
    }

    componentDidMount() {
        const { compid } = this.props;
        const { bestVenderItems } = this.state;

        if (compid && (bestVenderItems.length === 0)) {
            this.getData(compid);
        }
    }

    render() {
        return (
            <View style={ style.mainStyle }>
                
                <FlatList style={ style.scrollStyle }
                    data={ this.state.bestVenderItems }
                    contentContainerStyle={ { flex: 1 } }
                    keyExtractor={ (item, index) => item.venId }
                    renderItem={ this.renderVenders } />
            </View>
        );
    }

    renderVenders = (rowData) => {
        const { item } = rowData;
        let url = "";
        const { imageList } = item;

        url = _.get(imageList, "[8].fileNm");
        if (_.isEmpty(url)) {
            url = _.get(imageList, "[3].fileNm");
        }
        const width = DeviceUtil.ratioSize(75, 360);
        const height = DeviceUtil.ratioSize(47, 360);
        return (
            <TouchableOpacity onPress={ (e) => this._onPress(e, item.venId) }>
                <View style={ style.itemView }>
                    <CusImageView source={ { uri: url } } style={ { width, height } } />
                    <Text style={ style.rateView }>{ rowData.index + 1 }</Text>
                    <Text>{ item.venNm }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    onError = (err, ref) => {
        console.debug(error);
        console.debug(ref);
    }

    _onPress = (e, venId) => {
        NavigationService.navigate(AppStack.SCREEN_NAME[4].key, { compId: this.props.compid, venId })
    }

    getData = (id) => {
        CategoryData.getMainBestVender({ compId: id })
            .then(result => {
                if (!result) {
                    return;
                }

                const { bestList } = result;
                const { bestVenderItems } = this.state;

                this.setState({
                    bestVenderItems: update(bestVenderItems, {
                        $set: bestList
                    })
                });
            });
    }
};

const style = StyleSheet.create({
    mainStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: '#D2691E'
    },
    scrollStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: '#ffffff'
    },
    itemView: {
        flexDirection: "row",
        alignItems: "center",
        height: DeviceUtil.ratioSize(49, 360),
        backgroundColor: '#6495ED',
        borderColor: "black",
        borderWidth: 1,
    },
    rateView: {
        width: 20,
        alignItems: "center",
        textAlign: "center",
    }
});

BestVenderView.defaultProps = defaultProps;
BestVenderView.propTypes = propTypes;

export default BestVenderView;