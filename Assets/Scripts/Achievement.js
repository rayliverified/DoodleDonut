#pragma strict
public var challengeCompleted:GameObject;

function Secret1Unlock ()
{
	var challengeArray = PlayerPrefsX.GetIntArray("challenges");
	if (challengeArray[30] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(30);
	}
}

function Secret2Unlock ()
{
	var challengeArray = PlayerPrefsX.GetIntArray("challenges");
	if (challengeArray[31] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(31);
	}
	//Sound
	SoundManager.PlaySFX(SoundManager.LoadFromGroup("Laugh"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function Secret3Unlock ()
{
	var challengeArray = PlayerPrefsX.GetIntArray("challenges");
	if (challengeArray[32] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(32);
	}
}