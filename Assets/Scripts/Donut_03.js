#pragma strict
public var donutMoveSpeed:float = 4.0;
public var circle:CircleCollider2D;

function Start () {
	if (Random.Range(-1, 1) < 0)
		Flip();
}

function FixedUpdate () {
	GetComponent.<Rigidbody2D>().velocity.x = donutMoveSpeed;
}

function OnTriggerEnter2D (other:Collider2D) 
{
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

function Flip ()
{
	donutMoveSpeed *= -1;
}

function PlaySound ()
{
		SoundManager.PlaySFX("SFX_Whoosh Swish", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
}