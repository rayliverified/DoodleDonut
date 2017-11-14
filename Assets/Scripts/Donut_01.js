#pragma strict
//Name: Sprinkle Donut 
//Ability: Rolls
public var donutMoveSpeed:float = 2.0;
public var circle:CircleCollider2D;
private var donutIntroSprites:Sprite[];

function Start () {
	//Loads sprite sheet from Resources folder and randomly selects a donut color
	donutIntroSprites = Resources.LoadAll.<Sprite>("Donut01");
	var myRandomIndex = Random.Range(0, 3); 
	var donut01 = this.gameObject;
	donut01.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[myRandomIndex];
	//Starts donut in random direction
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
}

function Flip ()
{
	donutMoveSpeed *= -1;
}
