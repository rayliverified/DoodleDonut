#pragma strict
import SIS;

public var uianimator:GameObject;
public var player:GameObject;
private var coffeesDrank:int;

function Drink ()
{
	if (DBManager.GetFunds("coffees") >= 1) //Drink count check
	{
		coffeesDrank = PlayerPrefs.GetInt("coffeesDrank");
		DBManager.IncreaseFunds("coffees", -1); //Decrease coffee count
		coffeesDrank = coffeesDrank + 1;
		PlayerPrefs.SetInt("coffeesDrank", coffeesDrank);
		//Analytics
//		GameAnalytics.NewDesignEvent("Save:drank", 1);
		//Execute code here to reset level
		PlayerPrefs.SetInt("restart", 1);
		Application.LoadLevel("TummyYummy");
	}
	else //Popup store if no coffee exists
	{
		uianimator.GetComponent(UIAnimator).MoveInCoffeeMenu();
		//Analytics
//		GameAnalytics.NewDesignEvent("Save:noneLeft", 1);
	}
}

function ActivateEndSequence ()
{
	player = GameObject.FindGameObjectWithTag("Player");
	player.GetComponent.<PlayerMove>().EndSequence();
	//Analytics
//	GameAnalytics.NewDesignEvent("Save:endGame", 1);
}