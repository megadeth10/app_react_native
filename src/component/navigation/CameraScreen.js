import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, AppState, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const propTypes = {
}

const defaultProps = {
}

const options = {
    title: "사진 선택",
    takePhotoButtonTitle: "카메라",
    chooseFromLibraryButtonTitle: "갤러리",
    cancelButtonTitle: "취소",
    noData: true,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CameraScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: undefined
        }
    }
    render() {
        const { imageUrl } = this.state;

        return (
            <View>
                <Button style={ { y: 0 } } title="카메라로 이동" onPress={ this.gotoCamera } />
                {
                    imageUrl ?
                        (<Image
                            source={ imageUrl }
                            style={ {
                                width: "100%",
                                height: "100%"
                            } }
                            resizeMode="contain"
                            onLoadEnd={ this.onLoadEnd }
                        />) :
                        (
                            <Text> 이미지 없음 </Text>
                        )
                }
            </View>
        );
    }

    onLoadEnd = () => {
        console.log('onLoadEnd');
    }

    gotoCamera = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.path };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                if (Platform.OS === "android") {
                    if (typeof source.uri === "string") {
                        // const slice = source.uri.split("content:/");
                        const absolutePath = `file://${source.uri}`;
                        console.log(absolutePath);
                        this.setState({
                            imageUrl: { uri: absolutePath }
                        });
                    }
                }
            }
        });
    }
};

CameraScreen.defaultProps = defaultProps;
CameraScreen.propTypes = propTypes;

export default CameraScreen;