package com.app_android_test;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by dondeath on 2018-08-07.
 */

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration){
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}
