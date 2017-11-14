#pragma strict
import UnityEngine.UI;

function LoadStats () {
	//Updates stats and lowest weight if Player has made a purchase
	var weightTotal:float = PlayerPrefs.GetFloat("weightTotal");
	var lowestWeight:float = PlayerPrefs.GetFloat("lowestWeight");
	if (weightTotal < lowestWeight)
	{
		PlayerPrefs.SetFloat("lowestWeight", weightTotal);
		lowestWeight = weightTotal;
	}
	
	gameObject.GetComponent.<Text>().text = "Weight:\t\t" + weightTotal + " lbs\n"
	+ "Lowest Weight:\t" + lowestWeight + " lbs\n"
	+ "Donuts Ingested:\t" + PlayerPrefs.GetInt("donutsAte") + "\n"
	+ "Calories Ate:\t" + PlayerPrefs.GetInt("caloriesAte") + "\n"
	+ "Calories Burned:\t" + PlayerPrefs.GetInt("caloriesBurned") + "\n"
	+ "Games Played:\t" + PlayerPrefs.GetInt("gamesPlayed") + "\n"
	+ "Coffees Slurped:\t" + PlayerPrefs.GetInt("coffeesDrank");
}
