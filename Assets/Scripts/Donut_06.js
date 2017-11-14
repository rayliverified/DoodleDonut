#pragma strict
//Name: Zebra Donut
//Ability: Hidden until activated by proximity. Fades in and speeds up
public var circle:CircleCollider2D;
public var proximityDistance:float;
public var donutMoveSpeed:float;
private var player:GameObject;
private var triggered:boolean;
private var move:boolean;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player"); //Allows donut to know where player is
	triggered = false; //Donut not active
	move = false; //Donut is stationary
}
function FixedUpdate () {
	//Detects if player comes into proximity of donut
	if (Vector2.Distance(transform.position, player.transform.position) < proximityDistance && triggered == false)
	{
		ProximityTriggered();
		triggered = true;
		move = true; 
		//Sound
		SoundManager.PlaySFX("SFX_Startup Vibrate", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
	//Donut begins to move and speeds up
	if (move == true)
	{
		GetComponent.<Rigidbody2D>().velocity.x = donutMoveSpeed;
		if (donutMoveSpeed > 0.49 && donutMoveSpeed < 2)
		{
			donutMoveSpeed = donutMoveSpeed + 1 * Time.deltaTime;
		}
		else if (donutMoveSpeed < -0.49 && donutMoveSpeed > -2)
		{
			donutMoveSpeed = donutMoveSpeed - 1 * Time.deltaTime;
		}
	}
}
function OnTriggerEnter2D (other:Collider2D)
{
	if (other.gameObject.tag == "Player")
	{
		StopDonutMove();
	}
	if (other.gameObject.tag == "Wall")
	{
		Flip();
	}
}
function OnTriggerExit2D (other:Collider2D)
{
	if (other.gameObject.tag == "Floor")
	{
		circle.isTrigger = false;
	}
}
function ProximityTriggered ()
{
	//Donut starts moving at 0.5 which triggers donut to fade into view
	if (donutMoveSpeed == 0.5)
	{
		LeanTween.alpha(gameObject, 1f, 1f).setEase(LeanTweenType.easeInQuint);
		StartCoroutine(DonutMove());
	}
}
function DonutMove ()
{
	yield WaitForSeconds(1.0f); //Waits until donut fully fades into view
	//Starts donut movement in random direction
	if (Random.Range(-1, 1) < 0)
		Flip();
	gameObject.layer = 10; //Moves donut to Donut layer and activates collision detection with Player
}
function StopDonutMove()
{
	donutMoveSpeed = 0;
}
function Flip ()
{
	donutMoveSpeed *= -1;
}
