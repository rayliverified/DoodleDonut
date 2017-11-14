#pragma strict

private static var beginDemo:boolean = false;

function OnEnable ()
{
	if (beginDemo)
		Destroy(gameObject);
	else
		Time.timeScale = 0;
}

function BeginDemo ()
{
	beginDemo = true;
	Time.timeScale = 1;
	Destroy(gameObject);
}