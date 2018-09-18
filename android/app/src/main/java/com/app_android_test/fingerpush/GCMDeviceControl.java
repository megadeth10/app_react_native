package com.app_android_test.fingerpush;

import android.content.Context;
import android.graphics.Bitmap;
import android.text.TextUtils;

import com.app_android_test.utils.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.fingerpush.android.FingerPushManager;
import com.fingerpush.android.NetworkUtility;
import com.fingerpush.android.dataset.DeviceInfo;
import com.fingerpush.android.dataset.TagList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class GCMDeviceControl extends ReactContextBaseJavaModule{
	public static final String TAG = GCMDeviceControl.class.getSimpleName();

	public static final String PUSH_KEY = "PUSH_";
	public static final String PUSH_ON = "PUSH_ON";
	public static final String PUSH_OFF = "PUSH_OFF";
	public static final String PUSH_NULL = "PUSH_NULL";
	public static final String ADDR_KEY = "주소_";
	public static final String AGE_KEY = "연령층_";
	public static final String AGE_NULL_KEY = "연령층_NULL";
	public static final String AGE_14_KEY = "연령층_14세_이하";
	public static final String AGE_19_KEY = "연령층 15세_19세";
	public static final String AGE_24_KEY = "연령층_20세_24세";
	public static final String AGE_29_KEY = "연령층_25세_29세";
	public static final String AGE_34_KEY = "연령층_30세_34세";
	public static final String AGE_39_KEY = "연령층_35세_39세";
	public static final String AGE_44_KEY = "연령층_40세_44세";
	public static final String AGE_49_KEY = "연령층_45세_49세";
	public static final String AGE_59_KEY = "연령층_50세_59세";
	public static final String AGE_60_KEY = "연령층_60세_이상";
	public static final String SEX_KEY = "성별_";
	public static final String SEX_NULL_KEY = "성별_NULL";
	public static final String SEX_MAN_KEY = "성별_남성";
	public static final String SEX_WOMAN_KEY = "성별_여성";

	private Context mContext;
	private FingerPushManager mFingerPushManager;

	private boolean isDelError = false;  // 태그 삭제 실패시 재시도

	private final String TOTAL ="total";
	
	public interface DeviceControlListner{
		void deviceControlListner(Object object);
	}
	
	public GCMDeviceControl(ReactApplicationContext context){
		super(context);
		mContext = context;
		mFingerPushManager = FingerPushManager.getInstance(mContext);
	}

	@Override
	public String getName() {
		return "FingerPushController";
	}

	
	/********************************************************************************************************************************************
	 * 
	 * 핑거푸시 제공 (made in fingerpush)
	 * 
	 ********************************************************************************************************************************************/
	/**
	 * 핑거푸시 서버에 기기 토큰 값을 저장한다.
	 */
	@ReactMethod
	public void setDevice(){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.setDevice(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setDevice - onComplete == code : "+code+", message : "+message);

				if(code.equals("200") || code.equals("201")) {  // 디바이트 최초 등록시 코드
					Log.i(TAG, "setDevice - Result OK");
				}

				setPushAlive(true);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setDevice - onError == code : "+code+", message : "+message);

				if(code.equals("504")) {  // 이미 등록된 디바이스 코드
					Log.i(TAG, "setDevice - Result NO");

					setPushAlive(true);
				}
			}
		});
	}
	
	 /** 푸시 메시지 번호와 모드를 변수로 사용하여 핑거푸시를 통해 전송된 푸시 메시지를 읽음 처리한다.
	 * @param message_id 푸시 메시지 번호
	 * @param mode 푸시 메시지 모드
	 * @param labelCode 푸시 메시지 라벨 코드
	 */
	public void checkPush(String message_id, String mode, String labelCode){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.checkPush(message_id, mode, labelCode, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "checkPush - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "checkPush - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 전체 태그 목록을 조회한다.
	 */
	public void getAllTag(){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.getAllTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "getAllTag - onComplete == code : "+code+", message : "+message);

				try {
					JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
					for (int i = 0; i < ArrayData.length(); i++) {
						Log.i(TAG, "getAllTag - tag : "+ArrayData.getJSONObject(i).optString("tag"));
					}
				} catch(JSONException e) {
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getAllTag - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 핑거푸시에 등록된 앱의 모든 정보를 조회한다.
	 */
	public void getAppReport(){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.getAppReport(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "getAppReport - onComplete == code : "+code+", message : "+message);
//				String AppKey = ObjectData.optString("appid");							// 앱 아이디
//				String AppName = ObjectData.optString("app_name");						// 앱 이름
//				String User_Id = ObjectData.optString("user_id");						// 앱 등록자 아이디
//				String Icon = ObjectData.optString("icon");								// 앱 아이콘
//				String Category = ObjectData.optString("category");						// 앱 카테고리명
//				String Environments = ObjectData.optString("environments");				// 앱 구동 환경
//				String BeAndroid = ObjectData.optString("beandroid");					// ANDROID 기기 지원여부(Y/N)
//				String Version = ObjectData.optString("android_version");				// ANDROID 버전
//				String AndroidUpdateLink = ObjectData.optString("android_upd_link");	// ANDROID 업데이트 링크
//				String BeUpdateLink = ObjectData.optString("beupdalert_a");				// 안드로이드 강제 업데이트 여부(Y/N)
//				String UpdateDate = ObjectData.optString("ver_update_date_a");			// 버전 업데이트 일
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getAppReport - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 핑거푸시 메시지 수신 시, 첨부된 이미지를 가져온다.
	 * (getPushContent()에서 'NetworkObjectContentListener()' 리스너를 사용하여 콜백된 JsonObject를 변수에 넣어야한다.)
	 */
	public void getAttatchedImageURL(JSONObject jsonObject, final DeviceControlListner listner){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.getAttatchedImageURL(jsonObject, new NetworkUtility.NetworkBitmapListener() {
			@Override
			public void onComplete(String code, String message, Bitmap bitmap) {
				Log.i(TAG, "getAttatchedImageURL - onComplete == code : "+code+", message : "+message);

				if(listner != null) {
					listner.deviceControlListner(bitmap);
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getAttatchedImageURL - onError == code : "+code+", message : "+message);

				if(listner != null){
					listner.deviceControlListner(null);
				}
			}
		});
	}
	
	/**
	 * 핑거푸시 서버에 등록된 키 값, 디바이스 타입, 수신 여부, 식별자 값을 조회한다.
	 */
	public void getDeviceInfo(){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.getDeviceInfo(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "getDeviceInfo - onComplete == code : "+code+", message : "+message);

				String appkey = data.optString(DeviceInfo.APPKEY);			// 앱 아이디
				String device_type = data.optString(DeviceInfo.DEVICE_TYPE);	// 디바이스 타입(I : IOS, A : ANDROID)
				String activity = data.optString(DeviceInfo.ACTIVITY);		// 푸시 수신 활성화 상태(A : 활성화, D : 비활성화)
				String identity = data.optString(DeviceInfo.IDENTITY);		// 식별자(Server To Server 에서 사용)
				String ad_activity = data.optString(DeviceInfo.AD_ACTIVITY);		// 광고 푸시 수신 활성화 상태(A : 활성화, D : 비활성화)
				String timezone = data.optString(DeviceInfo.TIMEZONE);		// 타임존
				String country = data.optString(DeviceInfo.COUNTRY);			// 국가명
				String vercode = data.optString(DeviceInfo.VERCODE);			// 앱 버전 코드
				String vername = data.optString(DeviceInfo.VERNAME);			// 앱 버전 명
				String osver = data.optString(DeviceInfo.OSVER);			// 디바이스 OS 버전 코드
				Log.i(TAG, "getDeviceInfo - " +
						"\nappkey : "+appkey +
						"\ndevice_type : "+device_type +
						"\nactivity : "+activity +
						"\nidentity : "+identity +
						"\nad_activity : "+ad_activity +
						"\ntimezone : "+timezone +
						"\ncountry : "+country +
						"\nvercode : "+vercode +
						"\nvername : "+vername +
						"\nosver : "+osver);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getDeviceInfo - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 디바이스에 등록된 태그 값을 조회한다.
	 */
	public void getDeviceTag(final DeviceControlListner listner){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getDeviceTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "getDeviceTag - onComplete == code : " + code + ", message : " + message);
				ArrayList<TagList> dataList = new ArrayList<>();
				int total = 0;

				try {
					total = data.getInt(TOTAL);
				} catch (Exception e) {
					Log.e(TAG, "onComplete() ", e);
					total = 0;
				}

				try {
					JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
					TagList list = new TagList();
					for (int i = 0; i < total; i++) {
						list.date = ArrayData.getJSONObject(i).optString("date");    // 등록일
						list.tag = ArrayData.getJSONObject(i).optString("tag");        // 태그명
						Log.i(TAG, "getDeviceTag - tag : " + list.tag);

						dataList.add(list);
					}
				} catch (Exception e) {
					Log.e(TAG, "getDeviceTag JSONException == code : " + code + ", message : " + message, e);
				} finally {
					if (listner != null) {
						listner.deviceControlListner(dataList);
					}
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getDeviceTag - onError == code : "+code+", message : "+message);

				if(listner != null){
					listner.deviceControlListner(null);
				}
			}
		});
	}
	
	/**
	 * 푸시 메시지 번호와 모드를 변수로 사용하여 핑거푸시를 통해 수신된 메시지 내용을 조회한다.
	 * String tag : 푸시 메시지 번호 
	 * String mode : 푸시 메시지 모드
	 */
	public void getPushContent(String tag, String mode){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.getPushContent(tag, mode, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "getPushContent - onComplete == code : "+code+", message : "+message);
//				String Tag = object.optString("msgTag");		// 메세지 고유 태그
//				String Date = object.optString("date");			// 메세지 보낸 날짜
//				String Title = object.optString("title");		// 메세지 제목
//				String Content = object.optString("content");	// 메세지 내용
//				String Type = object.optString("type");
//				String imgUrl = object.optString("imgUrl");		// 보낸 이미지 url
//				String Link = object.optString("link");			// 링크
//				String Mode = object.optString("mode");			// 메세지 모드(DEFT : 일반 서버, LNGT : 롱 푸시, STOS : 타겟 푸시)
//				String Custom1 = object.optString("k1"); 		// 커스텀 데이터1 (푸시 발송 시 입력한 additional key)
//				String Custom2 = object.optString("k2"); 		// 커스텀 데이터2 (푸시 발송 시 입력한 additional key)
//				String Custom3 = object.optString("k3"); 		// 커스텀 데이터3 (푸시 발송 시 입력한 additional key)
//				String LNGT = object.optString("lngt_message");	// 롱 텍스트 메세지
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "getPushContent - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 식별자 값으로 Application 개발자가 임의 지정하여 사용한다. 예) 유저 아이디, 이메일 등
	 */
	@ReactMethod
	public void setIdentity(String identity){
		if(mFingerPushManager == null || TextUtils.isEmpty(identity)){
			return;
		}
		
		mFingerPushManager.setIdentity(identity, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setIdentity - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setIdentity - onError == code : "+code+", message : "+message);
			}
		});
	}
 	
	/**
	 * 핑거푸시 서버에 등록된 식별자 값을 삭제한다.
	 */
	public void removeIdentity(){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.removeIdentity(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "removeIdentity - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "removeIdentity - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 핑거푸시 서버에 태그를 등록한다.
	 * String tag : 태그값(Kissoft, FingerPush)와 같이 콤마로 구분하여 입력 
	 */
	public void setTag(final String tag){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.setTag(tag, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setTag - onComplete == Tag : "+tag+", code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setTag - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 디바이스에 등록된 태그를 삭제한다.
	 * String tag : 태그 값(kissoft, fingerpush)와 같이 콤마로 구분하여 입력
	 */
	public void removeTag(String tag){
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.removeTag(tag, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "removeTag - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "removeTag - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 디바이스에 등록된 태그를 전체 삭제한다. 
	 * 메소드를 찾지 못함
	 */
	private void removeAllTag() {
		if(mFingerPushManager == null){
			return;
		}
		
		mFingerPushManager.removeAllTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "removeAllTag - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "removeAllTag - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 푸시 활성화 여부 (true : 활성화, false : 비활성화)
	 * boolean isPush : 푸시 사용 유/무
	 */
	@ReactMethod
	public void setPushAlive(boolean isPush){
		if(mFingerPushManager == null){
			return;
		}
		
//		String isPushOn = DDSettings.get(DDSettings.is_push_on, Boolean.TRUE.toString());
//		isPush = isPushOn.equals(Boolean.TRUE.toString()) ? true : false;
		
		mFingerPushManager.setPushAlive(isPush, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushAlive - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushAlive - onError == code : "+code+", message : "+message);
			}
		});
	}

	/**
	 * 광고 푸시 활성화 여부 (true : 활성화, false : 비활성화)
	 * boolean isPush : 푸시 사용 유/무
	 */
	public void setAdvertisePushEnable(boolean isPush){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.setAdvertisePushEnable(isPush, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setAdvertisePushEnable - onComplete == code : "+code+", message : "+message);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setAdvertisePushEnable - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/********************************************************************************************************************************************
	 * 
	 * 핑거푸시 미 제공 (made in ddingdong)
	 * 
	 ********************************************************************************************************************************************/
	/**
	 * 핑거푸시 ON/OFF 상태를 태그값으로 지정한다.
	 * @param state 등록될 상태
	 */
	public void setPushState(final String state){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getDeviceTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushState - onComplete == code : "+code+", message : "+message);
				boolean isExist = false;  // push 상태 태그 유/무
				int total = 0;

				try {
					total = data.getInt(TOTAL);
				} catch (Exception e) {
					Log.e(TAG, "onComplete() ", e);
					total = 0;
				}

				if(total > 0) {
					try {
						JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
						String tag = null;  // 현재 상태

						for (int i = 0; i < ArrayData.length(); i++) {
							tag = ArrayData.getJSONObject(i).optString("tag");

							if (tag.contains(PUSH_KEY)) {  // 현재 tag 중 push 상태가 있는지
								Log.i(TAG, "setPushState - removeTag : " + tag + ", afterState : " + state);
								isExist = true;
								break;
							}
						}

						if (tag != null && tag.equals(state)) {  // 현재 상태와 변경될 상태가 같으면 종료
							return;
						} else if (isExist) {  // 현재 tag 중 push 상태가 있으면
							getDeleteState(state, tag);
						} else {
							setTag(state);
						}
					} catch (Exception e) {  // data 가 null 이면 현재 정보가 없는 것으로 판단
						Log.e(TAG, "setPushState - Exception == code : " + code + ", message : " + message, e);
						setTag(state);
					}
				} else {
					setTag(state);
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushState - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 고객의 지역을 수정한다. (기존 고객의 경우 여러 지역 정보를 가지고 있기 때문에 삭제가 될때마다 지역을 등록해야 한다.)
	 * @param place 등록될 지역
	 */
	public void setPushPlace(final String place){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getDeviceTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushPlace - onComplete == code : "+code+", message : "+message);
				int total = 0;

				try {
					total = data.getInt(TOTAL);
				} catch (Exception e) {
					Log.e(TAG, "onComplete() ", e);
					total = 0;
				}

				if(total > 0) {
					try {
						JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
						String tag = null;  // 현재 상태

						for (int i = 0; i < ArrayData.length(); i++) {
							tag = ArrayData.getJSONObject(i).optString("tag");

							if (tag.contains(ADDR_KEY)) {  // 현재 tag 중 push 지역이 있는지
								Log.i(TAG, "PushPlaceNow - removeTag : " + tag + ", afterPlace : " + place);
								removeTag(tag);
							}
						}

						setTag(place);
					} catch (Exception e) {  // data 가 null 이면 현재 정보가 없는 것으로 판단
						Log.e(TAG, "setPushPlace - Exception == code : " + code + ", message : " + message, e);
						setTag(place);
					}
				} else {
					setTag(place);
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushPlace - onError == code : "+code+", message : "+message);
			}
		});
	}

	/**
	 * 고객의 연령대를 등록한다. (기존의 연령대를 삭제하고 재등록)
	 * @param age 등록될 지역
	 */
	public void setPushAge(final String age){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getDeviceTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushAge - onComplete == code : "+code+", message : "+message);
				int total = 0;

				try {
					total = data.getInt(TOTAL);
				} catch (Exception e) {
					Log.e(TAG, "onComplete() ", e);
					total = 0;
				}

				if(total > 0) {
					try {
						JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
						String tag = null;  // 현재 상태

						for (int i = 0; i < ArrayData.length(); i++) {
							tag = ArrayData.getJSONObject(i).optString("tag");

							if (tag.contains(AGE_KEY)) {  // 현재 tag 중 push 연령대가 있는지
								Log.i(TAG, "PushAgeNow - removeTag : " + tag + ", afterAge : " + age);
								removeTag(tag);
							}
						}

						setTag(age);
					} catch (Exception e) {  // data 가 null 이면 현재 정보가 없는 것으로 판단
						Log.e(TAG, "setPushAge - onError == code : " + code + ", message : " + message, e);
						setTag(age);
					}
				} else {
					setTag(age);
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushAge - onError == code : "+code+", message : "+message);
			}
		});
	}

	/**
	 * 고객의 성별을 등록한다. (기존의 성별을 삭제하고 재등록)
	 * @param sex 등록될 지역
	 */
	public void setPushSex(final String sex){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getDeviceTag(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushSex - onComplete == code : "+code+", message : "+message);
				int total = 0;

				try {
					total = data.getInt(TOTAL);
				} catch (Exception e) {
					Log.e(TAG, "onComplete() ", e);
					total = 0;
				}

				if(total > 0) {
					try {
						JSONArray ArrayData = data.getJSONArray(TagList.TAGLIST);
						String tag = null;  // 현재 상태

						for (int i = 0; i < ArrayData.length(); i++) {
							tag = ArrayData.getJSONObject(i).optString("tag");
							if (tag.contains(SEX_KEY)) {  // 현재 tag 중 push 연령대가 있는지
								Log.i(TAG, "PushSexNow - removeTag : " + tag + ", afterSex : " + sex);
								removeTag(tag);
							}
						}

						setTag(sex);
					} catch (Exception e) {  // data 가 null 이면 현재 정보가 없는 것으로 판단
						Log.e(TAG, "setPushSex - Exception == code : " + code + ", message : " + message, e);
						setTag(sex);
					}
				} else {
					setTag(sex);
				}
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushSex - onError == code : " + code + ", message : " + message);
			}
		});
	}

	/**
	 * 푸시 수신시 이미지 첨부 유무를 확인한다.
	 * @param tag 푸시태그
	 * @param mode 푸드모드
	 * @param listner 비트맵 리스너
	 */
	public void setPushImage(String tag, String mode, final DeviceControlListner listner){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.getPushContent(tag, mode, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "setPushImage(getPushContent) - onComplete == code : "+code+", message : "+message);

				mFingerPushManager.getAttatchedImageURL(data, new NetworkUtility.NetworkBitmapListener() {
					@Override
					public void onComplete(String code, String message, Bitmap bitmap) {
						Log.i(TAG, "setPushImage(getAttatchedImageURL) - onComplete == code : "+code+", message : "+message);

						if(listner != null) {
							listner.deviceControlListner(bitmap);
						}
					}

					@Override
					public void onError(String code, String message) {
						Log.i(TAG, "setPushImage(getAttatchedImageURL) - onError == code : "+code+", message : "+message);

						if(listner != null){
							listner.deviceControlListner(null);
						}
					}
				});
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "setPushImage(getPushContent) - onError == code : "+code+", message : "+message);
			}
		});
	}
	
	/**
	 * 푸시tag 변경시 현 상태 삭제 후 등록
	 * @param afterTag  변경 되어야 할 태그
	 * @param brforeTag 현재 등록되어 있는 태그
	 */
	public void getDeleteState(final String afterTag, final String brforeTag){
		if(mFingerPushManager == null){
			return;
		}

		mFingerPushManager.removeTag(brforeTag, new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "removeTag - onComplete == code : "+code+", message : "+message);

				setTag(afterTag);  // 삭제가 완료되면 변경된 푸시 상태를 등록한다.
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "removeTag - onError == code : "+code+", message : "+message);

				isDelError = !isDelError;  // 첫 실패시 true 로 변경 두번째 실패시 false 로 변경되어 한번만 재시도함
				if(isDelError) {
					getDeleteState(afterTag, brforeTag);  // 삭제가 실패하면 다시 시도한다.
				}
			}
		});
	}

	/**
	 * 푸시 식별자를 변경한다. (removeIdentity -> setIdentity)
	 * setIdentity만 실행해도 변경이 가능 하나 삭제 로직을 추가한 방호 코드
	 */
	@ReactMethod
	public void replaceIdentity(String identity){
		if(mFingerPushManager == null || TextUtils.isEmpty(identity)){
			return;
		}
		final String id = identity;
		mFingerPushManager.removeIdentity(new NetworkUtility.ObjectListener() {
			@Override
			public void onComplete(String code, String message, JSONObject data) {
				Log.i(TAG, "ReplaceIdentity(removeIdentity) - onComplete == code : "+code+", message : "+message);

				setIdentity(id);
			}

			@Override
			public void onError(String code, String message) {
				Log.i(TAG, "ReplaceIdentity(removeIdentity) - onError == code : "+code+", message : "+message);

				setIdentity(id);
			}
		});
	}
}