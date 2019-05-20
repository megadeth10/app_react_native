import { createStackNavigator } from 'react-navigation';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import DetailsScreen from './DetailsScreen';
import PagerScreen from './PagerScreen';
import StoreDetail from './StoreDetail';
import VenderListScreen from './VenderListScreen';
import AddressinMapScreen from './AddressinMapScreen';
import InputScreen from './InputScreen';
import WebViewScreen from './WebViewScreen';
import LoginScreen from './LoginScreen';
import ImageLayoutScreen from './ImageLayoutScreen';
import CameraScreen from './CameraScreen';
import FaceBookScreen from './FaceBookScreen';
import AccordionScreen from './AccordionScreen';
import HeaderScrollView from '../ParallaxScroll/HeaderScrollView';
import NavigationService from './NavigationService';
import React, { Component } from 'react';
import { Easing, Animated } from 'react-native';

let AStack = undefined;

function setScreenName() {
    return [
        {
            key: "SplashScreen",
            value: {
                screen: SplashScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "Home",
            value: {
                screen: HomeScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "Category",
            value: {
                screen: CategoryScreen,
                mode: "card",
                navigationOptions: {
                    header: null
                }
            },
        },
        {
            key: "Details",
            value: {
                screen: DetailsScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "Pager",
            value: {
                screen: PagerScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "StoreDetail",
            value: {
                screen: StoreDetail,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "VenderListScreen",
            value: {
                screen: VenderListScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "AddressinMapScreen",
            value: {
                screen: AddressinMapScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "InputScreen",
            value: {
                screen: InputScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "WebViewScreen",
            value: {
                screen: WebViewScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "LoginScreen",
            value: {
                screen: LoginScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "ImageLayoutScreen",
            value: {
                screen: ImageLayoutScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "CameraScreen",
            value: {
                screen: CameraScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "FaceBookScreen",
            value: {
                screen: FaceBookScreen,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "HeaderScrollView",
            value: {
                screen: HeaderScrollView,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            key: "AccordionScreen",
            value: {
                screen: AccordionScreen,
                navigationOptions: {
                    header: null
                }
            }
        },

    ];
}

const SCREEN_NAME = new setScreenName();

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps

            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth

            // We can access our navigation params on the scene's 'route' property
            var thisSceneParams = scene.route.params || {}

            const translateX = position.interpolate({
                //덥히는 screen
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
                //우측으로 연결된 screen
                // inputRange: [thisSceneIndex - 1, thisSceneIndex],
                // outputRange: [width, 0]
            })

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0]
            })

            const opacity = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
                outputRange: [0, 1, 1],
            })

            const scale = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [4, 1, 1]
            })

            const slideFromRight = { transform: [{ translateX }] }
            const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
            const slideInFromBottom = { transform: [{ translateY }] }

            if (thisSceneParams.transition === "up") return slideInFromBottom

            return slideFromRight
            // else return scaleWithOpacity
        },
    }
}

function getStack() {
    if (AStack === undefined) {
        const screenMap = {};
        for (item of SCREEN_NAME) {
            screenMap = { ...screenMap, [item.key]: item.value };
        }

        AStack = createStackNavigator(

            screenMap,
            {
                initialRouteName: SCREEN_NAME[0].key,
                transitionConfig,
            }
        );
    }
    return (
        <AStack ref={ stackRef => {
            NavigationService.setTopLevelNavigator(stackRef)
        } } />
    );
}

export default {
    getStack,
    SCREEN_NAME
};