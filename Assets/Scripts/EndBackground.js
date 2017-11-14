#pragma strict

public var highscoreText:GameObject;
public var totalscoreText:GameObject;
public var caloriesgainedText:GameObject;
public var caloriesburnedText:GameObject;
public var totalweightText:GameObject;
public var weightnetText:GameObject;
public var addedweightText:GameObject;
public var challengeCompleted:GameObject;
public var audioClip:AudioClip;

private var highscoreArray:int[];
private var challengeArray:int[];
private var highscore:int;
private var weightTotal:float;
private var lowestWeight:float;
private var donutsAte:int;
private var caloriesAte:int;
private var caloriesBurned:int;
private var gamesPlayed:int;
private var coffeesDrank:int;
private var added:boolean;

function Start () 
{
	added = false;
	highscoreArray = PlayerPrefsX.GetIntArray("highscores");
	challengeArray = PlayerPrefsX.GetIntArray("challenges");
	weightTotal = PlayerPrefs.GetFloat("weightTotal");
	lowestWeight = PlayerPrefs.GetFloat("lowestWeight");
	donutsAte = PlayerPrefs.GetInt("donutsAte");
	caloriesAte = PlayerPrefs.GetInt("caloriesAte");
	caloriesBurned = PlayerPrefs.GetInt("caloriesBurned");
	gamesPlayed = PlayerPrefs.GetInt("gamesPlayed");
	coffeesDrank = PlayerPrefs.GetInt("coffeesDrank");

}

function Update () 
{
	if (CameraTrack.goToEndScreen == true && added == false)
	{
		HighScore();
		TotalScore();
		CaloriesGained();
		CaloriesBurned();
		TotalWeight();
		WeightNet();
		AddWeight();
		StartCoroutine(ChallengeCheck());
		StartCoroutine(PlayMusic());
		added = true;
		PlayerPrefs.SetInt("cheated", 0); //Resets cheating variable to 0
		AnalyticsCode();
	}
}

function PlayMusic ()
{
	yield WaitForSeconds(3.0f);
	SoundManager.PlayImmediately(audioClip, true, null);
}

function ChallengeCheck ()
{
	yield WaitForSeconds(2.0f);
	//Games played check
	if (gamesPlayed >= 10 && challengeArray[12] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(12);
	}
	if (gamesPlayed >= 20 && challengeArray[13] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(13);
	}
	if (gamesPlayed >= 30 && challengeArray[14] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(14);
	}
	if (gamesPlayed >= 50 && challengeArray[15] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(15);
	}
	if (gamesPlayed >= 75 && challengeArray[16] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(16);
	}
	if (gamesPlayed >= 100 && challengeArray[17] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(17);
	}
	if (gamesPlayed >= 150 && challengeArray[18] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(18);
	}
	if (gamesPlayed >= 200 && challengeArray[19] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(19);
	}
	if (gamesPlayed >= 300 && challengeArray[20] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(20);
	}
	//Coffees drinks check
	if (coffeesDrank >= 1 && challengeArray[21] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(21);
	}
	if (coffeesDrank >= 5 && challengeArray[22] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(22);
	}
	if (coffeesDrank >= 10 && challengeArray[23] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(23);
	}
	if (coffeesDrank >= 20 && challengeArray[24] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(24);
	}
	if (coffeesDrank >= 30 && challengeArray[25] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(25);
	}
	if (coffeesDrank >= 40 && challengeArray[26] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(26);
	}
	if (coffeesDrank >= 55 && challengeArray[27] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(27);
	}
	if (coffeesDrank >= 75 && challengeArray[28] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(28);
	}
	if (coffeesDrank >= 100 && challengeArray[29] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(29);
	}
	//Weight check
	var weightLost:float = 120 - lowestWeight; //Calculate weight lost
	if (weightLost >= 1 && challengeArray[0] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(0);
	}
	if (weightLost >= 3 && challengeArray[1] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(1);
	}
	if (weightLost >= 6 && challengeArray[2] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(2);
	}
	if (weightLost >= 10 && challengeArray[3] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(3);;
	}
	if (weightLost >= 15 && challengeArray[4] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(4);;
	}
	if (weightLost >= 21 && challengeArray[5] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(5);;
	}
	if (weightLost >= 28 && challengeArray[6] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(6);;
	}
	if (weightLost >= 36 && challengeArray[7] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(7);;
	}
	if (weightLost >= 45 && challengeArray[8] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(8);;
	}
	if (weightLost >= 55 && challengeArray[9] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(9);;
	}
	if (weightLost >= 66 && challengeArray[10] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(10);;
	}
	if (weightLost >= 78 && challengeArray[11] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(11);;
	}
	//Ads wrapper
	if (PlayerPrefs.GetInt("ads") == 0)
	{
		var adsDisplay = PlayerPrefs.GetInt("adsDisplay");
		//Limits ad display to 1 out of 4
		if (adsDisplay == 4)
		{
			PlayerPrefs.SetInt("adsDisplay", 0);
			Appodeal.show(Appodeal.INTERSTITIAL);
		}
		else
		{
			PlayerPrefs.SetInt("adsDisplay", adsDisplay + 1);
		}
	}
}

