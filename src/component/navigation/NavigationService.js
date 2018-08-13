import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

//최상위 navigator 설정
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

//navigate 동작
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName, params
        })
    );
}

function goBack() {
    _navigator.dispatch(
        NavigationActions.back()
    );
}

function popToTop() {
    _navigator.dispatch(
        StackActions.popToTop({
            type : "Navigation/POP_TO_TOP"
        })
    );
}

export default {
    navigate,
    setTopLevelNavigator,
    goBack,
    popToTop,
};