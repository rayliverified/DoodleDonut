#pragma strict
public var deleteThreshold:float = -20;
private var centerDistance:float = 19.49;
private var visible:boolean;

function Start () {
	visible = false;
}

function Update ()
{
//	if (transform.position.y <= CameraTrack.positionLockCalc + deleteThreshold)
//	{
//		Destroy(gameObject);
//	}
}

function OnBecameVisible ()
{
	visible = true;
}

function OnBecameInvisible ()
{
	if (visible == true)
	{
		visible = false;
		transform.position.y = transform.position.y + centerDistance * 2;
	}
}
