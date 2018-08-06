import React from 'react';
import { Provider } from "redux-zero/react";
import MainNavigation from '../navigation/MainNavigation';
import AppStack from '../navigation/AppStack';
import store from './store';

// class App extends React.Component {

// }

export default function App() {
  return (
    <Provider store={store}>
      {/* <MainNavigation /> */}
      {AppStack.getStack()}
    </Provider>
  );
}