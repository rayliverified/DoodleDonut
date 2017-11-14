#pragma strict

public var deleteThreshold:float = -7.8;

function Start () {

}

function Update () {
	if (transform.position.y <= CameraTrack.positionLockCalc + deleteThreshold)
	{
		Destroy(gameObject);
	}
}