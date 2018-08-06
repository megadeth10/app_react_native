import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import NavigationService from './NavigationService';
import AppStack from './AppStack';
import { connect } from 'redux-zero/react';
import actions from '../redux_zero/action';

class DetailsScreen extends Component {
    // static navigationOptions = {
    //     title: 'Details',
    // };

    constructor(props) {
        super(props);
        console.log("constructor");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");
        return true;
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        const { setUser, userInfo } = this.props;
        return (
            <View>
                <Button
                    title="Back to Home"
                    onPress={ () =>
                        NavigationService.popToTop()
                    }
                />

                <Text>{ setUser ?  userInfo.name : "redux undefine" }</Text>

                <Button
                    title="go to Category"
                    onPress={ () =>
                        NavigationService.navigate(AppStack.SCREEN_NAME[1].key, {})
                    }
                />
                <Button
                    title="change user"
                    onPress={ () =>
                        setUser({ name: "ccccccc" })
                    }
                />
            </View>
        );
    }


}
const mapToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapToProps, actions)(DetailsScreen);