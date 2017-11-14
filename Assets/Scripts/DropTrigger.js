#pragma strict

public var gObject:GameObject;
private var dropOffset:float = -3.75;

function Update ()
{
	//Destroys drop trigger once below player position threshold
	if (transform.position.y < CameraTrack.relativePosition + dropOffset)
		Destroy(gameObject);
}

function OnTriggerEnter2D (other:Collider2D)
{
	//Sets DropTrigger to trigger which allows donuts to fall through
	if (other.gameObject.tag == "Donut")
	{
		other.gameObject.GetComponent.<CircleCollider2D>().isTrigger = true;
		other.gameObject.SendMessage("PlaySound", SendMessageOptions.DontRequireReceiver);
	}
}