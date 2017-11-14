#pragma strict
private var sharePlugin:SharePlugin;
private var utilsPlugin:UtilsPlugin;

function ShareImage ()
{
	sharePlugin = SharePlugin.GetInstance();
	sharePlugin.SetDebug(0);
	utilsPlugin = UtilsPlugin.GetInstance ();
	utilsPlugin.SetDebug (0);
	var screenShotName:String = "DoodleDonutScreenshot.jpg";
	var folderPath:String = utilsPlugin.CreateFolder ("DoodleDonut", 0);
	var path:String = folderPath + "/" + screenShotName;
	StartCoroutine (AUP.Utils.TakeScreenshot (path, screenShotName));
	sharePlugin.ShareImage("Doodle Donut", "I'm having a lot of fun playing Doodle Donut! Help me beat donuts here --> http://bit.ly/doodledonutgp", path);
	//Sound
	SoundManager.PlaySFX("SFX_Success Smooth Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}