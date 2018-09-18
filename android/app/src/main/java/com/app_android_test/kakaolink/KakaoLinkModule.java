package com.app_android_test.kakaolink;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kakao.kakaolink.v2.KakaoLinkResponse;
import com.kakao.kakaolink.v2.KakaoLinkService;
import com.kakao.message.template.ButtonObject;
import com.kakao.message.template.ContentObject;
import com.kakao.message.template.FeedTemplate;
import com.kakao.message.template.LinkObject;
import com.kakao.network.ErrorResult;
import com.kakao.network.callback.ResponseCallback;

public class KakaoLinkModule extends ReactContextBaseJavaModule {

    public KakaoLinkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "KakaoLinkModule";
    }

    @ReactMethod
    public void KakaoTalkShareLink(final Callback cb) {
        try {
            String shareImageUrl = "";
            try {
                shareImageUrl = "";
            } catch (Exception e){
                shareImageUrl = "";
            }

            FeedTemplate params = FeedTemplate
                    .newBuilder(ContentObject.newBuilder("테스트"+ " " + "1234556897654",
                            shareImageUrl.isEmpty()? "" : shareImageUrl,
                            LinkObject.newBuilder()
                                    .setAndroidExecutionParams("").setIosExecutionParams("").build())
                            .setDescrption("테스트다 얼씨구나")
                            .build())
                    .addButton(new ButtonObject("테스트 톡이야", LinkObject.newBuilder()
                            .setAndroidExecutionParams("")
                            .setIosExecutionParams("")
                            .build()))
                    .build();

            KakaoLinkService.getInstance().sendDefault(getReactApplicationContext(), params, new ResponseCallback<KakaoLinkResponse>() {
                @Override
                public void onFailure(ErrorResult errorResult) {
                    getReactApplicationContext().startActivity(KakaoLinkService.getInstance().getKakaoTalkInstallIntent(getReactApplicationContext()));
                }

                @Override
                public void onSuccess(KakaoLinkResponse result) {
                }
            });
            cb.invoke(true, null);
        } catch (Exception e) {
            cb.invoke(false, e.getMessage());
        }
    }
}
