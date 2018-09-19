import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { LoginButton, GraphRequest, GraphRequestManager, ShareDialog, Alert, LoginManager } from 'react-native-fbsdk';

const propTypes = {
}

const defaultProps = {
}

class FaceBookScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facebookId: undefined
        };
    }
    render() {
        return (
            <View>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                // AccessToken.getCurrentAccessToken().then(
                                //     (data) => {
                                //         console.log(data.accessToken.toString())
                                //     }
                                // )
                                const infoRequest = new GraphRequest(
                                    '/me',
                                    null,
                                    this._responseInfoCallback,
                                );
                                new GraphRequestManager().addRequest(infoRequest).start();
                            }
                        }
                    }
                    onLogoutFinished={ () => console.log("logout.") } />
                {
                    this.state.facebookId ?
                        (
                            <View>
                                <Button title="페북 공유" onPress={ this.onPress } />
                                <Button title="페북 Logout" onPress={ this.onPressLogout } />
                            </View>
                        ) : null
                }

            </View>
        );
    }

    onPressLogout = () => {
        this.setState({
            facebookId: undefined
        }, LoginManager.logOut());
    }

    onPress = () => {
        const sharePhotoContent = {
            contentType: 'photo',
            photos: [{ imageUrl: "http://image.fingerpush.com/upload/push/20180910/20180910155558(0).jpg" }],
        }

        ShareDialog.canShow(sharePhotoContent)
            .then((canShow) => {
                if (canShow) {
                    return ShareDialog.show(sharePhotoContent);
                } else {
                    Alert.alert("로그인을 해주세요.");
                }
            })
            .then((result) => {
                if (result.isCancelled) {
                    console.log('Share cancelled');
                } else {
                    console.log('Share success with postId: '
                        + result.postId);
                }
                this.onPressLogout();
            }, (error) => {
                console.log('Share fail with error: ' + error);
            });

    }

    _responseInfoCallback = (error, result) => {
        try {
            if (error) {
                console.log('Error fetching data: ' + error.toString());
            } else {
                console.debug(result);
                this.setState({
                    facebookId: result.id
                });
            }
        } catch (err) {
            console.log('Error fetching data: ' + err.toString());
            this.setState({
                facebookId: undefined
            });
        }
    }
};

FaceBookScreen.defaultProps = defaultProps;
FaceBookScreen.propTypes = propTypes;

export default FaceBookScreen;