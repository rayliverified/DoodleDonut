#pragma strict

function Start ()
{
  	//Check if Startup Variables have been set
	if (PlayerPrefs.HasKey("startedOnce") == false)
	{
		StartupVariables();
		PlayerPrefs.SetInt("startedOnce", 1);
	}
	//Ads wrapper
//	if (PlayerPrefs.GetInt("ads") == 0) //Display ads or not
//	{
//		Appodeal.initialize(appKey, Appodeal.BANNER | Appodeal.INTERSTITIAL);
//  		Appodeal.show(Appodeal.BANNER_BOTTOM);
//	}
//	else
//	{
//		Appodeal.initialize(appKey, Appodeal.INTERSTITIAL | Appodeal.REWARDED_VIDEO); //Activates video ads even for paying users
//	}
	//Cheating detector
	if (PlayerPrefs.GetInt("cheated") == 1)
	{
		//Initiate cheating penalty
		PlayerPrefs.SetFloat("weightTotal", (PlayerPrefs.GetFloat("weightTotal") + 1));
	}
}

function StartupVariables ()
{
	var highscoresArray:int[] = new int[10];
	for (var i = 0; i < 10; i++)
	{
		 highscoresArray[i] = 0;
	}
	PlayerPrefsX.SetIntArray("highscores", highscoresArray);
	var challengeArray:int[] = new int[100];
	for (var j = 0; j < 100; j++)
	{
		 challengeArray[j] = 0;
	}
	PlayerPrefsX.SetIntArray("challenges", challengeArray); //Tracks achievements completion
	var freeCoffeeArray:int[] = new int[10];
	for (var h = 0; h < 10; h++)
	{
		 freeCoffeeArray[h] = 0;
	}
	PlayerPrefsX.SetIntArray("freecoffee", freeCoffeeArray); //Tracks free coffee rewards task completion
	PlayerPrefs.SetInt("highscore", 0);
	PlayerPrefs.SetFloat("weightTotal", 120);
	PlayerPrefs.SetFloat("lowestWeight", 120);
	PlayerPrefs.SetInt("donutsAte", 0);
	PlayerPrefs.SetInt("caloriesAte", 0);
	PlayerPrefs.SetInt("caloriesBurned", 0);
	PlayerPrefs.SetInt("gamesPlayed", 0);
	PlayerPrefs.SetInt("coffeesDrank", 0);
	PlayerPrefs.SetInt("ads", 0); //Defaults ads to on. IAP to set to off
	PlayerPrefs.SetInt("adsDisplay", 0); //Show ads counter
	PlayerPrefs.SetInt("sound", 0); //Defaults sound to on
	PlayerPrefs.SetInt("adsWatched", 1); //Defaults ads to watch to obtain free coffee to 1
	PlayerPrefs.SetInt("cheated", 0);
}