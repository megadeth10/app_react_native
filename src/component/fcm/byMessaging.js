import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase';
import { Platform } from 'react-native';
export default async (message) => {
    console.log(message);
    const notification = new firebase.notifications.Notification();
    if (Platform.OS === "android"){
        notification.setNotificationId("1");
        notification.setTitle("백그라운드 메시지");
        notification.setBody("되나요??");

        if (Platform.Version >= 26) {//set channel
            notification.android.setChannelId("리액트 테스트");
        }
    }
    firebase.notifications().displayNotification(notification);

    return Promise.resolve();
}