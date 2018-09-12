package com.app_android_test.utils;

import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppCheck extends ReactContextBaseJavaModule {
    public AppCheck(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    final public String getName() {
        return "AppCheck";
    }

    @ReactMethod
    final public void getCurrentVersionName(final Promise promise){
        String version = null;
        try {
            version = getCurrentActivity().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            if(promise != null){
                promise.reject("0", e.getMessage());
            }
            return;
        }

        if(promise != null){
            promise.resolve(version);
        }
    }

    @ReactMethod
    final public void getCurrentVersionCode(final Promise promise){
        int code = 0;
        try {
            code = getCurrentActivity().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0).versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            if(promise != null){
                promise.reject("0", e.getMessage());
            }
            return;
        }

        if(promise != null){
            promise.resolve(code);
        }
    }

    @ReactMethod
    final public void getPackageName(final Promise promise){
        if(promise != null) {
            promise.resolve(getReactApplicationContext().getPackageName());
        }
    }
}
