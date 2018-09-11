package com.app_android_test.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.LocationManager;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GpsCheckModule extends ReactContextBaseJavaModule {
    private final String TAG = "GpsCheckModule";

    public GpsCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    final public String getName() {
        return "GPSCheck";
    }

    /**
     * GPS on/off 체크
     * @param showDialog off일때 설정창 이동 팝업 생성
     * @param promise return call back
     */
    @ReactMethod
    final public void enableGps(final boolean showDialog, final Promise promise){
        try {
            boolean isGpsON = false;
            try {
                LocationManager locationManager = (LocationManager) getCurrentActivity().getSystemService(Context.LOCATION_SERVICE);

                isGpsON = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            } catch (Exception e) {
                Log.e(TAG, "enableGps() " + e.getMessage());
                isGpsON = false;
            }

            if (showDialog && !isGpsON) {
                showDialog();
            }

            promise.resolve(isGpsON);
        }catch (Exception e){
            promise.reject("0", e.getMessage());
        }
    }

    /**
     * GSP 설정 화면 이동 알림창
     */
    private void showDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());

        builder.setMessage("GPS가 꺼져있습니다.\nGPS를 설정 하시겠습니까?");
        builder.setNegativeButton("아니요", null);
        builder.setPositiveButton("설정", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Intent gpsOptionsIntent = new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                getCurrentActivity().startActivity(gpsOptionsIntent);
            }
        });
        builder.create().show();
    }
}
