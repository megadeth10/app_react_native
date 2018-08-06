import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
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
    }

    componentDidMount(){
        this.props.navigation.setParams( {back :  this.back});
        this.props.navigation.setParams( {next :  this.next});
    }

    render() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        const otherParam = this.props.navigation.getParam('otherParam', 'some default value');
        return (
            <View>
                <Button
                    title="Go to Jane's profile"
                    onPress={ () =>
                        NavigationService.navigate(AppStack.SCREEN_NAME[2].key, { name: 'Jane' })
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
}
const mapToProps = ({ userInfo }) => ({ userInfo });


export default connect(mapToProps, actions)(CategoryScreen);