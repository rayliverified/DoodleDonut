#pragma strict

public var uianimator:GameObject;
public var statTabs:StatMenuTabs;
private var entered:boolean = true;

function Start () {
	if (PlayerPrefs.HasKey("playerName") == false)
	{
		entered = false;
	}
}

function StatOpen ()
{
	if (entered == false)
	{
		uianimator.GetComponent(UIAnimator).MoveInNameInput();
		entered = true;
	}
	statTabs.GlobalPressed();
	uianimator.GetComponent(UIAnimator).MoveInStatMenu();
}
//function StatClose ()
//{
//	uianimator.GetComponent(UIAnimator).MoveOutStatMenu();
//}
