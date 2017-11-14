﻿using UnityEngine;
using System.Collections;
using System;

public class LocalNotificationPlugin : MonoBehaviour{
	
	private static LocalNotificationPlugin instance;
	private static GameObject container;
	private static AUPHolder aupHolder;
	private const string TAG="[LocalNotificationPlugin]: ";
	
	#if UNITY_ANDROID
	private static AndroidJavaObject jo;
	#endif	
	
	public bool isDebug =true;
	
	public static LocalNotificationPlugin GetInstance(){
		if(instance==null){
			container = new GameObject();
			container.name="LocalNotificationPlugin";
			instance = container.AddComponent( typeof(LocalNotificationPlugin) ) as LocalNotificationPlugin;
			DontDestroyOnLoad(instance.gameObject);
			aupHolder = AUPHolder.GetInstance();
			instance.gameObject.transform.SetParent(aupHolder.gameObject.transform);
		}
		
		return instance;
	}
	
	private void Awake(){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo = new AndroidJavaObject("com.gigadrillgames.androidplugin.notification.NotificationPlugin");
		}
		#endif
	}
	
	/// <summary>
	/// Sets the debug.
	/// 0 - false, 1 - true
	/// </summary>
	/// <param name="debug">Debug.</param>
	public void SetDebug(int debug){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("SetDebug",debug);
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}
	
	//note: local notification will not show if the application is currently running
	
	/// <summary>
	/// Schedules the notification.
	/// </summary>
	/// <param name="notificationTitle">Notification title.</param>
	/// <param name="notificationMessage">Notification message.</param>
	/// <param name="notificationTickerMessage">Notification ticker message.</param>
	/// <param name="delay">Delay.</param>
	/// <param name="enableVibrate">If set to <c>true</c> enable vibrate.</param>
	/// <param name="enableSound">If set to <c>true</c> enable sound.</param>
	public void ScheduleNotification(string notificationTitle,string notificationMessage,string notificationTickerMessage, int delay,bool enableVibrate,bool enableSound ){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("scheduleNotification",notificationTitle,notificationMessage,notificationTickerMessage,delay,enableVibrate,enableSound);
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}
	
	public void ShowScheduleSimpleNotification(string notificationTitle,string notificationMessage,string notificationTickerMessage,bool enableVibrate,bool enableSound){		
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("showSimpleNotification",notificationTitle,notificationMessage,notificationTickerMessage,enableVibrate,enableSound);
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}

	/// <summary>
	/// Cancel Local notification that is already fired
	/// </summary>
	public void CancelNotification(){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("cancelNotification");
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}


	/// <summary>
	/// Cancel previous schedule Local Notification
	/// </summary>
	public void CancelPrevScheduledNotification(){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("cancelPrevScheduledNotification");
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}

	/// <summary>
	/// Clears all scheduled notification before it fires
	/// </summary>
	public void ClearAllScheduledNotification(){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			jo.CallStatic("clearAllScheduledNotification");
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
	}
	
	/// <summary>
	/// Determines whether this instance is open using notification.
	/// </summary>
	/// <returns><c>true</c> if this instance is open using notification; otherwise, <c>false</c>.</returns>
	public int IsOpenUsingNotification(){
		#if UNITY_ANDROID
		if(Application.platform == RuntimePlatform.Android){
			return jo.CallStatic<int>("isOpenUsingNotification");
		}else{
			AUP.Utils.Message(TAG,"warning: must run in actual android device");
		}
		#endif
		
		return 0;
	}
}