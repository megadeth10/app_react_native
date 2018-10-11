import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text, Image, Platform, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
/**
 * ImageResizer.java (for Android)
 * createResizedImage() method에 아래 코드 수정하여 file name 유지 하도록 변경함.
 * //        if (outputPath != null) {
 * //            path = new File(outputPath);
 * //        }
        //기존 파일 삭제
        for(File file : path.listFiles()){
            if(file.getName().equals(outputPath+"."+compressFormat.name())){
                file.delete();
            }
       }
       
       File newFile = ImageResizer.saveImage(rotatedImage, path,
        outputPath, compressFormat, quality);

 */

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
    },
    permissionDenied:{
        title: "권한 설정 오류",
        text:"카메라, 저장 등에 대한 권한을 허락 하지 않아 사용할 수 없습니다.",
        reTryTitle:"권한 설정하기",
        okTitle:"닫기"
    }
};

// TODO 카메라 및 갤러리 이미지 3M로 downgrade 하도록 변경 해야함.
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
                            onLoadStart={ this.onLoadStart }
                            onLoadEnd={ this.onLoadEnd }
                        />) :
                        (
                            <Text> 이미지 없음 </Text>
                        )
                }
            </View>
        );
    }

    onLoadStart = () => {
        console.log('onLoadStart');
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
                        const absolutePath = `file://${source.uri}`;
                        if (response.fileSize > 3600000) {
                            console.log("large image file(byte): " + response.fileSize);
                            //file resize
                            ImageResizer.createResizedImage(response.uri, 1280, 720, "JPEG",
                                100, 0, "1")
                                .then((response) => {
                                    const { path } = response;

                                    if (path) {
                                        console.log("resize image file(byte): " + response.size);
                                        console.log("resize image file(path): " + path);
                                        const resizePath = `file://${path}`;
                                        //파일명은 동일 하지만 uri의 paramter가 변경된것으로 인식하여 cache를 사용하지 않고 reload 함
                                        // "? new Date()" parameter 추가함.
                                        this.setState({
                                            imageUrl: { uri: resizePath + "?" + new Date() }
                                        });
                                    } else {
                                        throw new Error("이미지 파일 오류");
                                    }
                                })
                                .catch((err) => {
                                    Alert.alert('이미지 파일 오류.\n' + err);
                                });
                        } else {
                            console.log("resize image file(byte): " + response.fileSize);
                            console.log("resize image file(path): " + absolutePath);
                            //파일명은 동일 하지만 uri의 paramter가 변경된것으로 인식하여 cache를 사용하지 않고 reload 함
                            this.setState({
                                imageUrl: { uri: absolutePath + "?" + new Date() }
                            });
                        }
                    }
                }
            }
        });
    }
};

CameraScreen.defaultProps = defaultProps;
CameraScreen.propTypes = propTypes;

export default CameraScreen;