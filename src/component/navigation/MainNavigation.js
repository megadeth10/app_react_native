import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'redux-zero/react';
import AppStack from './AppStack';
import store from '../redux_zero/store';
import CodePushComponent from '../codePush/CodePushComponent';
import RNLanguages from 'react-native-languages';
import i18n from '../language/i18n';

class App extends Component {
    componentWillMount() {
        RNLanguages.addEventListener('change', this._onLanguagesChange);
    }

    componentWillUnmount() {
        RNLanguages.removeEventListener('change', this._onLanguagesChange);
    }

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

    _onLanguagesChange = ({ language }) => {
        i18n.locale = language;
    };
}


export default App;