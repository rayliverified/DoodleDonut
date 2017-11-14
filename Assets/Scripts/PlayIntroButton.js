#pragma strict
public var uianimator:GameObject;
public var loadingScreen:GameObject;

function Start () {
	uianimator = GameObject.Find("UIAnimator");
}

function Loading ()
{
	loadingScreen.SetActive(true);
	uianimator.GetComponent(UIAnimator).MoveInLoadingScreen();
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Whoop", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	StartCoroutine(StartGame());
}

function StartGame ()
{
	yield WaitForSeconds (0.5f);
	Application.LoadLevel("TummyYummy");
}