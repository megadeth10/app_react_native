import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'redux-zero/react';
import AppStack from './AppStack';
import store from '../redux_zero/store';
import CodePushComponent from '../codePush/CodePushComponent';
class App extends Component {

    render() {
        return (
            <View style={ { flex: 1 } }>
                <Provider store={ store }>
                    { AppStack.getStack() }
                </Provider>
                <CodePushComponent />
            </View>
        );
    }
}


export default App;