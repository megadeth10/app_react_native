package com.app_android_test.fingerpush;

import android.app.ActivityManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;

import com.app_android_test.MainActivity;
import com.app_android_test.utils.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.fingerpush.android.FingerPushFcmListener;

import com.app_android_test.R;
import com.google.firebase.messaging.RemoteMessage;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Iterator;
import java.util.List;

import io.invertase.firebase.Utils;
import io.invertase.firebase.messaging.RNFirebaseBackgroundMessagingService;
import io.invertase.firebase.messaging.RNFirebaseMessagingService;

/**
 * Created by 한병규 on 2017-05-19.
 */

public class IntentService extends FingerPushFcmListener{
    private static final String TAG = IntentService.class.getSimpleName();

    private String code = "";  // 푸시 타입을 가져올 수 있다.
    private String mode = "";  //  푸시 메시지 모드
    private String message = "";  // 메세지 내용
    private String title = "";  // 메세지 제목
    private String sound = "";  // 메세지 수신음
    private String badge = "";  // 메세지 뱃지 수
    private String img = "";  // 삽입 이미지
    private String imageURL = "";  // 이미지 경로
    private String webLink = "";  // 웹 경로
    private String msgTag = "";  // 메세지 번호
    private String custom1 = "";  // 커스텀 필드 키(홈페이지에서 입력한 키를 입력)
    private String custom2 = "";  // 커스텀 필드 키(홈페이지에서 입력한 키를 입력)
    private String custom3 = "";  // 커스텀 필드 키(홈페이지에서 입력한 키를 입력)
    private String labelCode = "";  // 메세지 라벨

    @Override
    public void onMessage(Context context, Bundle data) {
        //must be used api 26 above
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel mChannel = new NotificationChannel(getString(R.string.notification_channel_id), getString(R.string.notification_channel_id), NotificationManager.IMPORTANCE_HIGH);
            mChannel.setDescription(getString(R.string.notification_channel_desc));
            mNotificationManager.createNotificationChannel(mChannel);
        }


        Iterator<String> iterator = data.keySet().iterator();

        while (iterator.hasNext()) {
            String key = iterator.next();
            String value = data.get(key).toString();
            try {
                if(key.equalsIgnoreCase("data.code")){
                    this.code = URLDecoder.decode(value, "UTF-8");

                    // 모드 설정
                    String[] codeArray = code.split(";");
                    for(String mode : codeArray){
                        if(mode.contains("PT")) {
                            this.mode = mode.trim().substring(mode.trim().indexOf(":")+1);
                            break;
                        }
                    }
                    if(TextUtils.isEmpty(this.mode)) this.mode = "STOS";
                } else if(key.equalsIgnoreCase("data.message")){
                    this.message = URLDecoder.decode(value, "UTF-8");
                    if(TextUtils.isEmpty(message)) this.message = context.getString(R.string.app_name);
                } else if(key.equalsIgnoreCase("data.title")){
                    this.title = value;
                    if(TextUtils.isEmpty(title)) this.title = context.getString(R.string.app_name);
                } else if(key.equalsIgnoreCase("data.sound")){
                    this.sound = value;
                } else if(key.equalsIgnoreCase("data.badge")){
                    this.badge = value;
                } else if(key.equalsIgnoreCase("data.img")){
                    this.img = value;
                } else if(key.equalsIgnoreCase("data.imgUrl")){
                    this.imageURL = value;
                } else if(key.equalsIgnoreCase("data.weblink")){
                    this.webLink = value;
                } else if(key.equalsIgnoreCase("data.msgTag")){
                    this.msgTag = value;
                } else if(key.equalsIgnoreCase("data.cd1")){
                    this.custom1 = value;
                } else if(key.equalsIgnoreCase("data.cd2")){
                    this.custom2 = value;
                } else if(key.equalsIgnoreCase("data.cd3")){
                    this.custom3 = value;
                } else if(key.equalsIgnoreCase("data.labelCode")){
                    this.labelCode = value;
                }
            } catch (UnsupportedEncodingException e) {
            } catch (NullPointerException e) {
            }

            Log.d(TAG, "onMessage ::: key:" + key + ", value:" + value);
        }

        int badgeCount = 0;
        if (badge != null && !badge.trim().equals("")) {
            badgeCount = Integer.parseInt(badge);
        }

        if (badgeCount >= 0) {
            Intent badgeIntent = new Intent("android.intent.action.BADGE_COUNT_UPDATE");
            badgeIntent.putExtra("badge_count", badgeCount);
            // 메인 메뉴에 나타나는 어플의 패키지 명
            badgeIntent.putExtra("badge_count_package_name", context.getPackageName());
            context.sendBroadcast(badgeIntent);
        }

