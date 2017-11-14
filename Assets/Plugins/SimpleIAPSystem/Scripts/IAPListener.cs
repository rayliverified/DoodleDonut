/*  This file is part of the "Simple IAP System" project by Rebound Games.
 *  You are only allowed to use these resources if you've bought them from the Unity Asset Store.
 * 	You shall not license, sublicense, sell, resell, transfer, assign, distribute or
 * 	otherwise make available to any third party the Service or the Content. */

using UnityEngine;
using UnityEngine.Purchasing;

namespace SIS
{
	/// <summary>
	/// script that listens to purchases and other IAP events,
	/// here we tell our game what to do when these events happen
	/// <summary>
	public class IAPListener : MonoBehaviour
	{
		public GameObject Uianimator;
		//subscribe to the most important IAP events
		public void Init ()
		{
			IAPManager.inventoryRequestFailedEvent += HandleFailedInventory;
			IAPManager.purchaseSucceededEvent += HandleSuccessfulPurchase;
			IAPManager.purchaseFailedEvent += HandleFailedPurchase;
			ShopManager.itemSelectedEvent += HandleSelectedItem;
			ShopManager.itemDeselectedEvent += HandleDeselectedItem;
		}


		/// <summary>
		/// handle purchases, for real money or ingame currency
		/// </summary>
		public void HandleSuccessfulPurchase (string id)
		{
			//differ between ids set in the IAP Settings editor
			if (IAPManager.isDebug)
				Debug.Log ("HandleSuccessfulPurchase: " + id);
			IAPObject obj = IAPManager.GetIAPObject (id);

			//get instantiated shop item based on the IAP id
			IAPItem item = null;
			if (ShopManager.GetInstance ())
				item = ShopManager.GetIAPItem (id);

			//if the purchased item was non-consumable,
			//additionally block further purchase of the shop item
			if (item != null && obj != null && obj.type != ProductType.Consumable)
				item.Purchased (true);
				
			if (Uianimator == null)
				Uianimator = GameObject.Find ("UIAnimator");

			switch (id) {
			//section for in app purchases
			case "short":
				DBManager.IncreaseFunds ("coffees", 10);
				PlayerPrefs.SetFloat ("weightTotal", PlayerPrefs.GetFloat ("weightTotal") - 5);
				PlayerPrefs.SetInt ("ads", 1);
				Uianimator.SendMessage ("MoveInCoffeePurchased", 1);
				//Sound
				SoundManager.PlaySFX ("SFX_Unlock Success Mix Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
				break;
			case "tall":
				DBManager.IncreaseFunds ("coffees", 25);
				PlayerPrefs.SetFloat ("weightTotal", PlayerPrefs.GetFloat ("weightTotal") - 10);
				PlayerPrefs.SetInt ("ads", 1);
				Uianimator.SendMessage ("MoveInCoffeePurchased", 2);
				//Sound
				SoundManager.PlaySFX ("SFX_Unlock Success Mix Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
				break;
			case "grande":
				DBManager.IncreaseFunds ("coffees", 120);
				PlayerPrefs.SetFloat ("weightTotal", PlayerPrefs.GetFloat ("weightTotal") - 30);
				PlayerPrefs.SetInt ("ads", 1);
				Uianimator.SendMessage ("MoveInCoffeePurchased", 3);
				//Sound
				SoundManager.PlaySFX ("SFX_Unlock Success Mix Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);				
				break;

			//section for in game content
			case "free":
				DBManager.IncreaseFunds ("coffees", 1);
				//Sound
				SoundManager.PlaySFX ("SFX_Pour Liquid Into Coffee Mug", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
				break;
			case "adsreward":
				DBManager.IncreaseFunds ("coffees", 1);
				Uianimator.SendMessage ("MoveInCoffeePurchased", 4);
				//Sound
				SoundManager.PlaySFX (SoundManager.LoadFromGroup ("Achievement"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);				
				break;
			case "share":
				DBManager.IncreaseFunds ("coffees", 2);
				//Sound
				SoundManager.PlaySFX ("SFX_Success Smooth Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
				break;
			}
		}

		//just shows a message via our ShopManager component,
		//but checks for an instance of it first
		void ShowMessage (string text)
		{
			if (ShopManager.GetInstance ())
				ShopManager.ShowMessage (text);
		}

		//called when an purchaseFailedEvent happens, here we forward
		//the error message to ShopManager's error window (if present)
		void HandleFailedInventory (string error)
		{
			if (ShopManager.GetInstance ())
				ShopManager.ShowMessage (error);
		}

		//called when an purchaseFailedEvent happens,
		//we do the same here
		void HandleFailedPurchase (string error)
		{
			if (ShopManager.GetInstance ())
				ShopManager.ShowMessage (error);
		}


		//called when a purchased shop item gets selected
		void HandleSelectedItem (string id)
		{
			if (IAPManager.isDebug)
				Debug.Log ("Selected: " + id);
		}


		//called when a selected shop item gets deselected
		void HandleDeselectedItem (string id)
		{
			if (IAPManager.isDebug)
				Debug.Log ("Deselected: " + id);
		}
	}
}