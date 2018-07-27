// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Tab1 from './src/component/Tab1';
import MainFooter from './src/component/MainFooter';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    offset: undefined,
    isShownFooter: true,
  };

  render() {
    return (
      <View style={ { flex: 1, flexDirection: 'column' } } >
        <Container>

          <Content onScroll={ this.onScrollContent }>
            <Header hasTabs>
              <Left>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Header</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </Header>
            <Tabs renderTabBar={ () => <ScrollableTab /> }>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
              <Tab heading="Tab1">
                <Tab1 />
              </Tab>
            </Tabs>
          </Content>
        </Container>
        <MainFooter isShow={ this.state.isShownFooter } />
      </View>
    );
  }

  onScrollContent = (event) => {
    const { offset, isShownFooter } = this.state;
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offset || 0);

    // if (Math.abs(dif) < 3) {
    //   console.log('unclear');
    // } else 

    if (currentOffset < this.offset) {
      if (!isShownFooter) {
        this.setState({ isShownFooter: true });
      }
    } else {
      if (isShownFooter) {
        this.setState({ isShownFooter: false });
      }
    }
    this.offset = currentOffset;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*
import React, { Component, Object } from 'react';

export default class App extends Component {
  state = {
    disabled: true,
  }
  onChange = (e) => {
    const length = e.target.value.length;
    if (length >= 4) {
      this.setState(() => ({ disabled: false }))
    } else if (!this.state.disabled) {
      this.setState(() => ({ disabled: true }))
    }
  }
  render() {
    const label = this.state.disabled ? 'Disabled' : 'Submit';
    return (
      <div className="App">
        <button
          style={Object.assign({}, styles.button, !this.state.disabled && styles.buttonEnabled)}
          disabled={this.state.disabled}
        >{label}</button>
        <input
          style={styles.input}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  input: {
    width: 200,
    outline: 'none',
    fontSize: 20,
    padding: 10,
    border: 'none',
    backgroundColor: '#ddd',
    marginTop: 10,
  },
  button: {
    width: 180,
    height: 50,
    border: 'none',
    borderRadius: 4,
    fontSize: 20,
    cursor: 'pointer',
    transition: '.25s all',
  },
  buttonEnabled: {
    backgroundColor: '#ffc107',
    width: 220,
  }
}
*/
