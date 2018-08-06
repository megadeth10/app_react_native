import React, { Component } from 'react';
import { Provider } from 'redux-zero/react';
import AppStack from './AppStack';
import store from '../redux_zero/store';

export default function App() {
    return (
        <Provider store={ store }>
            { AppStack.getStack() }
        </Provider>
    );
}