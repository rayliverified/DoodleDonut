#pragma strict
import UnityEngine.UI;

public var local:GameObject;
public var global:GameObject;
public var stats:GameObject;
public var activeColor:Color;
public var inactiveColor:Color;
public var localHighScores:GameObject;
public var globalHighScores:GameObject;
public var statsScores:GameObject;

function Start () {
	global.GetComponent.<Button>().colors.normalColor = activeColor;
}

function LocalPressed () 
{
	localHighScores.SetActive(true);
	globalHighScores.SetActive(false);
	statsScores.SetActive(false);
	local.GetComponent.<Button>().colors.normalColor = activeColor;
	global.GetComponent.<Button>().colors.normalColor = inactiveColor;
	stats.GetComponent.<Button>().colors.normalColor = inactiveColor;
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function GlobalPressed () 
{
	globalHighScores.SetActive(true);
	localHighScores.SetActive(false);
	statsScores.SetActive(false);
	global.GetComponent.<Button>().colors.normalColor = activeColor;
	local.GetComponent.<Button>().colors.normalColor = inactiveColor;
	stats.GetComponent.<Button>().colors.normalColor = inactiveColor;
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function StatsPressed () 
{
	statsScores.SetActive(true);
	statsScores.GetComponent(Stats).LoadStats();
	localHighScores.SetActive(false);
	globalHighScores.SetActive(false);
	stats.GetComponent.<Button>().colors.normalColor = activeColor;
	local.GetComponent.<Button>().colors.normalColor = inactiveColor;
	global.GetComponent.<Button>().colors.normalColor = inactiveColor;
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}