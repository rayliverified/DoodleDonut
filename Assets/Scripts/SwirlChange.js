#pragma strict

public var swirlSprites:Sprite[];
private var myRandomIndex:int;

function Awake () {
	swirlSprites = Resources.LoadAll.<Sprite>("Lollipop Swirl");
	myRandomIndex = Random.Range(0, 6); 
}

function Start () {
	var swirl = this.gameObject;
	swirl.GetComponent.<SpriteRenderer>().sprite = swirlSprites[myRandomIndex];
}