using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;

[@RequireComponent(typeof(Text))]
public class WeightScore : MonoBehaviour
{
	public void LoadWeight ()
	{
		string name = PlayerPrefs.GetString ("playerName");
		string score = PlayerPrefs.GetInt ("highscore").ToString ();
		string lowestweight = PlayerPrefs.GetFloat ("lowestWeight").ToString ();
		string donutsate = PlayerPrefs.GetInt ("donutsAte").ToString ();
		string caloriesate = PlayerPrefs.GetInt ("caloriesAte").ToString ();
		string caloriesburned = PlayerPrefs.GetInt ("caloriesBurned").ToString ();
		string gamesplayed = PlayerPrefs.GetInt ("gamesPlayed").ToString ();
		string coffeesdrank = PlayerPrefs.GetInt ("coffeesDrank").ToString ();
		WeightSaver.postScore (name, score, lowestweight, donutsate, caloriesate, caloriesburned, gamesplayed, coffeesdrank, this);
	}
	public void OnWeightLoaded (List<WeightSaver.Weight> weight)
	{
		Debug.Log ("Updating weight!");
		string text = "";
		int i = 1;
		foreach (WeightSaver.Weight wt in weight) {
			text += i + ". " + wt.name + "\t" + wt.weight + " lbs" + "\n";
			i++;
		}
		GetComponent<Text> ().text = text;
	}
	public void OnHighscorePosted ()
	{
		Debug.Log ("Post successful, updating scores!");
		WeightSaver.loadWeight (this);
	}
}
