import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Container, Header, Content, Tab, Tabs, ScrollableTab, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Tab1 from './Tab1';
import MainFooter from './MainFooter';

const propTypes = {
}

const defaultProps = {
}

class TabMain extends Component {
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
        const { isShownFooter } = this.state;
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (this.offset || 0);

        // if (Math.abs(dif) < 3) {
        //   console.log('unclear');
        //   this.setState({ isShownFooter: true });
        //   return;
        // } 
        if (currentOffset === 0) {
            this.setState({ isShownFooter: true });
        } else if (currentOffset < this.offset) {
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

};

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

TabMain.defaultProps = defaultProps;
TabMain.propTypes = propTypes;

export default TabMain;