#pragma strict

public var donutMoveSpeed:float = -2.0;
public var donutIntroSprites:Sprite[];
private var choices:float[];
private var myRandomIndex:int;

function Awake () {
	choices = new float[3];
	donutIntroSprites = Resources.LoadAll.<Sprite>("Donut01");
	myRandomIndex = Random.Range(0, 3); 
}

function Start () {
	var donut01 = this.gameObject;
	donut01.GetComponent.<SpriteRenderer>().sprite = donutIntroSprites[myRandomIndex];
}

function FixedUpdate () {
	if (TYIntro.chase == false)
	{
		GetComponent.<Rigidbody2D>().velocity.x = donutMoveSpeed;
		if (transform.position.x <= -6)
			Destroy(gameObject);
	}
	if (TYIntro.chase == true)
	{
		GetComponent.<Rigidbody2D>().velocity.x = -donutMoveSpeed;
		if (transform.position.x >= 8)
			Destroy(gameObject);
	}
}