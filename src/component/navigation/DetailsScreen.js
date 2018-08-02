import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';

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
        return (
            <View>
                <Button
                    title="Back to Home"
                    onPress={ () =>
                        NavigationService.popToTop()
                    }
                />

                <Text>{ this.props.name }</Text>

                <Button
                    title="go to Category"
                    onPress={ () =>
                        NavigationService.navigate(AppStack.SCREEN_NAME[1].key,{})
                    }
                />
            </View>
        );
    }
}

export default DetailsScreen;