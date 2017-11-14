#pragma strict

import UnityEngine.UI;

function Start () {
	var weightTotal:float = PlayerPrefs.GetFloat("weightTotal");
	if (weightTotal < 119)
	{
	gameObject.GetComponent.<Text>().text = "Level 2:\nBurn " + Mathf.Floor((weightTotal - 117)*100)/100 + " lbs to WIN!";
	if (weightTotal < 117)
		{
	gameObject.GetComponent.<Text>().text = "Level 3:\nBurn " + Mathf.Floor((weightTotal - 114)*100)/100 + " lbs to WIN!";
	if (weightTotal < 114)
			{
	gameObject.GetComponent.<Text>().text = "Level 4:\nBurn " + Mathf.Floor((weightTotal - 110)*100)/100 + " lbs to WIN!";
	if (weightTotal < 110)
				{
	gameObject.GetComponent.<Text>().text = "Level 5:\nBurn " + Mathf.Floor((weightTotal - 105)*100)/100 + " lbs to WIN!";
	if (weightTotal < 105)
					{
	gameObject.GetComponent.<Text>().text = "Level 6:\nBurn " + Mathf.Floor((weightTotal - 99)*100)/100 + " lbs to WIN!";
	if (weightTotal < 99)
						{
	gameObject.GetComponent.<Text>().text = "Level 7:\nBurn " + Mathf.Floor((weightTotal - 92)*100)/100 + " lbs to WIN!";
	if (weightTotal < 92)
							{
	gameObject.GetComponent.<Text>().text = "Level 8:\nBurn " + Mathf.Floor((weightTotal - 84)*100)/100 + " lbs to WIN!";
	if (weightTotal < 84)
								{
	gameObject.GetComponent.<Text>().text = "Level 9:\nBurn " + Mathf.Floor((weightTotal - 75)*100)/100 + " lbs to WIN!";
	if (weightTotal < 75)
									{
	gameObject.GetComponent.<Text>().text = "Level 10:\nBurn " + Mathf.Floor((weightTotal - 65)*100)/100 + " lbs to WIN!";
	if (weightTotal < 65)
										{
	gameObject.GetComponent.<Text>().text = "Level 11:\nBurn " + Mathf.Floor((weightTotal - 54)*100)/100 + " lbs to WIN!";
	if (weightTotal < 54)
											{
	gameObject.GetComponent.<Text>().text = "Level 12:\nBurn " + Mathf.Floor((weightTotal - 42)*100)/100 + " lbs to WIN!";
	if (weightTotal < 42)
												{
	gameObject.GetComponent.<Text>().text = "Final Challenge:\nCan you reach 0 lbs?";
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}	
	}
	if (weightTotal >= 119)
	{
		gameObject.GetComponent.<Text>().text = "Level 1:\nBurn " + Mathf.Floor((weightTotal - 119)*100)/100 + " lbs to WIN!";
	}
	LeanTween.textAlpha(gameObject.GetComponent.<RectTransform>(), 100f, 3f).setEase(LeanTweenType.easeInQuad).setFrom(Vector3(0.0, 0.0, 0.0)).setDelay(0.4f);
	LeanTween.scale(gameObject, Vector3(1f,1f,0f), 0.6f).setEase(LeanTweenType.easeInQuad).setFrom(Vector3(1.5, 1.5, 0.0)).setDelay(0.4f);
}
