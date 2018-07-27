import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, View } from 'native-base';
import { Animated, Easing, UIManager, Platform, LayoutAnimation } from 'react-native';
const propTypes = {
}

const defaultProps = {
}


class MainFooter extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.state = {
            isShow: props.isShow,
            value: 0,
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isShow !== this.state.isShow) {
            this.setState({
                isShow: nextProps.isShow,
            });
            this.changePosition();
        }
    }

    render() {

        console.debug("render : " + this.state.value);
        return (
            <Footer style={ { position: 'absolute', bottom: this.state.value } }>
                <FooterTab>
                    <Button badge vertical>
                        <Badge><Text>2</Text></Badge>
                        <Icon name="apps" />
                        <Text>Home</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button active badge vertical>
                        <Badge ><Text>51</Text></Badge>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="person" />
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }


    changePosition = () => {
        const { isShow } = this.state;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (isShow) {
            console.log("show");
            this.setState({
                value: -50,
            });
        } else {
            console.log("hide");
            this.setState({
                value: 0,
            });
        }
    }
};

MainFooter.defaultProps = defaultProps;
MainFooter.propTypes = propTypes;

export default MainFooter;