import React, { Component } from 'react';
import { Button, View } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
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
                    title="Go to Category"
                    onPress={ () =>
                        NavigationService.navigate(AppStack.SCREEN_NAME[1].key, {
                            itemId: 86,
                            otherParam: 'anything you want here',
                            group: ["aaa", "bbb"]
                        })
                    }
                />
                <Button
                    title="Go to Detail"
                    onPress={ () =>
                        NavigationService.navigate(AppStack.SCREEN_NAME[2].key, {
                        })
                    }
                />
            </View>
        );
    }
}

export default HomeScreen;