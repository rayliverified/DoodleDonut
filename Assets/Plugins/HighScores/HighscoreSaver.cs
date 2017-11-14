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

public static class HighscoreSaver
{
	//SET THESE 4 TO YOUR SERVER STATS
	private const string SECRET_KEY = "asdfghjkl1"; // Edit this value and make sure it's the same as the one stored on the server
	private const string ADD_SCORE_URL = "http://doodledonut.com/savehighscores.php?"; //be sure to add a ? to your url
	private const string GET_SCORE_URL = "http://doodledonut.com/gethighscores.php?";
	private const string SQL_SCORE_TABLE = "highscores";

	public struct Highscore
	{
		public Highscore (string name, string score)
		{
			this.name = name;
			this.score = score;
		}
		public string name;
		public string score;
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

	private static IEnumerator serverGetHighscores (MonoBehaviour script)
	{
		List<Highscore> hslist = new List<Highscore> ();
		Debug.Log ("starting request");
		WWW hs_get = new WWW (GET_SCORE_URL + "table=" + SQL_SCORE_TABLE);
		float timeelapsed = 0;
		while (!hs_get.isDone) {
			timeelapsed += Time.deltaTime;
			if (timeelapsed > 10)
				break;
			else
				yield return hs_get;
		}
		if (hs_get.error != null) {
			Debug.Log ("There was an error getting the high score: " + hs_get.error);
		}
		if (hs_get.isDone) {
			IDictionary o = (IDictionary)Json.Deserialize (hs_get.text);
			Debug.Log (hs_get.text + " - wtext");
			Debug.Log ("Size: " + o.Count);
			foreach (IDictionary user in o.Values) {
				Debug.Log ("Adding data: " + (string)user ["name"] + " " + (string)user ["score"]);
				hslist.Add (new Highscore ((string)user ["name"], (string)user ["score"]));
			}
			script.SendMessage ("OnHighscoreLoaded", hslist);
		}
	}
	/// <summary>
	/// Calls Highscores from a given PHP-Page in JSon-Format { userid: { name: xxx, score: xxx} }.
	/// Uses callback <see cref="OnHighscoreLoaded(List<HighscoreSaver.Highscore)>"/> to refresh list when finished. 
	/// <returns>List of Highscore-Structs which are updated on <see cref="OnHighscoreLoaded"/>.</returns>
	/// <param name="script">The script that wants to get the scores.</param>
	/// </summary>
	public static void loadScores (MonoBehaviour script)
	{
		script.StartCoroutine (serverGetHighscores (script));
	}
}