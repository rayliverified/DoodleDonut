#pragma strict

private var timeSinceLast:float = 10000;
private var drankOnce:boolean = false;
private var challengeCompleted:GameObject;

function Start () {
	LeanTween.alpha(gameObject, 100f, 5f).setEase(LeanTweenType.easeInQuad).setFrom(Vector3(0.0, 0.0, 0.0));
	LeanTween.scale(gameObject, Vector3(1f,1f,0f), 1f).setEase(LeanTweenType.easeInQuad).setFrom(Vector3(1.5, 1.5, 0.0));
	timeSinceLast = Time.time + 1.0f;
	challengeCompleted = GameObject.Find("ChallengeCompleted");
}

function Update () {
	if (Time.time >= timeSinceLast && TYIntro.drank == false)
	{
		CoffeeBounce();
	}
	if (TYIntro.drank == true && drankOnce == false)
	{
		LeanTween.scale(gameObject, Vector2(0.0f,0.0f), 1f).setEase(LeanTweenType.easeOutCirc);
		StartCoroutine(Destroy());
//		StartCoroutine(Drank());
//		drankOnce = true;
	}
}

function OnMouseDown ()
{
	var challengeArray = PlayerPrefsX.GetIntArray("challenges");
	if (challengeArray[30] == 0)
	{
		challengeCompleted.GetComponent(ChallengeCompleted).ChallengeCompleted(30);
	}
	var uianimator = GameObject.Find("UIAnimator");
	uianimator.GetComponent(UIAnimator).MoveInCreditsMenu();
}

function CoffeeBounce ()
{
	timeSinceLast = Time.time + 2.5f;
	LeanTween.moveY(gameObject, -2.6f, 1f).setEase(LeanTweenType.easeInBack);
	LeanTween.moveY(gameObject, -3.4f, 1.5f).setDelay(1f).setEase(LeanTweenType.easeOutCubic);
}

//function Drank ()
//{
//	yield WaitForSeconds(0f);
//	LeanTween.alpha(gameObject, 0, 1.5f).setEase(LeanTweenType.easeOutQuad);
//	LeanTween.scale(gameObject, Vector2(1.5f,1.5f), 1f).setEase(LeanTweenType.easeOutCirc);
//	StartCoroutine(Destroy());
//}
//
function Destroy()
{
	yield WaitForSeconds(2.0f);
	Destroy(gameObject);
}