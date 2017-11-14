#pragma strict

private var tiltDestroy:boolean = false;

function Start () {
	LeanTween.alpha(gameObject, 1f, 0.5f).setEase(LeanTweenType.easeInQuart).setFrom(Vector3(0.0, 0.0, 0.0));
	TiltInitiate();
}
function Update () {
	if (CameraTrack.absolutePositionLock != 1 && tiltDestroy == false) //edit
	{
		LeanTween.alpha(gameObject, 0f, 0.5f).setEase(LeanTweenType.easeInQuart);
		StartCoroutine(TiltDestroy());
		tiltDestroy = true;
	}
}

function TiltInitiate ()
{
	LeanTween.delayedCall(gameObject, 2f, function(){
	LeanTween.rotateAround(gameObject, new Vector3(0f,0f,1f), -30f , 1f).setEase(LeanTweenType.easeOutQuart);
	LeanTween.rotateAround(gameObject, new Vector3(0f,0f,1f), 30f , 1f).setDelay(1f).setEase(LeanTweenType.easeOutQuart);}).setOnCompleteOnStart(true).setRepeat(-1);
}

function TiltDestroy ()
{
	yield WaitForSeconds(1.0f);
	Destroy(gameObject);
}
