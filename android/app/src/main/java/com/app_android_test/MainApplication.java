package com.app_android_test;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.app_android_test.fingerpush.FingerPushPackage;
import com.app_android_test.kakaolink.KakaoLinkPackage;
import com.dooboolab.kakaologins.GlobalApplication;
import com.facebook.react.ReactApplication;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends GlobalApplication implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNKakaoLoginsPackage(),
                    new CodePush("i8fSpvyA39nFOUhLDLMlvh4G69vkryY2eeY8m", getApplicationContext(), BuildConfig.DEBUG),
                    new MapsPackage(),
                    new CustomToastPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAnalyticsPackage(), 
                    new RNFirebaseMessagingPackage(),
                    new RNFirebaseNotificationsPackage(),
                    new FingerPushPackage(),
                    new KakaoLinkPackage()
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
    }
}
