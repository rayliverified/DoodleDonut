#pragma strict

public var bottomOffset:float = -5.03;

function Update () {
	if (PlayerMove.dead == false)
	{
		transform.position.y = CameraTrack.relativePosition + bottomOffset;
	}
}