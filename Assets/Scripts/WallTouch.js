#pragma strict

public var twizzlerWall:Animator;

function Start () {
	twizzlerWall = GetComponent.<Animator>();
}

function OnTriggerEnter2D (other:Collider2D)
{ 
	twizzlerWall.SetTrigger("Touched");
}