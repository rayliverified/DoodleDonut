#pragma strict

var uianimator:GameObject;

function RestartInitiate ()
{
	uianimator.GetComponent(UIAnimator).MoveOutPauseMenu();
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Whoop", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	StartCoroutine(RestartMain());
}

function RestartMain ()
{
	Time.timeScale = 1;
	yield WaitForSeconds(0.2f);
	PlayerMove.alive = true;
	PlayerMove.dead = false;
	Application.LoadLevel("TummyYummy");
}