#pragma strict
import UnityEngine.UI;

private var localText:String;
private var playerName:String; 

function LoadLocalScores ()
{
	var highscoresArray = PlayerPrefsX.GetIntArray("highscores"); //Gets local highscore array 
	var i:int = 0; //Sets i variable for while loop
	playerName = PlayerPrefs.GetString("playerName"); //Gets player's name
	localText = ""; //Overwrites text to blank on each refresh
	//Populates localText with highscores
	while (i < highscoresArray.length)
	{
		//Detects if highscoreArray contains highscores
		if (highscoresArray[i] > 0) 
		{
			localText += i + 1 + ". " + playerName + "\t\t" + highscoresArray[i] + "\n";
			i++;
		}
		//Exits while loop when highscores loaded
		else
		{
			i = highscoresArray.length;
		}
	}
	//Checks for highscore existence
	if (localText == "")
	{
		localText = "No highscores yet!"; //Sets placeholder text
	}
	gameObject.GetComponent.<Text>().text = localText; //Sets highscores text
}