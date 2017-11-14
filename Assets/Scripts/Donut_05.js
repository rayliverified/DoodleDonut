#pragma strict

public var donutMoveSpeed:float = 2.0;
public var circle:CircleCollider2D;
public var donutIntroSprites:Sprite[];

function Start () {
	donutIntroSprites = Resources.LoadAll.<Sprite>("Donut_Chain");
	var donut05 = this.gameObject;
	if (transform.parent.position.x >= -1.2 && transform.parent.position.x < -0.72)
	{
		donut05.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[0];
	}
	if (transform.parent.position.x >= -0.72 && transform.parent.position.x < -0.24)
	{
		donut05.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[1];
	}
	if (transform.parent.position.x >= -0.24 && transform.parent.position.x < 0.24)
	{
		donut05.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[2];
	}
	if (transform.parent.position.x >= 0.24 && transform.parent.position.x < 0.72)
	{
		donut05.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[3];
	}
	if (transform.parent.position.x >= 0.72 && transform.parent.position.x < 1.2)
	{
		donut05.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[4];
	}
	if (transform.parent.position.x > 0)
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
