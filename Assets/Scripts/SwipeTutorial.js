#pragma strict

private var relativeTime:float;

function Start () {
	relativeTime = Time.time;
	SwipeInitiate();
}
function Update () {
	if (CameraTrack.absolutePositionLock == 0 && Time.time > relativeTime + 3.0f)
	{
		SwipeInitiate();
		relativeTime = Time.time;
	}	
	if (CameraTrack.absolutePositionLock != 0)
	{
		Destroy(gameObject);
	}
}

function SwipeInitiate ()
{
	LeanTween.alpha(gameObject, 1f, 0.5f).setEase(LeanTweenType.easeInQuart).setFrom(Vector3(0.0, 0.0, 0.0));
	LeanTween.moveY(gameObject, -2f, 1f).setDelay(0.5f).setEase(LeanTweenType.easeOutQuint).setFrom(Vector3(-4.0, 0.0, 0.0));
	LeanTween.alpha(gameObject, 0f, 1f).setDelay(1.5f).setEase(LeanTweenType.easeOutQuad);
	LeanTween.moveY(gameObject, -4f, 0.1f).setDelay(2.5f);
}
