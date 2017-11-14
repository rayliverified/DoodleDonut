#pragma strict
import UnityEngine.UI;

function Start () {
	if (PlayerPrefs.HasKey("playerName") == false)
	{
		gameObject.GetComponent.<InputField>().GetComponentInChildren.<Text>().text = "Donuteer";
		PlayerPrefs.SetString("playerName", "Donuteer");
	}
	else
	{
		gameObject.GetComponent.<InputField>().GetComponentInChildren.<Text>().text = PlayerPrefs.GetString("playerName");
	}
}

function NameCheck ()
{
	
}

function UpdateName ()
{
	gameObject.GetComponent.<InputField>().GetComponentInChildren.<Text>().text = PlayerPrefs.GetString("playerName");
}