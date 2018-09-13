package com.app_android_test.utils;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AppCheckModule extends ReactContextBaseJavaModule {
    public AppCheckModule(ReactApplicationContext reactContext) {
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

    @ReactMethod
    final public void gotoMarketDialog(final String newVersion, final String url, final Promise promise){
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());

        try {
            String currentVersion = getCurrentActivity().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0).versionName;
            StringBuilder sb = new StringBuilder();
            sb.append("현재 버전이 ");
            sb.append(currentVersion);
            sb.append("입니다.\n");
            sb.append("신규 버전은 ");
            sb.append(newVersion);
            sb.append("입니다.\n");
            sb.append("업데이트를 위해 마켓으로 이동 하시겠습니까?");

            builder.setMessage(sb.toString());
            builder.setNegativeButton("아니요", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    if(promise != null) {
                        promise.resolve(true);
                    }
                }
            });
            builder.setPositiveButton("업데이트", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    if(promise != null) {
                        promise.resolve(false);
                    }
                    gotoMarket(url);
                }
            });

            AlertDialog dialog = builder.create();

            dialog.setCancelable(false);
            dialog.setCanceledOnTouchOutside(false);
            dialog.show();
        } catch (PackageManager.NameNotFoundException e) {
            if(promise != null) {
                promise.reject("0", e.getMessage());
            }
        }
    }

    @ReactMethod
    final public void gotoMarket(final String url){
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url));
        getCurrentActivity().startActivity(intent);
    }
}
