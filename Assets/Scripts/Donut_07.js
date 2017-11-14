#pragma strict
//Name: Triangle Donut
//Ability: Shoots out jelly splatters once every 3 seconds

public var donutMoveSpeed:float = 1;
public var circle:CircleCollider2D;
public var donutSplatter:GameObject;
public var splatterInterval:int;
public var splatted:boolean = false;

function Start () {
	//Starts donut movement in random direction
	if (Random.Range(-1, 1) < 0)
		Flip();
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

function FixedUpdate () {
	GetComponent.<Rigidbody2D>().velocity.x = donutMoveSpeed;
	if (gameObject.GetComponent.<Rigidbody2D>().isKinematic == true)
	{
		DestroyDonut();
	}
	else
	{
		//Detects if jelly splatter discharged
		if (splatted == false)
		{
			StartCoroutine(Splat());
			splatted = true;
		}
	}
	
}
function Splat ()
{
	yield WaitForSeconds(3.0f); //3 second delay between jelly splatters
	LeanTween.scale(gameObject, new Vector3(0.9f,0.9f,0f), 0.25f).setEase(LeanTweenType.easeOutElastic); //Shrinks
	LeanTween.scale(gameObject, new Vector3(1f,1f,1f), 0.4f).setDelay(0.25f).setEase(LeanTweenType.easeInQuad); //Expands
	//Creates splatter group
	SoundManager.PlaySFX("SFX_Bubble Pop Whoop", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	Instantiate(donutSplatter, Vector2(transform.position.x, transform.position.y), Quaternion.Euler(0,0,transform.eulerAngles.z));
	splatted = false; //Activates splatter again
}
function DestroyDonut()
{
	yield WaitForSeconds(0.1f);
	Destroy(gameObject);
}
function Flip ()
{
	donutMoveSpeed *= -1;
}

