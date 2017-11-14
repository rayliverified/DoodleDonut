#pragma strict
public var splatter1:GameObject;
public var splatter2:GameObject;
public var splatter3:GameObject;

function Start () {
	StartCoroutine(DestroySplatter());
	LeanTween.scaleY(splatter1, 1f, 0.5f).setEase(LeanTweenType.easeOutQuint);
	LeanTween.scaleY(splatter2, 1f, 0.5f).setEase(LeanTweenType.easeOutQuint);
	LeanTween.scaleY(splatter3, 1f, 0.5f).setEase(LeanTweenType.easeOutQuint);
}
function DestroySplatter ()
{
	yield WaitForSeconds(1.25f);
	Destroy(gameObject);
}
