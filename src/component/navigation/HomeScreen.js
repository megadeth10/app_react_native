import React, { Component } from 'react';
import { Button } from 'react-native';


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
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go to Category"
                onPress={ () =>
                    navigate('Category', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                        group: ["aaa","bbb"]
                    })
                }
            />
        );
    }
}

export default HomeScreen;