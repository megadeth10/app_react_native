import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Button, Icon } from 'native-base';

const propTypes = {
}

const defaultProps = {
}

class VenderMapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapReady: false,
        }
    }
    render() {
        const { width, height } = Dimensions.get('window'); 
        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 0.0092; //Very high zoom level
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
        
        const { lat, lon } = this.props.location;
        return (
            <View style={ {
                display: this.props.visable ? "flex" : "none",
                position: this.props.visable ? "absolute" : "relative",
                flex: 1,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'red',
                width, height
            } }>
                <MapView
                    region={ {
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    } }
                    mapType="standard"
                    style={ {
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                    } }
                    onLayout={ this.onMapLayout }
                    zoomControlEnabled >
                    {
                        this.state.isMapReady &&
                        <Marker coordinate={ {
                            latitude: lat,
                            longitude: lon
                        } } title={ this.props.title } style={ {
                            height: 14,
                            width: 14,
                            backgroundColor: '#81BD26',
                            alignItems: 'center',
                            justifyContent: 'center'
                        } } />
                    }
                </MapView>
                { this.state.isMapReady && <Button transparent onPress={ this.props.callback } >
                    <Icon name='arrow-back' />
                </Button> }
            </View>
        );
    }

    //map layout 이전에 Marker를 설정하면 오류가 발생한다. 그래서 layout 이후 설정 한다.
    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }
};

VenderMapView.defaultProps = defaultProps;
VenderMapView.propTypes = propTypes;

export default VenderMapView;