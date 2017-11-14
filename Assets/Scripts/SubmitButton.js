#pragma strict
import UnityEngine.UI;

public var nameInput:Text;

function SubmitName ()
{
	if (nameInput.text != "")
	{
		PlayerPrefs.SetString("playerName", nameInput.text);
	}
	else
	{
	}
}
