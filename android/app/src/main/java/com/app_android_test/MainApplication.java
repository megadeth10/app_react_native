package com.app_android_test;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.app_android_test.fingerpush.FingerPushPackage;
import com.app_android_test.kakaolink.KakaoLinkPackage;
import com.app_android_test.utils.UtilPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {
    //facebook sdk
    private static CallbackManager mCallbackManager = new CallbackManager.Factory().create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
    //facebook sdk

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {


        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new ReactNativeConfigPackage(),
                    new RNLanguagesPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new ImageResizerPackage(),
                    new ImagePickerPackage(),
                    new RNKakaoLoginsPackage(),
                    new MapsPackage(),
                    new CustomToastPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(),
                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new FingerPushPackage(),
                    new KakaoLinkPackage(),
                    new UtilPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        FacebookSdk.setApplicationId("238185046864527");
        FacebookSdk.sdkInitialize(getApplicationContext());
    }
}
