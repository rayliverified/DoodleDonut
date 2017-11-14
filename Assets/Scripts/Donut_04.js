#pragma strict
public var circle:CircleCollider2D;
public var anim:Animator;
public var proximityDistance:float;
public var donutMoveSpeed:float;
private var player:GameObject;
private var triggeredOnce:boolean = false;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	LeanTween.rotateAround(gameObject, new Vector3(0f,0f,1f), 360f , 2f).setFrom(Vector3(0.0, 0.0, 0.0)).setRepeat(-1);
	//Sound
	SoundManager.PlaySFX("SFX_Pulse Low Deep Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);	
}
function FixedUpdate ()
{
	if (Vector2.Distance(transform.position, player.transform.position) < proximityDistance && triggeredOnce == false)
	{
		anim.SetBool("Activated", true); //Activates color changing animation
		triggeredOnce = true;
		//Sound
		SoundManager.PlaySFX("SFX_Beep Click 2x", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);	
	}
}
function OnTriggerEnter2D (other:Collider2D)
{
	if (other.gameObject.tag == "Player")
	{
		StopDonutMove();
	}
}
function OnCollisionEnter2D (other:Collision2D)
{
	if (other.gameObject.tag == "Player")
	{
		StopDonutMove();
	}
}
//Activated by animation
function ProximityTriggered ()
{
	if (donutMoveSpeed == 1) //Checks if donut is still active
	{
		LeanTween.scale(gameObject, new Vector3(0.4f,0.4f,0f), 1f).setEase(LeanTweenType.easeOutElastic);
		//Sound
		SoundManager.PlaySFX("SFX_Buzz Powerup", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);	
	}
}
function StopDonutMove ()
{
	donutMoveSpeed = 0; //Deactivates proximity trigger
	StartCoroutine(DonutDestroy()); //Destroys donut to prevent expanding after player eats it
}
function DonutDestroy ()
{
	yield WaitForSeconds(0.05f);
	Destroy(gameObject);
}