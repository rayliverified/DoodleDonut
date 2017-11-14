#pragma strict
public var donutMoveSpeed:float;

function OnTriggerEnter2D (other:Collider2D)
{
	if (other.gameObject.tag == "Spikes")
	{
		Spiked();
	}
	if (other.gameObject.tag == "Player")
	{
		StopDonutMove();
	}
}

function StopDonutMove()
{
	donutMoveSpeed = 0;
}

function Spiked ()
{
	GetComponent.<Rigidbody2D>().isKinematic = true;
	LeanTween.scale(gameObject, new Vector2(0f,0f), 0.5f).setEase(LeanTweenType.easeOutQuad);
	LeanTween.move(gameObject, new Vector2(transform.position.x, transform.position.y - 1), 1.0f).setEase(LeanTweenType.linear);
	StartCoroutine(Destroy());
}

function Destroy ()
{
	yield WaitForSeconds(2.0f);
	Destroy(gameObject);
}