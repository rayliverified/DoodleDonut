using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

[@RequireComponent (typeof(Text))]
public class HighScoreTest : MonoBehaviour
{
	public void LoadScores ()
	{
		StartCoroutine (LoadScoreStart ());
		GetComponent<Text> ().text = "Loading Highscores...";
//		HighscoreSaver.loadScores (this);
	}

	public void OnHighscoreLoaded (List<HighscoreSaver.Highscore> highscores)
	{
		Debug.Log ("Updating highscores!");
		string text = "";
		int i = 1;
		foreach (HighscoreSaver.Highscore hs in highscores) {
			text += i + ". " + hs.name + "\t" + hs.score + "\n";
			i++;
		}
		GetComponent<Text> ().text = text;
	}

	IEnumerator LoadScoreStart ()
	{
		yield return new WaitForSeconds (2f);
		HighscoreSaver.loadScores (this);
	}
}
