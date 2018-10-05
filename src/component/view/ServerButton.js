import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import update from 'immutability-helper';
import { GetServerIndex, GetServerList, SetSaveIndex, setConfigUrl, MANUAL_URL, SetSaveLocalUrl } from '../navigation/RestApi/CategoryData';

const propTypes = {
    visable: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired
}

const defaultProps = {
    visable: false,
    click: undefined
}

//build mode에 따라 config 파일을 분리하는 방법 또는 define을 하는 방법을 찾아야 한다.

class ServerButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visable: props.visable,
            items: [],
            selectedIndex: 0,
            manualText: ""
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

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        GetServerIndex()
            .then(result => {
                this.setState({
                    selectedIndex: result,
                    prevIndex: result,
                });
            });

        GetServerList()
            .then(result => {
                let text = "";
                if(result && (result.length > 2)){
                    text = result[2].url;
                }
                this.setState({
                    items: result,
                    manualText: text
                });
            });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();

        this.setState({
            visable: false
        });
    }

    render() {
        let title = "";
        const { selectedIndex } = this.state;

        const list = this.state.items.map((item, index) => {

            let selectBackground = {};
            if (index === selectedIndex) {
                selectBackground = {
                    backgroundColor: "#6a5acd"
                };
                title = item.title;
            }

            if (item.title === MANUAL_URL) {
                return (
                    <TouchableOpacity
                        style={ [styles.modalItemView, selectBackground] }
                        key={ `${index}` }
                        onPress={ () => this.onChangeSelectedIndex(index) }>
                        <Text style={ styles.modalItemText }>{ item.title }</Text>
                        <TextInput
                            editable={ true }
                            multiline={ false }
                            returnKeyType="done" placeholder="ex)http://10.0.0.1:80"
                            ref="inputText" value={this.state.manualText}
                            onChangeText={(manualText) => { this.setState({manualText})}}
                        />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        style={ [styles.modalItemView, selectBackground] }
                        key={ `${index}` }
                        onPress={ () => this.onChangeSelectedIndex(index) }>
                        <Text style={ styles.modalItemText }>{ item.title }</Text>
                    </TouchableOpacity>
                );
            }
        });

        return (
            <View>
                <TouchableOpacity style={ styles.button }
                    onPress={ this.onPress } >
                    <Text style={ styles.buttonText }>{ title }</Text>
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
                            { list }
                            <View style={ { flexDirection: "row" } }>
                                <TouchableOpacity
                                    style={ styles.modalButtonView }
                                    onPress={ () => this.onCancel() }>
                                    <Text style={ styles.modalItemText }>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={ styles.modalButtonView }
                                    onPress={ () => this.onPressServer() }>
                                    <Text style={ styles.modalItemText }>선택</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _keyboardDidShow = () => {
        this.isShowKeyboard = true;
    }

    _keyboardDidHide = () => {
        this.isShowKeyboard = false;
    }

    onChangeSelectedIndex = (index) => {
        this.setState({
            selectedIndex: index
        });
    }

    onCancel = () => {
        const { prevIndex } = this.state;

        this.setState({
            selectedIndex: prevIndex
        });
        this.onPress();
    }

    onPressServer = () => {
        const { selectedIndex, items, manualText } = this.state;

        this.isShowKeyboard && Keyboard.dismiss();

        SetSaveIndex(selectedIndex)
            .then(result => {
                if(selectedIndex == 2){
                    SetSaveLocalUrl(manualText);
                }
                setConfigUrl(items[selectedIndex].url);
                this.onPress();
                NavigationService.popToRestart({ deeplink: this.deeplink, transition: "bottom" });
            });
    }

    onPress = (e) => {
        this.props.click && this.props.click(e);
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
        width: "50%", height: "50%",
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
    },
    modalButtonView: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
    }
});

ServerButton.defaultProps = defaultProps;
ServerButton.propTypes = propTypes;

export default ServerButton;