#pragma strict

public var soundOn:GameObject;
public var soundOff:GameObject;

function Start ()
{
	if (PlayerPrefs.GetInt("sound") == 1)
	{
		SoundOff();
	}
}

function SoundOn () 
{
	gameObject.SetActive(false);
	soundOn.gameObject.SetActive(true);
	PlayerPrefs.SetInt("sound", 0);
	//Sound
	SoundManager.Mute(false);
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function SoundOff ()
{
	gameObject.SetActive(false);
	soundOff.gameObject.SetActive(true);
	PlayerPrefs.SetInt("sound", 1);
	//Sound
	SoundManager.Mute(true);
}