function HighScore ()
{
	var highscoreLength = highscoreArray.Length;
	var current = UIManager.currentScore;
	for (var i = 0; i < highscoreLength; i++)
	{
		var t = i;
		while (t < 10)
		{
			if (current > highscoreArray[t])
			{
				var holder = highscoreArray[t];
				highscoreArray[t] = current;
				current = holder;
				t++;
			}
			else break;
		}
	}
	PlayerPrefsX.SetIntArray("highscores", highscoreArray);
	highscore = highscoreArray[0];
	PlayerPrefs.SetInt("highscore", highscoreArray[0]);
	highscoreText.GetComponent.<Text>().text = "Highscore: " + highscoreArray[0];
}

function TotalScore ()
{
	totalscoreText.GetComponent.<Text>().text = "Score: " + UIManager.currentScore;
	gamesPlayed = gamesPlayed + 1;
	PlayerPrefs.SetInt("gamesPlayed", gamesPlayed);
}

function CaloriesGained () 
{
	caloriesgainedText.GetComponent.<Text>().text = "+ " + PlayerMove.addedCalories + "\nCalories\nAte";
}

function CaloriesBurned () 
{
	caloriesburnedText.GetComponent.<Text>().text = "- " + PlayerMove.caloriesBurned + "\nCalories\nBurned";
}

function TotalWeight () 
{
	//Get total weight and lowest weights from Player Prefs
	//Calculate new weight by adding weight from WeightGained.js
	weightTotal = weightTotal + PlayerMove.addedWeight;
	weightTotal = Mathf.Round(weightTotal*100)/100; //Rounds to 2 decimal places
	//If new weight is new low, save as lowestWeight
	if (weightTotal < lowestWeight)
	{
		PlayerPrefs.SetFloat("lowestWeight", weightTotal);
		lowestWeight = weightTotal; //saves lowestWeight variable
	}
	PlayerPrefs.SetFloat("weightTotal", weightTotal);
	totalweightText.GetComponent.<Text>().text = "Your Weight: " + weightTotal + "lbs"; //Display text
}

function WeightNet () 
{
	if (PlayerMove.addedWeight < 0)
	{
		weightnetText.GetComponent.<Text>().text = "You Burned";
		weightnetText.GetComponent.<Text>().color = new Color32(0,191,17,255);
		//Sound
		SoundManager.PlaySFX(SoundManager.LoadFromGroup("Win"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
	else
	{
		weightnetText.GetComponent.<Text>().text = "You Gained";
		weightnetText.GetComponent.<Text>().color = new Color32(218,16,95,255);
		//Sound
		SoundManager.PlaySFX(SoundManager.LoadFromGroup("Lose"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
}

function AddWeight () {
	//Save gameplay stats
	PlayerPrefs.SetInt("donutsAte", donutsAte + PlayerMove.playerSizeCount-1);
	PlayerPrefs.SetInt("caloriesAte", caloriesAte + PlayerMove.addedCalories);
	PlayerPrefs.SetInt("caloriesBurned", caloriesBurned + PlayerMove.caloriesBurned);
	//Display weight gained or lost
	if (PlayerMove.addedWeight < 0)
	{
		addedweightText.GetComponent.<Text>().color = new Color32(0,191,17,255);
	}
	else
	{
		addedweightText.GetComponent.<Text>().color = new Color32(218,16,95,255);
	}
	addedweightText.GetComponent.<Text>().text = PlayerMove.addedWeight + " POUNDS!";
}

function AnalyticsCode ()
{
//	GameAnalytics.NewDesignEvent("End:weightTotal", weightTotal);
//	GameAnalytics.NewDesignEvent("End:lowestWeight", lowestWeight);
//	GameAnalytics.NewDesignEvent("End:donutsAte", donutsAte);
//	GameAnalytics.NewDesignEvent("End:caloriesAte", caloriesAte);
//	GameAnalytics.NewDesignEvent("End:caloriesBurned", caloriesBurned);
//	GameAnalytics.NewDesignEvent("End:gamesPlayed", gamesPlayed);
//	GameAnalytics.NewDesignEvent("End:coffeesDrank", coffeesDrank);

//Unity Analytics
//	var params = new System.Collections.Generic.Dictionary.<System.String, System.Object>();
//	params.Add("weightTotal", weightTotal);
//	params.Add("lowestWeight", lowestWeight);
//	params.Add("donutsAte", donutsAte);
//	params.Add("caloriesAte", caloriesAte);
//	params.Add("caloriesBurned", caloriesBurned);
//	params.Add("gamesPlayed", gamesPlayed);
//	params.Add("coffeesDrank", coffeesDrank);
//	Analytics.Analytics.CustomEvent("PlayerStats", params);
}