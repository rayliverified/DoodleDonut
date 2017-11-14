#pragma strict

private var triggeredOnce:boolean = false;
private var jumpCount:int = 0;
private var jumpComplete:boolean = false;
private var moveToLeft:boolean = false;
private var bigMoveToRight:boolean = false;
private var invokeCount:int = 0;

public var tyHeadIntro:GameObject;
public var donutIntro:GameObject;
public var coffeeIntro:GameObject;
public var circleIntro:CircleCollider2D;
public var animator:Animator;
public static var chase:boolean = false;
public static var drank:boolean = false;

function Start ()
{
	Time.timeScale = 1;
	chase = false;
	drank = false;
	circleIntro.enabled = true;
	InvokeRepeating("Spawn3Donuts", 1.0f, 2.0f);
	SoundManager.PlayConnection("DoodleDonutIntro", false, 0);
}

function OnTriggerEnter2D (other:Collider2D)
{
	if (other.CompareTag("Donut") && triggeredOnce == false && moveToLeft == false)
	{
		gameObject.GetComponent.<Rigidbody2D>().AddForce(Vector2(7, 20), ForceMode2D.Impulse);
		gameObject.GetComponent.<Rigidbody2D>().AddTorque(-10.0, ForceMode2D.Force);
		triggeredOnce = true;
		jumpCount = jumpCount + 1;
	}
	if (other.CompareTag("Floor"))
	{
		triggeredOnce = false;
	}
	if (other.CompareTag("Floor") && jumpCount >= 3)
	{
		jumpComplete = true;
	}
	if (other.CompareTag("Coffee") && jumpCount >= 3)
	{
		drank = true;
		LeanTween.scale(gameObject, Vector3(0.1f,0.1f,0.1f), 1.0f).setEase(LeanTweenType.easeInBounce);
		StartCoroutine(Restart());
	}
}

function FixedUpdate ()
{	
	if (invokeCount >= 3)
		CancelInvoke("Spawn3Donuts");
	if (triggeredOnce == false)
	{
		gameObject.GetComponent.<Rigidbody2D>().velocity.x = 1;
	}
	if (jumpComplete == true)
	{
		gameObject.GetComponent.<Rigidbody2D>().velocity.x = 2;
	}
	if (transform.position.x >= 7.2)
	{
		jumpComplete = false; 
		if (moveToLeft == false)
			MoveToLeft();
	}
	if (moveToLeft == true && bigMoveToRight == false)
		gameObject.GetComponent.<Rigidbody2D>().velocity.x = -2;
	if (transform.position.x <= -9)
	{
		bigMoveToRight = true;
		chase = true;
		transform.position.y = -3.1;
		transform.localScale = new Vector3(0.3, 0.3, 0.3);
	}
	if (transform.position.x >= 7 && bigMoveToRight == true)
	{
		moveToLeft = true;
		bigMoveToRight = false;
		circleIntro.enabled = false;
		Instantiate(coffeeIntro, Vector2(0, -3.4), Quaternion.identity);
	}
	animator.SetFloat("Rotation", transform.eulerAngles.z);
	
	//Exit game with back button
	#if UNITY_ANDROID
	if (Input.GetKeyDown(KeyCode.Escape))
	{
		Application.Quit();
	}
	#endif
}

function Spawn3Donuts ()
{
	Instantiate(donutIntro, Vector2(4.5, -3.55), Quaternion.identity);
	invokeCount = invokeCount + 1;
}

function MoveToLeft ()
{
	Instantiate(donutIntro, Vector2(8.5, -3.55), Quaternion.identity);
	Instantiate(donutIntro, Vector2(9.6, -3.55), Quaternion.identity);
	Instantiate(donutIntro, Vector2(10.7, -3.55), Quaternion.identity);
	moveToLeft = true;
}

function Restart ()
{
	yield WaitForSeconds(4.0f);
	Instantiate(tyHeadIntro, Vector2(-6, -3.75), Quaternion.identity);
	Destroy(gameObject);
}