package com.app_android_test;

import android.support.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;

public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback{
    private PermissionListener listener; // <- add this attribute
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "app_android_test";
    }

    //react-native-image-picker
    @Override
    public void setPermissionListener(@NonNull PermissionListener listener) {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
    //react-native-image-picker
}
