import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollView from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button } from "native-base";

const propTypes = {
}

const defaultProps = {
}

class Tab1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardItem header bordered>
                    <Text>NativeBase</Text>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Button onPress={this.onPressButton}><Text>다음화면</Text></Button>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>

                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>
                        <Text>
                            NativeBase is a free and open source framework that enable
                            developers to build
                            high-quality mobile apps using React Native iOS and Android
                            apps
                            with a fusion of ES6.
                            </Text>

                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Text>GeekyAnts</Text>
                </CardItem>
            </Card>
        );
    }

    onPressButton = () => {
        console.log("onPressButton");
    }
};

Tab1.defaultProps = defaultProps;
Tab1.propTypes = propTypes;

export default Tab1;