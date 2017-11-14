#pragma strict

function OnCollisionEnter2D (other:Collision2D) {
	if (other.gameObject.tag == "Player")
	{
		PlayerMove.grounded = true;
	}
}
