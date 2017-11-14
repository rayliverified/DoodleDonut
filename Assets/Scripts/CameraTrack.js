#pragma strict

private var uianimator:GameObject;
private var yVelocity:float;

public var calcPosition:float;
public var relativeMultiplier:float;
public var absoluteMultiplier:float;
public var userplayer:GameObject;
public var cameraOffset:float = -1.2;

public static var camSpeed:float = 0.2;
public static var smoothTime:float = 0.3;
public static var positionLock:float;
public static var absolutePositionLock:float;
public static var positionLockCalc:float;
public static var relativePosition:float;
public static var goToEndScreen:boolean;

function Start () {
	//Resets variables
	if (PlayerPrefs.GetInt("restart") == 1)
	{
		var playerPosition = PlayerPrefs.GetFloat("playerPosition"); //Retrieve saved player position
		Instantiate(userplayer, Vector2(0, playerPosition), Quaternion.identity);
		calcPosition = playerPosition-cameraOffset;
		relativeMultiplier = Mathf.Floor(calcPosition/1.5);
		absoluteMultiplier = Mathf.Floor(Mathf.Abs(playerPosition + 3.72)/1.5);
		positionLock = relativeMultiplier;
		positionLockCalc = positionLock * 1.5;
		absolutePositionLock = absoluteMultiplier;
		relativePosition = positionLockCalc;
	}
	else
	{
		positionLock = 0;
		absolutePositionLock = 0;
		positionLockCalc = 0;
		relativePosition = 0;
		Instantiate(userplayer, Vector2(0, -3.74), Quaternion.identity);
	}
	PlayerPrefs.SetInt("restart", 0);
	goToEndScreen = false;
	PlayerMove.ended = false;
	userplayer = GameObject.FindGameObjectWithTag("Player");
	uianimator = GameObject.Find("UIAnimator");
}

function FixedUpdate () {
	var currentPosition = transform.position.y; //Saves current camera position
	calcPosition = userplayer.GetComponent.<Rigidbody2D>().position.y-cameraOffset; //Gets Player position adjusted for camera offset
	relativeMultiplier = Mathf.Floor(calcPosition/1.5); //Calculates floor multiplier
	absoluteMultiplier = Mathf.Floor(Mathf.Abs(userplayer.GetComponent.<Rigidbody2D>().position.y+3.72)/1.5);
	//Checks if Player position has passed camera movement threshold
	if (relativeMultiplier > positionLock)
	{
		positionLock = relativeMultiplier; //Updates positionLock to current position
		positionLockCalc = positionLock * 1.5; //Calculates new camera position
	}
	//Saves camera position, used for score and animation calculations
	if (absoluteMultiplier > absolutePositionLock)
	{
		absolutePositionLock = absoluteMultiplier;
	}
	//Moves camera up
	if (positionLock >= 1 && calcPosition >= positionLock && PlayerMove.dead == false)
	{
		relativePosition = Mathf.SmoothDamp(currentPosition, positionLockCalc, yVelocity, smoothTime); 
		this.transform.position = Vector3(transform.position.x, 
		relativePosition, 
		transform.position.z);
	}
	//End screen sequence
	if (PlayerMove.ended == true && goToEndScreen == false)
	{
		LeanTween.moveLocalY(gameObject, transform.position.y - 10, 1f); //Moves camera down to end screen
		goToEndScreen = true;
		uianimator.GetComponent(UIAnimator).MoveInEndScreen();
	}	
}