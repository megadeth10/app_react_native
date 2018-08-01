import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { Spinner } from 'native-base';

const propTypes = {
}

const defaultProps = {
}

class MainNetwork extends Component {
    constructor(props) {

        //todo react navigatgor screen change and redux-zero
        super(props);
        this.state = {
            json: "test"
        }
    }
    render() {
        return (
            <View>
                <Text> network test</Text>
                <ActivityIndicator/>
                <TouchableNativeFeedback
                    onPress={ this.getData }
                    background={ TouchableNativeFeedback.SelectableBackground() }>
                    <View style={ { width: 150, height: 100, backgroundColor: 'red' } }>
                        <Text style={ { margin: 30 } }>Button</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text>{ this.state.json }</Text>
            </View>
        );
    }

    getData = () => {
        return fetch('http://14.63.172.164/mobile/users/selectStaticLastUpdateList.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                compId: "DD1",
            })
        }).then((result) => { return result.json(); })
            .then(json => {
                console.log(json);
                this.setState({ json: JSON.stringify(json) });
            })
            .catch(error => { console.error(error) });
    }
};

MainNetwork.defaultProps = defaultProps;
MainNetwork.propTypes = propTypes;

export default MainNetwork;