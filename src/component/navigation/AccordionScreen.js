import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, AppState, ViewPagerAndroid, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { CategoryData } from '../navigation/RestApi/CategoryData';
import update from 'immutability-helper';
import _ from 'lodash';
import DeviceUtil from '../utils/DeviceUtil';
import NavigationService from '../navigation/NavigationService';
import VenderList from '../view/VenderList';
import AppStack from '../navigation/AppStack';
import Accordion from 'react-native-collapsible/Accordion';


const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];

class AccordionScreen extends Component {
    state = {
        activeSections: [],
    };

    _renderSectionTitle = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}


export default AccordionScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
    },
});
