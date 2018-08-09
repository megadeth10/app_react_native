import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, AppState, ViewPagerAndroid, StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';
import NavigationService from './NavigationService';
import CategoryData from './RestApi/CategoryData';
const propTypes = {
}

const defaultProps = {
}

class PagerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        const { data } = this.state;
        if (!data) {
            this.getData();
        }
    }

    render() {
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Body>

                        <Title style={ { color: "#000000", paddingLeft: 20 } }>Pager</Title>
                    </Body>
                </Header>
                <Content>
                    <ViewPagerAndroid
                        style={ styles.viewPager }
                        initialPage={ 1 }>
                        <View style={ styles.pageStyle_1 } key="1">
                            <Text>First page</Text>
                        </View>
                        <View style={ styles.pageStyle_2 } key="2">
                            <Text>Second page</Text>
                        </View>
                    </ViewPagerAndroid>
                </Content>
            </Container>
        );
    }

    getData = () => {
        CategoryData.getFoodHomeData().then(
            (result) => {
                if (result) {
                    const { list } = result;
                    console.log(list);
                } else {
                    console.warn("response error");
                }
            }
        );
    }
};

const styles = StyleSheet.create({
    viewPager: {
        height: 100,
        width: "100%",
        backgroundColor: "#fdd002",
        marginTop: 10,
    },
    pageStyle_1: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: "red",
    },
    pageStyle_2: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: "blue",
    }
});

PagerScreen.defaultProps = defaultProps;
PagerScreen.propTypes = propTypes;

export default PagerScreen;