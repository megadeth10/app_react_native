/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import CollapsingNav from './src/stickyScroll/CollapsingNav';
import MainNavigation from './src/component/navigation/MainNavigation';
import testMain from './src/component/redux_test/testMain';
import {name as appName} from './app.json';
//fcm
import bgMessaging from './src/component/fcm/byMessaging';

AppRegistry.registerComponent(appName, () => MainNavigation);

//fcm
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
