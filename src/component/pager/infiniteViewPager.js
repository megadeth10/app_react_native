import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, VirtualizedList } from 'react-native'

const { width, height } = Dimensions.get('window')
const startAtIndex = 5000

const stupidList = new Array(startAtIndex * 2)

export default class InfiniteViewPager extends Component {
    //only use if you want current page
    _onScrollEnd(e) {
        // const contentOffset = e.nativeEvent.contentOffset
        // const viewSize = e.nativeEvent.layoutMeasurement
        // // Divide the horizontal offset by the width of the view to see which page is visible
        // const pageNum = Math.floor(contentOffset.x / viewSize.width)
    }
    _renderPage(info) {
        const { index, item } = info;
        console.debug(info);
        const { data } = item;
        const a = data[index];
        return (
            <View style={{ width, height: 50, backgroundColor: 'red' }} >
                <TouchableOpacity onPress={(e) => this._onPress(e, a.action)} >
                    <Image source={{ uri: a.normal }}
                        resizeMode='contain' style={{ width, height: 50, backgroundColor: 'red' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { dataSource } = this.props;
        if (dataSource.length === 0) {
            return null;
        }
        return (
            <VirtualizedList
                horizontal
                pagingEnabled
                initialNumToRender={3}
                getItemCount={data => data.length}
                data={dataSource}
                initialScrollIndex={startAtIndex}
                keyExtractor={(item, index) => index.toString()}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                maxToRenderPerBatch={1}
                windowSize={1}
                getItem={(data, index) => ({ index, data })}
                renderItem={this._renderPage}
                onMomentumScrollEnd={this._onScrollEnd}
            />
        )
    }
}