using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using MiniJSON;
///<summary>
///Tool to save and load highscores using an external PHP server.
///Copyright by Gernot Raudner
///Developed for Radiated Pixel (http://www.radiatedpixel.com)
///</summary>

public static class WeightSaver
{
	//SET THESE 4 TO YOUR SERVER STATS
	private const string SECRET_KEY = "asdfghjkl1"; // Edit this value and make sure it's the same as the one stored on the server
	private const string ADD_SCORE_URL = "http://doodledonut.com/savehighscores.php?"; //be sure to add a ? to your url
	private const string GET_WEIGHT_URL = "http://doodledonut.com/getweight.php?";
	private const string SQL_SCORE_TABLE = "highscores";
	
	public struct Weight
	{
		public Weight (string name, string lowestweight)
		{
			this.name = name;
			this.weight = lowestweight;
		}
		public string name;
		public string weight;
	}
	private static string GetMd5Hash (MD5 md5Hash, string input)
	{
		byte[] data = md5Hash.ComputeHash (Encoding.UTF8.GetBytes (input));
		StringBuilder sBuilder = new StringBuilder ();
		for (int i = 0; i < data.Length; i++) {
			sBuilder.Append (data [i].ToString ("x2"));
		}
		return sBuilder.ToString ();
	}
	
	public static void postScore (string name, string score, string lowestweight, string donutsate, 
	                              string caloriesate, string caloriesburned, string gamesplayed, string coffeesdrank, MonoBehaviour script)
	{
		script.StartCoroutine (serverPostRequest (name, score, lowestweight, donutsate, caloriesate, caloriesburned, 
		                                          gamesplayed, coffeesdrank, script));
	}
	private static IEnumerator serverPostRequest (string name, string score, string lowestweight, string donutsate, 
	                                              string caloriesate, string caloriesburned, string gamesplayed, string coffeesdrank, MonoBehaviour script)
	{
		//This connects to a server side php script that will add the name and score to a MySQL DB.
		// Supply it with a string representing the players name and the players score.
		string hash = GetMd5Hash (MD5.Create (), (name + score + lowestweight + donutsate + caloriesate + caloriesburned + gamesplayed + coffeesdrank + SECRET_KEY));
		string highscore_url = ADD_SCORE_URL + "name=" + WWW.EscapeURL (name) + "&score=" + score + 
			"&lowestweight=" + lowestweight + "&donutsate=" + donutsate + "&caloriesate=" + caloriesate + "&caloriesburned=" + caloriesburned + 
			"&gamesplayed=" + gamesplayed + "&coffeesdrank=" + coffeesdrank + "&hash=" + hash + "&table=" + SQL_SCORE_TABLE;
		Debug.Log (highscore_url);
		// Post the URL to the site and create a download object to get the result.
		WWW hs_post = new WWW (highscore_url);
		yield return hs_post; // Wait until the download is done
		if (hs_post.error != null) {
			Debug.Log ("There was an error posting the high score: " + hs_post.error + " | ");
		}
		if (hs_post.isDone) {
			script.SendMessage ("OnHighscorePosted");
		}
	}
	
	private static IEnumerator serverGetWeight (MonoBehaviour script)
	{
		List<Weight> wtlist = new List<Weight> ();
		Debug.Log ("starting request");
		WWW wt_get = new WWW (GET_WEIGHT_URL + "table=" + SQL_SCORE_TABLE);
		float timeelapsed = 0;
		while (!wt_get.isDone) {
			timeelapsed += Time.deltaTime;
			if (timeelapsed > 10)
				break;
			else
				yield return wt_get;
		}
		if (wt_get.error != null) {
			Debug.Log ("There was an error getting the weight: " + wt_get.error);
		}
		if (wt_get.isDone) {
			IDictionary w = (IDictionary)Json.Deserialize (wt_get.text);
			Debug.Log (wt_get.text + " - wtext");
			Debug.Log ("Size: " + w.Count);
			foreach (IDictionary user in w.Values) {
				Debug.Log ("Adding data: " + (string)user ["name"] + " " + (string)user ["lowestweight"]);
				wtlist.Add (new Weight ((string)user ["name"], (string)user ["lowestweight"]));
			}
			
			script.SendMessage ("OnWeightLoaded", wtlist);
		}
	}
	/// <summary>
	/// Calls Highscores from a given PHP-Page in JSon-Format { userid: { name: xxx, score: xxx} }.
	/// Uses callback <see cref="OnHighscoreLoaded(List<HighscoreSaver.Highscore)>"/> to refresh list when finished. 
	/// <returns>List of Highscore-Structs which are updated on <see cref="OnHighscoreLoaded"/>.</returns>
	/// <param name="script">The script that wants to get the scores.</param>
	/// </summary>
	public static void loadWeight (MonoBehaviour script)
	{
		script.StartCoroutine (serverGetWeight (script));
	}
}
