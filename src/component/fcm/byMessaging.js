import firebase from 'react-native-firebase';
import { Platform } from 'react-native';

export default async (message) => {
    console.log("백그라운드");
    console.log(message);
    if (Platform.OS === "android") {
        const { data } = message;

        const notification = new firebase.notifications.Notification();
        const title = data["data.title"] ? data["data.title"] + "foreground 메시지" : "foreground 메시지";
        const bodyMsg = data["data.message"] ? decodeURIComponent(data["data.message"].replace(/\+/g, '%20')) : "푸시왔다";
        notification.setNotificationId("1");
        notification.setTitle(title);
        notification.setBody(bodyMsg);
        notification.android.setDefaults([firebase.notifications.Android.Defaults.All]);
        // if (Platform.Version >= 26) {//set channel
        notification.android.setChannelId("리액트 테스트");
        // }
        if (data["data.imgUrl"]) {
            notification.android.setBigPicture(data["data.imgUrl"], "ic_launcher", title, bodyMsg);
        }

        firebase.notifications().displayNotification(notification);
    }

    return Promise.resolve();
}