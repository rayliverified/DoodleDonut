#pragma strict

public var highscoresArray:int[];
public var challengeArray:int[];
public var highscore:int;
public var weightTotal:float;
public var lowestWeight:float;
public var donutsAte:int;
public var caloriesAte:int;
public var caloriesBurned:int;
public var gamesPlayed:int;
public var coffeesDrank:int;

function Start () 
{
	highscoresArray = new int[10];
	challengeArray = new int[100];
}

function SetVariables ()
{
	for (var i=0; i <= 50; i++)
	{
		challengeArray[i] = 0;
	}
	PlayerPrefsX.SetIntArray("challenges", challengeArray);

	PlayerPrefs.SetInt("highscore", highscore);
	PlayerPrefs.SetFloat("weightTotal", weightTotal);
	PlayerPrefs.SetFloat("lowestWeight", lowestWeight);
	PlayerPrefs.SetInt("donutsAte", donutsAte);
	PlayerPrefs.SetInt("caloriesAte", caloriesAte);
	PlayerPrefs.SetInt("caloriesBurned", caloriesBurned);
	PlayerPrefs.SetInt("gamesPlayed", gamesPlayed);
	PlayerPrefs.SetInt("coffeesDrank", coffeesDrank);
	PlayerPrefs.SetInt("adsWatched", 1);
	
	highscoresArray[0] = 0;
	highscoresArray[1] = 0;
	highscoresArray[2] = 0;
	highscoresArray[3] = 0;
	highscoresArray[4] = 0;
	highscoresArray[5] = 0;
	highscoresArray[6] = 0;
	highscoresArray[7] = 0;
	highscoresArray[8] = 0;
	highscoresArray[9] = 0;
	PlayerPrefsX.SetIntArray("highscores", highscoresArray);
}