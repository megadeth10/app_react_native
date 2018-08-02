import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';


class DetailsScreen extends Component {
    static navigationOptions = {
        title: 'Details',
    };

    constructor(props) {
        super(props);
        console.log("constructor");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        const { popToTop } = this.props.navigation;
        return (
            <View>
                <Button
                    title="Back to Home"
                    onPress={ () =>
                        popToTop()
                    }
                />

                <Text>{ this.props.name }</Text>
            </View>
        );
    }
}

export default DetailsScreen;