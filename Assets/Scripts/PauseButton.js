#pragma strict

public var uianimator:GameObject;
private var pauseInitiate:boolean;

function PauseInitiate ()
{
	uianimator.GetComponent(UIAnimator).MoveInPauseMenu();
	pauseInitiate = true;
}

function PauseDestroy ()
{
	uianimator.GetComponent(UIAnimator).MoveOutPauseMenu();
	pauseInitiate = false;
}

function PauseGame ()
{
	Time.timeScale = 0;
	PlayerMove.alive = false;
}

function PlayGame ()
{
	Time.timeScale = 1;
	PlayerMove.alive = true;
}
//Pauses game if phone call or other interuption
function OnApplicationPause(pauseStatus:boolean)
{
	if(pauseStatus == true && PlayerMove.dead == false)
	{
		PauseInitiate();
		PauseGame();
	}
}
#if UNITY_ANDROID
function Update ()
{
	if (Input.GetKeyDown(KeyCode.Escape) && PlayerMove.dead == false)
	{
		if (pauseInitiate == true)
		{
			//Ads wrapper
			if (PlayerPrefs.GetInt("ads") == 0)
			{
		  		Appodeal.show(Appodeal.INTERSTITIAL);
			}
			Application.LoadLevel("DoodleDonutIntro");
		}
		else if (pauseInitiate == false)
		{
			PauseInitiate();
			PauseGame();
		}
	}
	else if (Input.GetKeyDown(KeyCode.Escape) && PlayerMove.ended == true)
	{
		//Ads wrapper
		if (PlayerPrefs.GetInt("ads") == 0)
		{
	  		Appodeal.show(Appodeal.INTERSTITIAL);
		}
		Application.LoadLevel("DoodleDonutIntro");
	}
}
#endif