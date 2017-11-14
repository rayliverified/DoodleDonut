#pragma strict
import SIS;
import System;

public var buy0:GameObject;
public var twitterShare:GameObject;
public var facebookShare:GameObject;
public var nativeShare:GameObject;
public var freeCoffeeButton:GameObject;
public var coffeeAmount:GameObject;
public var coffeeAddedText:GameObject;
public var check1:GameObject;
public var check2:GameObject;
public var check3:GameObject;
public var watchAds:GameObject;

//private var videoWatched:boolean;
private var freeCoffeeArray:int[];
private var sharePlugin:SharePlugin;
private var twitterShared:int;
private var facebookShared:int;
private var nativeShared:int;
private var adsWatched:int;
private var currentAdsWatched:int;

function Start ()
{
	//Sets free coffee button to active if new day has passed
	var currentDay = DateTime.Now.get_Day();
	var currentMonth = DateTime.Now.get_Month();
	var currentYear = DateTime.Now.get_Year();
	if (currentDay > PlayerPrefs.GetInt("lastDay"))
	{
		//Activate button
		buy0.GetComponent.<Button>().interactable = true;
		PlayerPrefs.SetInt("twitterShared", 0);
		PlayerPrefs.SetInt("facebookShared", 0);
		PlayerPrefs.SetInt("nativeShared", 0);
	}
	else
	{
		if (currentMonth > PlayerPrefs.GetInt("lastMonth"))
		{
			buy0.GetComponent.<Button>().interactable = true;
			PlayerPrefs.SetInt("twitterShared", 0);
			PlayerPrefs.SetInt("facebookShared", 0);
			PlayerPrefs.SetInt("nativeShared", 0);
		}
		else
		{
			if (currentYear > PlayerPrefs.GetInt("lastYear"))
			{
				buy0.GetComponent.<Button>().interactable = true;
				PlayerPrefs.SetInt("twitterShared", 0);
				PlayerPrefs.SetInt("facebookShared", 0);
				PlayerPrefs.SetInt("nativeShared", 0);
			}
			else
			{
				buy0.SetActive(false); //Disables button
				freeCoffeeButton.SetActive(true); //Enables button to free coffee menu				
			}
		}
	}
	if (PlayerPrefs.GetInt("twitterShared") == 0)
	{
		twitterShare.GetComponent.<Button>().interactable = true;
	}
	if (PlayerPrefs.GetInt("facebookShared") == 0)
	{
		facebookShare.GetComponent.<Button>().interactable = true;
	}
	if (PlayerPrefs.GetInt("nativeShared") == 0)
	{
		nativeShare.GetComponent.<Button>().interactable = true;
	}	
//	videoWatched = false;
}
function FreeCoffee ()
{
	//Set checkmarks next to free coffee completion status
	freeCoffeeArray = PlayerPrefsX.GetIntArray("freecoffee");
	if (freeCoffeeArray[0] == 1 && (twitterShare.GetComponent.<Button>().interactable == false || facebookShare.GetComponent.<Button>().interactable == false || nativeShare.GetComponent.<Button>().interactable == false))
	{
		check1.SetActive(true);
	}
	if (freeCoffeeArray[1] == 1)
	{
		check2.SetActive(true);
	}
	if (freeCoffeeArray[2] == 1)
	{
		check3.SetActive(true);
	}
	//Sets number of ads to watch to get free coffee text
	adsWatched = PlayerPrefs.GetInt("adsWatched");
	watchAds.GetComponent.<Text>().text = "#2. View " + adsWatched + " sponsors while we make you coffee! (unlimited)";
}
function TwitterShare ()
{
	twitterShare.GetComponent.<Button>().interactable = false;
	PlayerPrefs.SetInt("twitterShared", 1);
	if (freeCoffeeArray[0] == 0)
	{
		freeCoffeeArray[0] = 1;
		PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray);
	}
	Application.OpenURL("http://doodledonut.com/gptwitter");
//	Application.OpenURL("http://twitter.com/intent/tweet?text=" + 
//	WWW.EscapeURL("I'm having a lot of fun playing Doodle Donut! Help me beat donuts here --> doodledonut.com") +
//    "&amp;lang=" + WWW.EscapeURL("en"));
    IAPManager.PurchaseProduct("share");
}
function FacebookShare ()
{
	facebookShare.GetComponent.<Button>().interactable = false;
	PlayerPrefs.SetInt("facebookShared", 1);
	if (freeCoffeeArray[0] == 0)
	{
		freeCoffeeArray[0] = 1;
		PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray);
	}
	Application.OpenURL("http://doodledonut.com/gpfacebook");
