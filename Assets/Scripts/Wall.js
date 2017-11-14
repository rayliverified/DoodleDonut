#pragma strict

function FixedUpdate () {
	transform.position.y = CameraTrack.positionLock * 1.5;
}

//function OnTriggerStay2D (other:Collider2D) {
//	if (other.gameObject.tag == "Player")
//	{
//		if (other.GetComponent.<Rigidbody2D>().position.x < 0)
//			other.GetComponent.<Rigidbody2D>().velocity.x = 20;
//		else
//			other.GetComponent.<Rigidbody2D>().velocity.x = -20;
//	}
//}
