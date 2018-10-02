import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import update from 'immutability-helper';
import Config from 'react-native-config';

const propTypes = {
    visable: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired
}

const defaultProps = {
    visable: false,
    click: undefined
}

//build mode에 따라 config 파일을 분리하는 방법 또는 define을 하는 방법을 찾아야 한다.
const ServerItem = function () {
    let items = [];

    if (__DEV__) {
        items.push({
            title: "테스트",
            url: Config.API_TEST_URL,
        });
    }

    items.push({
        title: "리얼",
        url: Config.API_REAL_URL,
    });


    return items;
}

class ServerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visable: props.visable,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visable !== prevState.visable) {
            return {
                ...nextProps
            }
        } else {
            return null;
        }
    }

    componentWillUnmount() {
        this.setState({
            visable: false
        });
    }

    render() {
        this.list = ServerItem().map((item, index) => {
            
            let selectBackground = {};
            if (Config.API_URL === item.url) {
                selectBackground = {
                    backgroundColor: "#6a5acd"
                };
            }

            return (
                <TouchableOpacity
                    style={ [styles.modalItemView, selectBackground] }
                    onPress={ () => this.onPressServer(item, index) }
                    key={ `${index}` }>
                    <Text style={ styles.modalItemText }>{ item.title }</Text>
                </TouchableOpacity>
            );
        })

        return (
            <View>
                <TouchableOpacity style={ styles.button }
                    onPress={ this.onPress } >
                    <Text style={ styles.buttonText }>{ ServerItem().find( item => item.url === Config.API_URL).title }</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ this.state.visable }
                    onRequestClose={ () => {
                        this.onPress();
                    } }>
                    <View
                        style={ styles.modalRootView }>
                        <View style={ styles.modalChildView } >
                            { this.list }
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    onPressServer = (item, index) => {
        Config.API_URL = item.url;
        NavigationService.popToResetTop({ deeplink: this.deeplink, transition: "bottom" });
    }

    onPress = (e) => {
        this.props.click && this.props.click(e)
    }
};

const styles = StyleSheet.create({
    button: {
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        width: 45,
        height: 45,
        left: 30,
        bottom: 50,
        backgroundColor: "#fdd001",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 22.5
    },
    buttonText: {
        alignSelf: "center",
        fontSize: 11,
    },
    modalChildView: {
        width: "50%", height: "25%",
        backgroundColor: "white"
    },
    modalRootView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalItemView: {
        backgroundColor: "#6495ED",
        margin: (5, 10)
    },
    modalItemText: {
        alignSelf: "center",
        fontSize: 20,
    }
});

ServerButton.defaultProps = defaultProps;
ServerButton.propTypes = propTypes;

export default ServerButton;