import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Button } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NavigationService from './NavigationService';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';

const propTypes = {
}

const defaultProps = {
}

class AddressinMapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMapReady: false,
        }

        const { width, height } = Dimensions.get('window');
        this.ASPECT_RATIO = width / height;
        this.LATITUDE_DELTA = 0.0092; //Very high zoom level
        this.LONGITUDE_DELTA = this.LATITUDE_DELTA * this.ASPECT_RATIO;

        this.state = {
            region: {
                latitude: 37.50560658,
                longitude: 127.0417732,
                latitudeDelta: this.LATITUDE_DELTA,
                longitudeDelta: this.LONGITUDE_DELTA,
            }
        };
    }

    render() {
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Left>
                        <Button transparent onPress={ this.onBackPress } >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={ { color: "#000000" } }>주소 선택</Title>
                    </Body>
                </Header>
                <View style={ { flex: 1 } }>
                    <MapView
                        provider={ PROVIDER_GOOGLE }
                        region={ this.state.region }
                        mapType="standard"
                        style={ {
                            width: "100%",
                            height: "100%",
                            position: "absolute"
                        } }
                        onRegionChangeComplete={ this.onRegionChangeComplete }
                        onLayout={ this.onMapLayout }
                        zoomControlEnabled={ true } >
                        {/* <MapView.Marker
                            coordinate={ this.state.region }
                        /> */}
                    </MapView>
                    <Icon style={ {
                        position: "absolute", left: "50%", top: "50%", marginTop: -28, marginLeft: -9
                    } } name="arrow-back" />
                </View>
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.findMyLocation }>
                    <Text>find my location</Text>
                </Button>
            </Container>
        );
    }

    findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.debug(position);
                const { latitude, longitude } = position.coords;

                if (latitude && longitude) {
                    const { region } = this.state;
                    this.setState({
                        region: {
                            ...region, latitude, longitude
                        }
                    });
                }
            });
        }
    }

    onRegionChangeComplete = (region) => {
        console.debug(region);
        this.setState({ region });
    }

    //map layout 이전에 Marker를 설정하면 오류가 발생한다. 그래서 layout 이후 설정 한다.
    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    onBackPress = () => {
        NavigationService.goBack();
    }
};

AddressinMapScreen.defaultProps = defaultProps;
AddressinMapScreen.propTypes = propTypes;

export default AddressinMapScreen;