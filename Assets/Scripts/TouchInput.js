#pragma strict
var player : Transform;  // Drag your player here
private var fp : Vector2;  // first finger position
private var lp : Vector2;  // last finger position

function Update()
{
    for (var touch : Touch in Input.touches)
    {
          if (touch.phase == TouchPhase.Began)
          {
                fp = touch.position;
                lp = touch.position;
          }
          if (touch.phase == TouchPhase.Moved )
          {
                lp = touch.position;
          }
          if(touch.phase == TouchPhase.Ended)
          {
//         	if((fp.x - lp.x) > 80) // left swipe
//         	{
//         		player.Rotate(0,-90,0);
//         	}
//	        else if((fp.x - lp.x) < -80) // right swipe
//	        {
//	        	player.Rotate(0,90,0);
//	        }
	        if((fp.y - lp.y) < -80 ) // up swipe
	        {
	        	// add your jumping code here
	        }
	        else if((fp.y - lp.y) > 80) // down swipe
         	{
         		// add your dropping code here
         	}
     }
	}
}
var targetPosition : float; //destination 
var liftSpeed : float = 10; //speed (it will complete the motion in 1/speed seconds) 
private var moving : boolean = false; //flag 
private var weight : float = 0; //amount moved 
private var startPosition:float; //Where we start;
//	if (Input.touchCount > 0)
//	{
//		var touch = Input.GetTouch(0);
//		switch (touch.phase)
//		{
//			case TouchPhase.Began:
//				startPos = touch.position.y;
//				directionChosen = false;
//				break;
//			case TouchPhase.Moved:
//				directionChosen = true;
//				break;
//			case TouchPhase.Ended:
//				direction = touch.position.y - startPos;
//				break;
//		}
//	}
//	if (directionChosen == true)
//	{
//		if (direction >= 50 && grounded == true)
//		{
//			GetComponent.<Rigidbody2D>().AddForce(new Vector2(0f, jumpForce));
//			grounded = false;
//		}
//		else if (direction <= -50 && grounded == true)
//		{
//			GetComponent.<Rigidbody2D>().AddForce(new Vector2(0f, -300f));
//			grounded = false;
//			circle.isTrigger = true;
//			falling = true;
//		}
//		directionChosen = false;
//	}
//	if(transform.position.y == targetPosition) 
//	{
//		moving = false; //reset flag 
//		weight = 0;
//	}
//	if(moving) //check flag 
//	{
//		weight += Time.deltaTime * liftSpeed; //amount 
//		transform.position.y = Mathf.SmoothStep(startPosition, targetPosition, weight);
//	}
//function OnTriggerExit2D (other:Collider2D)
//{
//	if (other.gameObject.tag == "Floor" && falling == true)
//	{
//		circle.isTrigger = false;
//		falling = false;
//	}
//}
//	//[Deprecated] Keyboard control
//	if(Input.GetButtonDown("Jump") && grounded == true) 
//	{
//		GetComponent.<Rigidbody2D>().AddForce(new Vector2(0f, jumpForce));
//		grounded = false;
//		UpdateCalories();
//	}
//	if(Input.GetButtonDown("Vertical") && grounded == true)
//	{
//		GetComponent.<Rigidbody2D>().AddForce(new Vector2(0f, -300f));
//		grounded = false;
//		circle.isTrigger = true;
//		falling = true;
//	}
//	if(Input.GetButtonUp("Horizontal")) //[Deprecated] Keyboard control
//		GetComponent.<Rigidbody2D>().velocity.x = 0;