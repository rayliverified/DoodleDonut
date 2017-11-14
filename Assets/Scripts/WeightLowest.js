#pragma strict
import UnityEngine.UI;

function Start () {
	//Gets lowest weight and displays text
	gameObject.GetComponent.<Text>().text = "Lowest Weight: " + PlayerPrefs.GetFloat("lowestWeight") + " lbs";
}
