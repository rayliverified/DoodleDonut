#pragma strict

function GoToHome ()
{
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Whoop", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	//Ads wrapper
	if (PlayerPrefs.GetInt("ads") == 0)
	{
  		Appodeal.show(Appodeal.INTERSTITIAL);
	}
	Application.LoadLevel("DoodleDonutIntro");
}