//	Application.OpenURL("https://www.facebook.com/sharer/sharer.php?u=" + 
//	WWW.EscapeURL("doodledonut.com") +
//    "&t=" + WWW.EscapeURL("Beat Donuts! Play Doodle Donut Today!"));
    IAPManager.PurchaseProduct("share");
}
function NativeShare ()
{
	nativeShare.GetComponent.<Button>().interactable = false;
	PlayerPrefs.SetInt("nativeShared", 1);
	if (freeCoffeeArray[0] == 0)
	{
		freeCoffeeArray[0] = 1;
		PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray);
	}
	sharePlugin = SharePlugin.GetInstance();
	sharePlugin.SetDebug(0);
	sharePlugin.ShareUrl("Doodle Donut","I'm having a lot of fun playing Doodle Donut! Help me beat donuts here --> doodledonut.com","http://doodledonut.com"); //Android specific
	IAPManager.PurchaseProduct("share");
}
function LeaveReview ()
{
	//Review activation code
	Application.OpenURL("market://details?id=com.doodledonut"); //Android specific
	if (freeCoffeeArray[2] == 0)
	{
		freeCoffeeArray[2] = 1;
		PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray);
	}
}
//Display reward video
function PlayVideo ()
{
//	if (videoWatched == false)
//	{
//		Appodeal.show(Appodeal.REWARDED_VIDEO);
//		if (Appodeal.isLoaded(Appodeal.REWARDED_VIDEO) == true)
//		{
//			videoWatched = true;
//			StartCoroutine(DeliverReward());
//		}
//	}
//	Appodeal.show(Appodeal.INTERSTITIAL);
//	currentAdsWatched = currentAdsWatched + 1;
//	if (currentAdsWatched >= adsWatched)
//	{
//		IAPManager.PurchaseProduct("adsreward");
//		adsWatched = adsWatched + 1;
//		PlayerPrefs.SetInt("adsWatched", adsWatched);
//		currentAdsWatched = 0;
//	}
//	watchAds.GetComponent.<Text>().text = "#2. View " + (adsWatched - currentAdsWatched)+ " sponsors while we make you coffee! (unlimited)";
//	if (freeCoffeeArray[1] == 0)
//	{
//		freeCoffeeArray[1] = 1;
//		PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray);
//	}
}
//Delivers reward on delay
//function DeliverReward ()
//{
//	yield WaitForSeconds(0.1f);
//	IAPManager.PurchaseProduct("adsreward");
//	videoWatched = false;
//}
//1 free coffee powerup once per day
function BuyRefill ()
{
	IAPManager.PurchaseProduct("free");
	//Records current date
	PlayerPrefs.SetInt("lastDay", DateTime.Now.get_Day());
	PlayerPrefs.SetInt("lastMonth", DateTime.Now.get_Month());
	PlayerPrefs.SetInt("lastYear", DateTime.Now.get_Year());
	buy0.SetActive(false); //Disables button
	freeCoffeeButton.SetActive(true); //Enables button to free coffee menu
	UpdateCoffee();
}

//Purchase short coffee
function BuyShort ()
{
	IAPManager.PurchaseProduct("short");
}

//Purchase tall coffee
function BuyTall ()
{
	IAPManager.PurchaseProduct("tall");
}

//Purchase grande coffee
function BuyGrande ()
{
	IAPManager.PurchaseProduct("grande");
}

//Update coffee amount
function UpdateCoffee ()
{
	coffeeAmount.GetComponent.<Text>().text = "X" + DBManager.GetFunds("coffees");
}

//Sets coffee added text using id from UIAnimator
function UpdateText (id:int)
{
	switch(id)
	{
		case 1:
			coffeeAddedText.GetComponent.<Text>().text = "+10";
			break;
		case 2:
			coffeeAddedText.GetComponent.<Text>().text = "+25";
			break;
		case 3:
			coffeeAddedText.GetComponent.<Text>().text = "+120";
			break;
		case 4:
			coffeeAddedText.GetComponent.<Text>().text = "+1";
			break;
	}
}