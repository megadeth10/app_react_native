import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AppState, BackHandler, Platform, AsyncStorage, ViewPagerAndroid, NativeModules } from 'react-native';
import _ from 'lodash';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { Container, Header, Left, Body, Icon, Title, Text, Content, Button } from 'native-base';
import update from 'immutability-helper';

const propTypes = {
}

const defaultProps = {
}

const KAKAOTOKEN = "KAKAO_TOKEN";
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kakaoToken: undefined,
            kakaoProfile: undefined
        }
    }

    componentDidMount() {
        this.getKakaoToken();
    }

    render() {
        return (
            <Container style={ { backgroundColor: "#ffffff" } }>
                <Header style={ { backgroundColor: "#fdd002" } }>
                    <Left>
                        <Button transparent onPress={ this.onBackPress } >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={ { color: "#000000", paddingLeft: 20 } }>로그인</Title>
                    </Body>
                </Header>
                <Content>
                    <Button onPress={ this.kakaologin }>
                        <Text>카카오 로그인</Text>
                    </Button>
                    {
                        this.state.kakaoToken && <Text>{ this.state.kakaoToken } </Text>
                    }

                    <Button onPress={ this.getKAKAOProfile }>
                        <Text>사용자 프로필</Text>
                    </Button>
                    {
                        this.state.kakaoProfile && <Text>{ this.state.kakaoProfile } </Text>
                    }

                    <Button onPress={ this.kakaoLogOut }>
                        <Text>로그 아웃</Text>
                    </Button>

                    <Button onPress={ this.kakaoTalkLink }>
                        <Text>카카오 톡 링크</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    kakaoTalkLink = () => {
        NativeModules.KakaoLinkModule.KakaoTalkShareLink((result, err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    }


    getKakaoToken = async () => {
        try {
            const value = await AsyncStorage.getItem(KAKAOTOKEN);
            if (value !== null) {
                const { kakaoToken } = this.state;
                this.setState({
                    kakaoToken: update(kakaoToken, {
                        $set: value
                    })
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    setKakaoToken = async () => {
        try {
            const { kakaoToken } = this.state;
            await AsyncStorage.setItem(KAKAOTOKEN, kakaoToken);
        } catch (error) {
            console.log(error);
        }
    }

    _resetData = async () => {
        try {
            await AsyncStorage.removeItem(KAKAOTOKEN);
        } catch (error) {
            console.log(error);
        }
    }

    kakaoLogOut = () => {
        NativeModules.RNKakaoLogins.logout((err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            this.setState({
                kakaoProfile: undefined,
                kakaoToken: undefined
            }, this._resetData);
        });
    }

    getKAKAOProfile = async () => {
        NativeModules.RNKakaoLogins.getProfile((err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            const data = JSON.parse(result);
            if (data) {
                const { kakaoProfile } = this.state;
                this.setState({
                    kakaoProfile: update(kakaoProfile, {
                        $set: JSON.stringify(data)
                    })
                });
            }
        });
    }

    kakaologin = async () => {

        NativeModules.RNKakaoLogins.login((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            try {
                const data = JSON.parse(result);
                if (data && data.token) {
                    const { kakaoToken } = this.state;
                    this.setState({
                        kakaoToken: update(kakaoToken, {
                            $set: data.token
                        })
                    }, this.setKakaoToken);
                }
            } catch (err) {
                console.log(err);
            }
        });
    }

    onBackPress = () => {
        NavigationService.goBack();
    }
};

LoginScreen.defaultProps = defaultProps;
LoginScreen.propTypes = propTypes;

export default LoginScreen;