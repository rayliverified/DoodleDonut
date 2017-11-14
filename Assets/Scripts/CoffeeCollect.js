#pragma strict

public var uianimator:GameObject;
public var fireworks:GameObject;

private var collected:boolean;
private var yPos:float;
private var timeSinceLast:float = 10000;
private var collided:boolean;
private var animator:GameObject;

function Start () {
	collected = false;
	uianimator = GameObject.Find("UIAnimator");
	animator = GameObject.FindGameObjectWithTag("Player");
	yPos = gameObject.transform.position.y;
	LeanTween.rotateAround(gameObject, new Vector3(0f,0f,1f), 8f , 1f).setEase(LeanTweenType.easeShake).setRepeat(-1);
}
function OnTriggerEnter2D (other:Collider2D)
{
	if (other.gameObject.tag == "Player")
	{
		if (collected == false)
		{
			uianimator.GetComponent(UIAnimator).MoveOutHeaderImage(); //Deactivates pause menu
			LeanTween.cancel(gameObject); //Stops all tweens
			LeanTween.scale(gameObject, new Vector3(15f,15f,0f), 2.5f).setEase(LeanTweenType.easeOutCubic);
			LeanTween.alpha(gameObject, 0f, 1.5f).setEase(LeanTweenType.easeOutQuad);
			PlayerMove.alive = false;
			collected = true;
			other.gameObject.GetComponent.<Rigidbody2D>().isKinematic = true; //Disables movement
			animator.GetComponent.<Animator>().SetBool("Ate", true); //Eating animation 
			StartCoroutine(EndEffects());
			StartCoroutine(EndSuccess());
			//Sound
			SoundManager.PlaySFX("SFX_Drinking Slurping", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
		}
	}
}
function EndEffects ()
{
	yield WaitForSeconds(0.75f);
	fireworks.GetComponent.<ParticleSystem>().Play(true);
	SoundManager.PlaySFX("SFX_Coffee Collect", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}
function EndSuccess ()
{
	yield WaitForSeconds(3.5f);
	PlayerMove.weightModifier = -3500;
	PlayerMove.timeSinceLast = 0;
	PlayerMove.dead = true;
}