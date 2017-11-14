#pragma strict

public var uianimator:GameObject;
public var tutorialImage:GameObject;
private var menuSprites:Sprite[];

function Start () {
	var gamesPlayed = PlayerPrefs.GetInt("gamesPlayed"); //Get game session #
	var currentGame = PlayerPrefs.GetInt("currentGame");
	//Display appropriate message menu
	if (gamesPlayed >= 3)
	{
		Destroy(gameObject);
	}
	if (currentGame == 0)
	{
		MessageMenu(0);
		PlayerPrefs.SetInt("currentGame", -1);
	}
	if (currentGame != gamesPlayed)
	{	
		if (gamesPlayed == 1)
		{
			MessageMenu(1);
			PlayerPrefs.SetInt("currentGame", 1);
		}
		if (gamesPlayed == 2)
		{
			MessageMenu(2);
			PlayerPrefs.SetInt("currentGame", 2);
		}
		if (gamesPlayed == 3)
		{
			MessageMenu(3);
			PlayerPrefs.SetInt("currentGame", 3);
		}
	}
}

function MessageMenu (id:int)
{
	var menuSprites = Resources.LoadAll.<Sprite>("Tutorial");
	tutorialImage.GetComponent.<Image>().sprite = menuSprites[id];
	uianimator.GetComponent(UIAnimator).MoveInMessageMenu();
	StartCoroutine(StopTime());
}

function StopTime ()
{
	yield WaitForSeconds(0.1f);
	Time.timeScale = 0;
	PlayerMove.alive = false;
}