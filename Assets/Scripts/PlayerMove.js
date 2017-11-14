#pragma strict

private var uianimator:GameObject;
private var fp:Vector2;  // first finger position
private var lp:Vector2;  // last finger position
private var moveForce:float = 100f;	//[Deprecated] Force based code
private var maxSpeed:float = 5f;	//[Deprecated] Force based code
private var jumpForce:float = 1400f;	//[Deprecated] Force based code
private var a = 0.05f; //Movement smoothing Alpha value
private var acceleration:float;
private var lowPassFilter:Vatio.Filters.LowPassFilter.<float>;
public var circle:CircleCollider2D;
public var mainCamera:GameObject;
public var gainPoundsText:GameObject;
public var animator:Animator;
private var moveSpeed:float = 4; //Player sideways movement speed
private var targetPosition:float; //Player movement destination 
private var startPosition:float; //Player movement initial position
private var xStop:float;
private var yStop:float;
private var playerSize:float = 0.1;
private var touchEnded:boolean = true;
private var deadMove:boolean = false;
public static var timeSinceLast:float;
public static var playerSizeCount:int;
public static var alive:boolean = true;
public static var dead:boolean = false;
public static var ended:boolean = false;
public static var grounded:boolean = false;
public static var currentCalories:int;
public static var addedCalories:int;
public static var caloriesBurned:int;
public static var burnConstant:int = 10;
public static var addedWeight:float;
public static var weightModifier:float;

function Start () {
	Time.timeScale = 1; //Resets play speed on restart
	lowPassFilter = new Vatio.Filters.LowPassFilter.<float>(a, 0.0f); //Movement smoothing
	circle.enabled = true;
	alive = true;
	dead = false;
	ended = false;
	grounded = true;
	touchEnded = true;
	currentCalories = 0; //Reset calorie tracking counter to 0
	playerSizeCount = 1; //Reset player size counter
	addedCalories = 0;
	caloriesBurned = 0;
	addedWeight = 0;
	weightModifier = 0;
	timeSinceLast = 10000;
	deadMove = false;
	gameObject.GetComponent.<SpriteRenderer>().sortingLayerName = "Player";
	gameObject.GetComponent.<SpriteRenderer>().sortingOrder = 0;
	uianimator = GameObject.Find("UIAnimator"); //Sets UIAnimator
	mainCamera = GameObject.Find("Main Camera"); //Sets camera for camera movements
	gainPoundsText = GameObject.Find("GainPoundsText");
	PlayerPrefs.SetInt("cheated", 0); //Resets cheating variable to 0
}

