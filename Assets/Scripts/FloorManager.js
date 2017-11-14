#pragma strict

public var deleteThreshold:float = -8.7;

function Update () {
	if (transform.position.y <= CameraTrack.positionLockCalc + deleteThreshold)
	{
		Destroy(gameObject);
	}
}