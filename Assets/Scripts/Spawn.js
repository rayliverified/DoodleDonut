#pragma strict

public var donut01:GameObject;
private var donut01Offset:float = 8.46;
public var floorLLPLL:GameObject;
private var floorOffset:float = 6.3;
public var wallBounce:GameObject;
private var wallOffset:float = 5.7;
private var wallPosition:float;
private var counter:float = 0;
public var background:GameObject;
private var backgroundDistance:float;
public var swipe:GameObject;
private var swipeBoolean:boolean = true;

private var relativeTime:float; 

function Start () {
	relativeTime = Time.time;
	backgroundDistance = background.GetComponent.<Renderer>().bounds.size.y;
	Instantiate(background, Vector2(0, backgroundDistance), Quaternion.identity);
}
function Update () {
	if (CameraTrack.positionLock > counter)
	{
		Instantiate(wallBounce, Vector2(0, wallOffset + CameraTrack.positionLockCalc), Quaternion.identity);
		var randPosX = Random.Range(-1.74, 1.74);;
		Instantiate(floorLLPLL, Vector2(randPosX, floorOffset + CameraTrack.positionLockCalc), Quaternion.identity);
		Instantiate(donut01, Vector2(randPosX, donut01Offset + CameraTrack.positionLockCalc), Quaternion.identity);
		counter = CameraTrack.positionLock;
		Debug.Log(counter);
	}
	if (Time.time > relativeTime + 1.5f && swipeBoolean == true)
	{
		Instantiate(swipe, Vector2(0.45, -4), Quaternion.Euler(0, 0, 45));
		swipeBoolean = false;
	}
}