function Update ()
{
//Input detection
	for (var touch : Touch in Input.touches)
    {
    	//Records initial touch position
    	if (touch.phase == TouchPhase.Began)
      	{
      		fp = touch.position; //Saves inital touch positions
      		lp = touch.position;
      	}
      	//Records touch movement
      	if (touch.phase == TouchPhase.Moved )
      	{
        	lp = touch.position; //Gets latest movement position
        	if((fp.y - lp.y) < -20 && grounded == true && touchEnded == true && alive == true && dead == false) // up swipe
        	{
				grounded = false; 
				touchEnded = false; //Prevents continuous movement
				startPosition = transform.position.y; //Set the start 
				targetPosition = startPosition + 1.55;
				UpdateCalories(); //Increases calorie counter
				LeanTween.value(gameObject, PlayerJump, transform.position.y, targetPosition, 0.2f).setEase(LeanTweenType.easeOutExpo);
				//Sound
				SoundManager.PlaySFX(SoundManager.LoadFromGroup("Swipe"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
        		SoundManager.PlaySFX("SFX_Jump Bubble Pop", false, 0.01f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
        	}
        	else if((fp.y - lp.y) > 20 && grounded == true && touchEnded == true && alive == true && dead == false) // down swipe
     		{
     			if (transform.position.y + 1.2 > CameraTrack.positionLockCalc - 2.5)
     			{
     				grounded = false;
					touchEnded = false; //Prevents continuous movement
					startPosition = transform.position.y; //Set the start 
					targetPosition = startPosition - 1.45;
					LeanTween.value(gameObject, PlayerJump, transform.position.y, targetPosition, 0.2f).setEase(LeanTweenType.easeOutExpo);
					//Sound
					SoundManager.PlaySFX("SFX_Paper Rustling", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);     			
     				SoundManager.PlaySFX("SFX_Jump Bubble Deep", false, 0.01f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
     			}
     		}
      	}
      	if(touch.phase == TouchPhase.Ended)
      	{
      		touchEnded = true; //Ends touch phase and allows new touch phase to begin
      	}
	}
	//Controls sideways movement and disables sideways movement if player is dead
	if (alive == true && dead == false)
	{
	    acceleration = Input.acceleration.x * 2.5; //Grabs device accelerometer info
	    acceleration = lowPassFilter.Append(acceleration); //Smooths acceleration through low pass filter
	    if (transform.position.x > 2.5 || acceleration > 2.5)
	    {
	    	transform.position.x = 2.5; //Keeps player from falling off edge of screen
	    }
	    else if (transform.position.x < -2.5 || acceleration < -2.5)
	    {
	    	transform.position.x = -2.5; //Keeps player from falling off edge of screen
	    }
	    else
	    {
	    	acceleration = (acceleration * moveSpeed); //Acceleration multiplier
	        transform.position.x = Mathf.Clamp(acceleration, -2.5, 2.5); //Sets movement to filtered accelerometer position
	    }
	}
	if (dead == true)
	{
		if (Time.time >= timeSinceLast && deadMove == false)
		{
			//Added calorie calculation 
			for (var i = 0; i < PlayerMove.playerSizeCount-1; i++)
			{
				addedCalories = addedCalories + Random.Range(100, 200);
			}
			caloriesBurned = CameraTrack.absolutePositionLock * burnConstant;
			addedWeight = addedCalories - caloriesBurned + weightModifier;
			addedWeight = addedWeight/3500;
			addedWeight = Mathf.Round(addedWeight*100)/100;
			gainPoundsText.GetComponent.<Text>().text = "Or Gain " + addedWeight + " Lbs!";

			var continuecalc:boolean = ContinueCalc();
			if (continuecalc == true)
			{
				//Pause sequence
				circle.enabled = false; //Deactivates Collider object
				gameObject.GetComponent.<Rigidbody2D>().Sleep(); //Deactivates Player rigidbody
				gameObject.GetComponent.<SpriteRenderer>().sortingLayerName = "UI"; //Moves Player on same level as ending UI
				gameObject.GetComponent.<SpriteRenderer>().sortingOrder = -3;

				//Saves player position
				PlayerPrefs.SetFloat("playerPosition", transform.position.y);
				PlayerPrefs.SetFloat("blockCounter", SpawnTest.blockCounter);
				PlayerPrefs.SetInt("cheated", 1);

				uianimator.GetComponent(UIAnimator).MoveInCoffeeSave();
				Time.timeScale = 0;
			}
			else
			{
				circle.enabled = false; //Deactivates Collider object
				gameObject.GetComponent.<Rigidbody2D>().Sleep(); //Deactivates Player rigidbody
				gameObject.GetComponent.<SpriteRenderer>().sortingLayerName = "UI"; //Moves Player on same level as ending UI
				gameObject.GetComponent.<SpriteRenderer>().sortingOrder = -3;
				EndSequence();
			}
			//Adds 1 lbs to prevent cheating
			deadMove = true; //Makes sure end sequence only activates once
		}
	}
	animator.SetFloat("Rotation", transform.eulerAngles.z);
}
function ContinueCalc ()
{
	//Calculate conditions to determine if popup should show
	if (addedWeight > 0)
		return true;
	else
		return false;
}
function EndSequence ()
{
	Time.timeScale = 1;
	var moveCalc = mainCamera.transform.position.y - 9 + (transform.localScale.x * 3); //Calculates Player ending position
	LeanTween.move(gameObject, new Vector2(0, moveCalc), 1.5f).setEase(LeanTweenType.easeOutSine); //Moves Player to ending position
	ended = true; //Notifies CameraTrack.js to begin end sequence
}
function PlayerJump (position:float)
{
	transform.position.y = position;
}
//Detects regular collisions
function OnCollisionEnter2D (other:Collision2D)
{
	if (other.gameObject.tag == "Donut")
	{
		uianimator.GetComponent(UIAnimator).MoveOutHeaderImage(); //Deactivates pause menu
		LeanTween.cancel(gameObject); //Stops all tweens
		alive = false;
		dead = true;
		gameObject.GetComponent.<Rigidbody2D>().isKinematic = true; //Disables movement
		other.gameObject.GetComponent.<Rigidbody2D>().isKinematic = true; //Disables movement
		xStop = transform.position.x; //Saves player position
		yStop = transform.position.y;
		StartCoroutine(PlayerExpand(other, null)); //Activates expanding animation
	}
}
//Detects collisions when Player is jumping
function OnTriggerEnter2D (other:Collider2D)
{
	if (other.gameObject.tag == "Donut")
	{
		uianimator.GetComponent(UIAnimator).MoveOutHeaderImage(); //Deactivates pause menu
		LeanTween.cancel(gameObject); //Stops all tweens
		alive = false;
		dead = true; 	
		gameObject.GetComponent.<Rigidbody2D>().isKinematic = true; //Disables movement
		other.gameObject.GetComponent.<Rigidbody2D>().isKinematic = true; //Disables movement
		xStop = transform.position.x; //Saves player position
		yStop = transform.position.y;
		StartCoroutine(PlayerExpand(null, other)); //Activates expanding animation
	}
}

function PlayerExpand (otherObject1:Collision2D, otherObject2:Collider2D)
{
	yield WaitForSeconds(0f);
	//Size calculations
	playerSize = playerSize*(1+playerSizeCount);
	playerSize = playerSize/playerSizeCount;
	
	playerSizeCount = playerSizeCount + 1; //Increases size counter for calorie calculations
	timeSinceLast = Time.time + 1.0; //Delays ending animation by 1 second
	if (otherObject1 != null)
	{
		LeanTween.move(otherObject1.gameObject, new Vector2(xStop, yStop), 0.5f).setEase(LeanTweenType.easeOutQuint); //Moves donut to center of Player position
		LeanTween.scale(otherObject1.gameObject, new Vector2(0, 0), 0.5f).setEase(LeanTweenType.linear); //Shrinks donut to 0
	}
	if (otherObject2 != null)
	{
		LeanTween.move(otherObject2.gameObject, new Vector2(xStop, yStop), 0.5f).setEase(LeanTweenType.easeOutQuint); //Moves donut to center of Player position
		LeanTween.scale(otherObject2.gameObject, new Vector2(0, 0), 0.5f).setEase(LeanTweenType.linear); //Shrinks donut to 0
	}
	LeanTween.scale(gameObject, new Vector2(playerSize, playerSize), 1f).setEase(LeanTweenType.easeOutElastic); //Increases Player size
	animator.SetBool("Ate", true); //Eating animation 
	//Sound
	SoundManager.PlaySFX(SoundManager.LoadFromGroup("Swallow"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}
//Increases calorie counter
function UpdateCalories()
{
	currentCalories = currentCalories + 1;
}
//function FixedUpdate ()
//{
//	var h:float = Input.GetAxis("Horizontal");
//	if(h * GetComponent.<Rigidbody2D>().velocity.x < maxSpeed)
//		GetComponent.<Rigidbody2D>().AddForce(Vector2.right * h * moveForce);
//	if(Mathf.Abs(GetComponent.<Rigidbody2D>().velocity.x) > maxSpeed)
//		GetComponent.<Rigidbody2D>().velocity = Vector2(Mathf.Sign(GetComponent.<Rigidbody2D>().velocity.x) * maxSpeed, GetComponent.<Rigidbody2D>().velocity.y);
//}

//public var playermove:PlayerMove;
//playermove = other.gameObject.GetComponent(PlayerMove);
//playermove.enabled = false;