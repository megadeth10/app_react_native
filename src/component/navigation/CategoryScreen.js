import React, { Component } from 'react';
import { Button, View, Text, AppState } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { connect } from 'redux-zero/react';
import actions from '../redux_zero/action';

class CategoryScreen extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: 'Category',
    //         headerStyle: {
    //             backgroundColor: '#fdd002',
    //         },
    //         // headerRight: (
    //         //     <Button
    //         //         onPress={navigation.getParam('next')}
    //         //         title="G"
    //         //         color="#000"
    //         //     />
    //         // ),
    //         // headerLeft: (
    //         //     <Button
    //         //         onPress={navigation.getParam('back')}
    //         //         title="<-"
    //         //         color="#000"
    //         //     />
    //         // ),
    //     };
    // }

    constructor(props) {
        super(props);
        console.log("constructor");
        const item = props.navigation.getParam("group", []);
        this.state = {
            group: item
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        AppState.removeEventListener('change', this._handleAppStateChange);
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.didFocus) {
            this.didFocus.remove();
        }
        if (this.didBlur) {
            this.didBlur.remove();
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ back: this.back });
        this.props.navigation.setParams({ next: this.next });
        AppState.addEventListener('change', this._handleAppStateChange);
        

        //Screen state값 lifecycle과 유사함.
        this.didFocus = this.props.navigation.addListener('didFocus', payload => {
            this.timer = setInterval(this.timeSetHandler, 1000);
            console.debug('disFocus', payload);
        });

        //Screen state값 lifecycle과 유사함.
        this.didBlur  = this.props.navigation.addListener('didBlur', payload => {
            console.debug('didBlur', payload);
            if (this.timer) {
                clearInterval(this.timer);
            }
        });
    }

    render() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        const otherParam = this.props.navigation.getParam('otherParam', 'some default value');
        return (
            <View>
                <Button
                    title="Go to Jane's profile"
                    onPress={ () =>
                        NavigationService.navigate("Details", { name: 'Jane' })
                    }
                />
                <Text>itemId: { JSON.stringify(itemId) }</Text>
                <Text>otherParam: { JSON.stringify(otherParam) }</Text>
                <View>
                    <Text>사용자</Text>
                    { this.renderUsers() }
                </View>
            </View>
        );
    }

    back = () => {
        // const { navigation } = this.props;
        // navigation.goBack();
        NavigationService.goBack();
    }

    next = () => {
        // const { navigation } = this.props;
        // navigation.navigate("Details");
        NavigationService.navigate(AppStack.SCREEN_NAME[2].key, {});
    }

    renderUsers = () => {
        let { group } = this.state;

        if (group.length === 0) {
            group = ["a", "b", "c", "d"];
        }

        return group.map((item) => {
            console.log(item);
            return (<Text key={ item }>{ item }</Text>);
        });
    }

    _handleAppStateChange = (nextAppState) => {
        // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log(nextAppState)
        // }
        // this.setState({appState: nextAppState});
    }

    timeSetHandler = () => {
          console.log("timeSetHandler");
    }
}
const mapToProps = ({ userInfo }) => ({ userInfo });


export default connect(mapToProps, actions)(CategoryScreen);