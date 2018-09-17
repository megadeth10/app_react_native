package com.app_android_test.utils;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class CacheFileCheckModule extends ReactContextBaseJavaModule {
    public CacheFileCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CacheFileCheck";
    }


}