        if (Utils.isAppInForeground(this.getApplicationContext())) {
            Intent messagingEvent = new Intent(RNFirebaseMessagingService.MESSAGE_EVENT);
            messagingEvent.putExtra("message", remoteMessage);
            // Broadcast it so it is only available to the RN Application
            LocalBroadcastManager.getInstance(this).sendBroadcast(messagingEvent);
        } else {
            try {
                // If the app is in the background we send it to the Headless JS Service
                Intent headlessIntent = new Intent(this.getApplicationContext(), RNFirebaseBackgroundMessagingService.class);
                headlessIntent.putExtra("message", remoteMessage);
                this.getApplicationContext().startService(headlessIntent);
                HeadlessJsTaskService.acquireWakeLockNow(this.getApplicationContext());
            } catch (IllegalStateException ex) {
                Log.e(TAG, "Background messages will only work if the message priority is set to 'high'", ex);
            }
        }
//        checkNowApp(context);
    }

    RemoteMessage remoteMessage = null;

    public void onMessageReceived(RemoteMessage var1) {
        remoteMessage = var1;
        super.onMessageReceived(var1);
    }


    /**
     * 현재 띵동 app 가 실행중 인지 확인 하여 액션를 분기 한다.
     */
    private void checkNowApp(Context context) {
        boolean isRunning = false;
        ActivityManager activityManager = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);

        List<ActivityManager.RunningTaskInfo> runningTaskInfo = activityManager.getRunningTasks(1);  // 현재 러닝중인 app 1개(최상위)를 가지겨옴
        if(runningTaskInfo != null) {
            for(ActivityManager.RunningTaskInfo taskInfo : runningTaskInfo){ // 1개만 가져왔으나 러닝중인 앱이 없을 경우 대비
                if(taskInfo.topActivity.getPackageName().equals(getApplicationContext().getPackageName())){
                    isRunning = true;
                }

                break;  // 한개 이상 가져왔다면 최상위 한개만 필요하니 반복문 해제
            }
        }

        if(isRunning){  // 실행중
            setNotiPopup();
        } else {  // 미 실행중
            setNotification(context);
        }
    }

    /**
     * Custom 띵동 notification 발생
     * @param context
     */
    private void setNotification(final Context context){
        /*final Intent intent = new Intent();
        // finger push check
        intent.putExtra("message_number", msgTag);
        intent.putExtra("message_mode", mode);
        intent.putExtra("message_labelcode", labelCode);
        // finger push check

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        if(!TextUtils.isEmpty(webLink) && webLink.contains(ExtraName.HOST_LINK) && webLink.contains(ExtraName.SCHEME)){//deepLink처럼 들어 올꺼냐?
//            Uri uri = Uri.parse(webLink);
//            intent.setData(uri);
//            intent.setAction(Intent.ACTION_VIEW);
//        } else {
            intent.setClass(getApplicationContext(), MainActivity.class);
//        }

        new GCMDeviceControl(context).setPushImage(msgTag, mode, new GCMDeviceControl.DeviceControlListner() {

            @Override
            public void deviceControlListner(Object object) {
                PendingIntent contentIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
                NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

                //must be used api 26 above
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    NotificationChannel mChannel = new NotificationChannel(getString(R.string.notification_channel_id), getString(R.string.notification_channel_id), NotificationManager.IMPORTANCE_HIGH);
                    mChannel.setDescription(getString(R.string.notification_channel_desc));
                    mNotificationManager.createNotificationChannel(mChannel);
                }

                NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(context, getString(R.string.notification_channel_id))
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(title)
                        .setContentText(message)
                        .setAutoCancel(true)
                        .setVibrate(new long[] { 0, 500 });

                if(object != null && object instanceof Bitmap){
                    Bitmap bitmap = (Bitmap) object;
                    mBuilder.setStyle(new NotificationCompat.BigPictureStyle().bigPicture(bitmap).setSummaryText(message));
                    mBuilder.setContentIntent(contentIntent);
                    mBuilder.setPriority(NotificationCompat.PRIORITY_MAX);
                } else {
                    mBuilder.setStyle(new NotificationCompat.BigTextStyle().bigText(message));
                    mBuilder.setContentIntent(contentIntent);
                }

                mNotificationManager.notify((int)System.currentTimeMillis(), mBuilder.build());
            }
        });*/
    }

    /**
     * 띵동 팝업 발생
     */
    private void setNotiPopup() {
        try {
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            // finger push check
            intent.putExtra("message_number", msgTag);
            intent.putExtra("message_mode", mode);
            intent.putExtra("message_labelcode", labelCode);
            // finger push check

            intent.putExtra("notification_title", title);
            intent.putExtra("notification_msg", message);
            intent.putExtra("notification_link", webLink);

            if(!TextUtils.isEmpty(imageURL) && (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH)){
                intent.putExtra("notification_imgurl", imageURL);
            }

            PendingIntent contentIntent = PendingIntent.getActivity(getApplicationContext(), 0, intent, PendingIntent.FLAG_ONE_SHOT);
            contentIntent.send();
        } catch (PendingIntent.CanceledException e) {
        }
    }
}
