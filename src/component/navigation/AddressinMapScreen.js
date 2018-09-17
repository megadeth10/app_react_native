import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, NativeModules, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right, Icon, Button } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NavigationService from './NavigationService';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import CategoryData from './RestApi/CategoryData';
import CusImageView from '../view/CusImageView';

const propTypes = {
}

const defaultProps = {
}

class AddressinMapScreen extends Component {
    constructor(props) {
        super(props);

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
            },
            isMapReady: false,
            address: undefined,
            addressdata: []
        };
    }

    render() {
        const { addressdata } = this.state;

        const listStyle = {
            display: addressdata.length > 0 ? "flex" : "none",
            width: addressdata.length > 0 ? "100%" : 0,
            height: addressdata.length > 0 ? "100%" : 0,
            position: "absolute"
        }

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
                <TextInput style={ { width: "100%", borderWidth: 1, paddingTop: 0, paddingBottom: 0 } } editable={ true }
                    multiline={ false } onChangeText={ this.onChangeText }
                    returnKeyType="search" placeholder="입력해 주세요."
                    ref="inputText"
                    underlineColorAndroid={ 'transparent' }
                    onKeyPress={ this.onKeyPress }
                    onSubmitEditing={ this.onSumbmit }
                />
                <View style={ { flex: 1 } }>
                    <View style={ {
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                    } }>
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
                            zoomControlEnabled={ true } />
                        <Icon style={ {
                            position: "absolute", left: "50%", top: "50%", marginTop: -28, marginLeft: -9
                        } } name="arrow-back" />
                    </View>
                    <FlatList style={ listStyle }
                        data={ addressdata }
                        contentContainerStyle={ { flex: 1 } }
                        keyExtractor={ (item, index) => index.toString() }
                        renderItem={ this.renderAddressRow } />
                </View>
                <Text style={ { width: "100%", justifyContent: "center" } }>
                    { this.state.address ? this.state.address : "" }
                </Text>
                <Button style={ { width: "100%", justifyContent: "center" } }
                    onPress={ this.findMyLocation }>
                    <Text>find my location</Text>
                </Button>
            </Container>
        );
    }

    renderAddressRow = (rowData) => {
        const width = DeviceUtil.ratioSize(75, 360);
        const height = DeviceUtil.ratioSize(47, 360);
        const { road_address } = rowData.item;

        return (
            <TouchableOpacity onPress={ (e) => this._onPress(e, rowData.item) }>
                <View style={ {
                    flexDirection: "row",
                    alignItems: "center",
                    height: DeviceUtil.ratioSize(49, 360),
                    backgroundColor: '#6495ED',
                    borderColor: "black",
                    borderWidth: 1,
                } }>
                    <CusImageView item={ { uri: "" } } style={ { width, height } } />
                    <View style={ {
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        backgroundColor: 'transparent',
                    } }>
                        <Text>{ (road_address.region_1depth_name ? road_address.region_1depth_name : "")
                            + (road_address.region_2depth_name ? " " + road_address.region_2depth_name : "")
                            + (road_address.region_3depth_name ? " " + road_address.region_3depth_name : "")
                            + (road_address.road_name ? " (" + road_address.road_name + ")" : "") }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    _onPress = (e, item) => {
        console.log(item);
        const { region } = this.state;
        
        this.setState({
            addressdata: [],
            region: {
                ...region,
                latitude: parseFloat(item.y),
                longitude: parseFloat(item.x)
            }
        });
    }

    onSumbmit = (e) => {
        if (this.inputObject) {
            CategoryData.getDaumAddress({ search: this.inputObject })
                .then((result) => {
                    const { documents } = result;
                    console.log(documents);
                    if (documents.length > 0) {
                        this.setState({
                            addressdata: documents
                        });
                    }
                })
                .catch((error) => {

                });
        } else {
            Alert.alert('검색어를 입력해 주세요.');
        }
    }

    onKeyPress = (e) => {
        console.log(e.nativeEvent.key);
    }

    onChangeText = (text) => {
        this.inputObject = text;
    }

    findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.debug(position);
                try {
                    const { latitude, longitude } = position.coords;

                    if (latitude && longitude) {
                        const { region } = this.state;
                        this.setState({
                            region: {
                                ...region, latitude, longitude
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }, (error) => {
                console.log(error);
                NativeModules.GPSCheck.enableGps(true)
                    .then(result => {
                        console.log("GPS 상태 " + result);
                    });
            });
        }
    }

    getAddress = (reg) => {
        const { latitude, longitude } = reg;
        CategoryData.getDaumCoor2Address({ lon: longitude, lat: latitude })
            .then(result => {

                const documents = _.get(result, "documents");
                if (documents && (documents.length > 0)) {
                    const address_name = _.get(documents, "[0].address.address_name");
                    console.debug(address_name);

                    const { address, region } = this.state;

                    address_name && this.setState({
                        address: update(address, {
                            $set: address_name
                        }),
                        region: update(region, {
                            $set: reg
                        })
                    });
                }
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    address: update(address, {
                        $set: ""
                    }),
                    region: update(region, {
                        $set: reg
                    })
                });
            });
    }

    onRegionChangeComplete = (region) => {
        // console.debug(region);
        this.getAddress(region);
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