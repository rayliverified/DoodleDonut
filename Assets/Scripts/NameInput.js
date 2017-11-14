#pragma strict
import UnityEngine.UI;

function Start () {
	if (PlayerPrefs.HasKey("playerName") == false)
	{
	}
	else
	{
		gameObject.GetComponent.<Text>().text = PlayerPrefs.GetString("playerName");
	}
}

function UpdateName ()
{
	gameObject.GetComponent.<Text>().text = PlayerPrefs.GetString("playerName");
}