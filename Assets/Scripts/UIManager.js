#pragma strict

import UnityEngine.UI;

public var uianimator:GameObject;
public var scoreText:Text;
public static var currentScore:float;

function Start ()
{
	currentScore = 0;
	uianimator.GetComponent(UIAnimator).MoveInHeaderImage();
}

function OnEnable () {
	scoreText.text = "Score: 0";
}

function Update () 
{
	UpdateScore();
}

function UpdateScore ()
{
	if (CameraTrack.absolutePositionLock > currentScore)
	{
		currentScore = CameraTrack.absolutePositionLock;
		scoreText.text = "Score: " + currentScore;	
	}
}