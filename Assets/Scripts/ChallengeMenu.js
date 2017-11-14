#pragma strict

import UnityEngine.UI;

public var lose1lbs:GameObject;
public var lose3lbs:GameObject;
public var lose6lbs:GameObject;
public var lose10lbs:GameObject;
public var lose15lbs:GameObject;
public var lose21lbs:GameObject;
public var lose28lbs:GameObject;
public var lose36lbs:GameObject;
public var lose45lbs:GameObject;
public var lose55lbs:GameObject;
public var lose66lbs:GameObject;
public var lose78lbs:GameObject;
public var play10games:GameObject;
public var play20games:GameObject;
public var play30games:GameObject;
public var play50games:GameObject;
public var play75games:GameObject;
public var play100games:GameObject;
public var play150games:GameObject;
public var play200games:GameObject;
public var play300games:GameObject;
public var drink1coffee:GameObject;
public var drink5coffee:GameObject;
public var drink10coffee:GameObject;
public var drink20coffee:GameObject;
public var drink30coffee:GameObject;
public var drink40coffee:GameObject;
public var drink55coffee:GameObject;
public var drink75coffee:GameObject;
public var drink100coffee:GameObject;
public var secret1:GameObject;
public var secret2:GameObject;
public var secret3:GameObject;
public var completedColor:Color;
public var completedText:GameObject;
private var soundManager:SoundManager;
private var numberCompleted:int;

function LoadChallenges () {
	numberCompleted = 0;
	var challengeArray:int[] = PlayerPrefsX.GetIntArray("challenges");
	//Lose Lbs
	if (challengeArray[0] == 1)
	{
		lose1lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[1] == 1)
	{
		lose3lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[2] == 1)
	{
		lose6lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[3] == 1)
	{
		lose10lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[4] == 1)
	{
		lose15lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[5] == 1)
	{
		lose21lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[6] == 1)
	{
		lose28lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[7] == 1)
	{
		lose36lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[8] == 1)
	{
		lose45lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[9] == 1)
	{
		lose55lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[10] == 1)
	{
		lose66lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[11] == 1)
	{
		lose78lbs.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	//Play Games
	if (challengeArray[12] == 1)
	{
		play10games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[13] == 1)
	{
		play20games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[14] == 1)
	{
		play30games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[15] == 1)
	{
		play50games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[16] == 1)
	{
		play75games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[17] == 1)
	{
		play100games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[18] == 1)
	{
		play150games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[19] == 1)
	{
		play200games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[20] == 1)
	{
		play300games.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	//Drink Coffee
	if (challengeArray[21] == 1)
	{
		drink1coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[22] == 1)
	{
		drink5coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[23] == 1)
	{
		drink10coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[24] == 1)
	{
		drink20coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[25] == 1)
	{
		drink30coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[26] == 1)
	{
		drink40coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[27] == 1)
	{
		drink55coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[28] == 1)
	{
		drink75coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[29] == 1)
	{
		drink100coffee.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	//Secrets
	if (challengeArray[30] == 1)
	{
		secret1.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[31] == 1)
	{
		secret2.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	if (challengeArray[32] == 1)
	{
		secret3.GetComponentInChildren.<Image>().color = completedColor;
		numberCompleted = numberCompleted + 1;
	}
	UpdateNumberCompleted();
}

function UpdateNumberCompleted ()
{
	completedText.GetComponent.<Text>().text = numberCompleted + "/33";
}