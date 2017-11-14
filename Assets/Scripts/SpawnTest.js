#pragma strict

public var donut01:GameObject;
private var donut01Offset:float = 5.46;
public var donut02:GameObject;
private var donut02Offset:float = 5.31;
public var donut02_1:GameObject;
private var donut02_1Offset:float = 5.46;
public var donut03:GameObject;
private var donut03Offset:float = 5.36;
public var donut04:GameObject;
private var donut04Offset:float = 5.46;
public var donut05:GameObject;
private var donut05Offset:float = 5.46;
public var donut06:GameObject;
private var donut06Offset:float = 5.46;
public var donut07:GameObject;
private var donut07Offset:float = 5.46;
public var floorBottom:GameObject;
public var floorLLPLL:GameObject;
public var floorLLP:GameObject;
public var floorPLL:GameObject;
public var floorLPMP:GameObject;
public var floorLPP:GameObject;
public var floorLPSP:GameObject;
public var floorPLP:GameObject;
public var floorPMPL:GameObject;
public var floorPPL:GameObject;
public var floorPSPL:GameObject;
public var floorLPMPL:GameObject;
public var floorLPPL:GameObject;
public var floorLPSPL:GameObject;
public var floorPPP:GameObject;
public var coffeeCollect:GameObject;
private var floorOffset:float = 4.8;
public var wallBounce:GameObject;
private var wallOffset:float = 5.7;
private var wallPosition:float;
private var counter:float = 0;
public var background:GameObject;
private var backgroundDistance:float;
public var swipe:GameObject;
private var swipeBoolean:boolean = true;
public var tilt:GameObject;
private var tiltBoolean:boolean = true;
public static var blockCounter:int;
private var mediumFloor:GameObject[];
private var levelRandomize:int[];
private var restart;
private var relativeTime:float;
private var weightLevel:int;
private var coffeeCollected:boolean;
private var continueCount:int;

function Start() {
	restart = PlayerPrefs.GetInt("restart");
	if (restart == 1)
	{
		blockCounter = PlayerPrefs.GetFloat("blockCounter");
		continueCount = PlayerPrefs.GetInt("continueCount");
		RestartBlock();
		//Sound
		SoundManager.PlaySFX("SFX_Drinking Slurping Ah Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
	else
	{
		continueCount = 0;
		SoundManager.PlaySFX("Loop_Forward And Backward Intro", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.OnlyDuckMusic, 0f, 1f);
		blockCounter = 1; 	
	}
	WeightLevel(); //Sets difficulty level based on Player weight
	relativeTime = Time.time; //Time counter for swipe hand
	backgroundDistance = background.GetComponent.<Renderer>().bounds.size.y; //Creates background
	Instantiate(background, Vector2(0, backgroundDistance), Quaternion.identity);
	AddMediumFloor(); //Populates Medium Floor Array
	LevelRandomize(); //Generates random integers for random level each time
	coffeeCollected = false;
}
function Update() {
	if (counter >= blockCounter) //Starts generation of new block set after last block has spawned and activated
	{
		switch (weightLevel)
{
case 0:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			easyFloorRand();
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8)
		{
			CoffeeCollect();
		}
break;
case 1:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 12)
		{
			wall();
			easyFloorRand();
			Donut1Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 12)
		{
			CoffeeCollect();
		}
break;
case 2:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			easyFloorRand();
			Donut1Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 18)
		{
			wall();
			easyFloorRand();
			Donut1Chance(3);
			Donut2Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 18)
		{
			CoffeeCollect();
		}
break;
case 3:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			easyMediumFloorRand(4);
			Donut1Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 14)
		{
			wall();
			easyMediumFloorRand(4);
			Donut1Chance(3);
			Donut2Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 14 && CameraTrack.positionLock <= 20)
		{
			wall();
			easyFloorRand();
			Donut3Chance(3);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 20 && CameraTrack.positionLock <= 26)
		{
			wall();
			easyFloorRand();
			switch (levelRandomize[0])
			{
				case 0: case 1:
					Donut1Chance(3);
					Donut3Chance(3);
					break;
				case 2: case 3:
					Donut2Chance(2);
					Donut3Chance(3);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 26)
		{
			CoffeeCollect();
		}
break;
case 4:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			easyMediumFloorRand(3);
			switch (levelRandomize[0])
			{
				case 0: case 1:
					Donut1Chance(2);
					Donut2Chance(3);
					break;
				case 2: case 3:
					Donut3Chance(3);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 16)
		{
			wall();
			easyFloorRand();
			Donut4Chance(12);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 16 && CameraTrack.positionLock <= 24)
		{
			wall();
			easyMediumFloorRand(3);
			switch (levelRandomize[1])
			{
				case 0: case 1:
					Donut1Chance(2);
					Donut4Chance(12);
					break;
				case 2: case 3:
					Donut3Chance(3);
					Donut4Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 24 && CameraTrack.positionLock <= 34)
		{
			wall();
			easyMediumFloorRand(2);
			switch (levelRandomize[2])
			{
				case 0: case 1:
					Donut1Chance(3);
					Donut3Chance(3);
					Donut4Chance(10);
					break;
				case 2: case 3:
					Donut3Chance(2);
					Donut4Chance(6);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 34)
		{
			CoffeeCollect();
		}
break;
case 5:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			easyMediumFloorRand(3);
			switch (levelRandomize[0])
			{
				case 0:
					Donut1Chance(2);
					Donut2Chance(3);
					break;
				case 1:
					Donut2Chance(1);
					Donut3Chance(3);
					break;
				case 2:
					Donut1Chance(2);
					Donut4Chance(8);
					break;
				case 3:
					Donut3Chance(3);
					Donut4Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 14)
		{
			wall();
			Donut5Chance(12);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 14 && CameraTrack.positionLock <= 20)
		{
			wall();
			Donut5Chance(8);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 20 && CameraTrack.positionLock <= 26)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					Donut1Chance(2);
					Donut5Chance(8);
					break;
				case 1:
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2: 
					Donut3Chance(3);
					Donut5Chance(10);
					break;
				case 3:
					Donut4Chance(8);
					Donut5Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 26 && CameraTrack.positionLock <= 34)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					Donut1Chance(4);
					Donut2Chance(4);
					Donut5Chance(12);
					break;
				case 1:
					easyMediumFloorRand(4);
					Donut1Chance(4);
					Donut3Chance(4);
					Donut4Chance(12);
					break;
				case 2:
					Donut2Chance(3);
					Donut3Chance(4);
					Donut5Chance(12);
					break;
				case 3:
					Donut4Chance(10);
					Donut5Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 34 && CameraTrack.positionLock <= 39)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					Donut1Chance(3);
					Donut2Chance(3);
					Donut5Chance(12);
					break;
				case 1:
					easyMediumFloorRand(3);
					Donut1Chance(3);
					Donut3Chance(3);
					Donut4Chance(12);
					break;
				case 2:
					Donut2Chance(3);
					Donut3Chance(3);
					Donut5Chance(12);
					break;
				case 3:
					Donut4Chance(8);
					Donut5Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 39 && CameraTrack.positionLock <= 42)
		{
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					Donut1Chance(2);
					Donut2Chance(3);
					Donut5Chance(10);
					break;
				case 1:
					easyMediumFloorRand(2);
					Donut1Chance(2);
					Donut3Chance(3);
					Donut4Chance(10);
					break;
				case 2:
					Donut2Chance(2);
					Donut3Chance(3);
					Donut5Chance(10);
					break;
				case 3:
					Donut4Chance(6);
					Donut5Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 42)
		{
			CoffeeCollect();
		}
break;
case 6:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 13)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					Donut1Chance(3);
					Donut3Chance(3);
					Donut5Chance(16);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(3);
					Donut5Chance(16);
					break;
				case 2:
					Donut3Chance(2);
					Donut4Chance(10);
					Donut5Chance(16);
					break;
				case 3:
					Donut1Chance(2);
					Donut4Chance(12);
					Donut5Chance(16);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 13 && CameraTrack.positionLock <= 21)
		{
			wall();
			easyFloorRand();
			Donut6Chance(12);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 21 && CameraTrack.positionLock <= 26)
		{
			wall();
			easyMediumFloorRand(3);
			Donut6Chance(8);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 26 && CameraTrack.positionLock <= 29)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					easyMediumFloorRand(2);
					Donut2Chance(2);
					Donut6Chance(8);
					break;
				case 1:
					easyMediumFloorRand(2);
					Donut3Chance(2);
					Donut6Chance(10);
					break;
				case 2:
					easyMediumFloorRand(2);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				case 3:
					Donut5Chance(10);
					Donut6Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 29 && CameraTrack.positionLock <= 42)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					easyMediumFloorRand(2);
					Donut1Chance(4);
					Donut2Chance(4);
					Donut6Chance(8);
					break;
				case 1:
					easyMediumFloorRand(2);
					Donut1Chance(4);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				case 2:
					Donut3Chance(4);
					Donut5Chance(10);
					Donut6Chance(8);
					break;
				case 3:
					easyMediumFloorRand(2);
					Donut3Chance(4);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 42 && CameraTrack.positionLock <= 50)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					easyMediumFloorRand(1);
					Donut1Chance(3);
					Donut2Chance(3);
					Donut6Chance(8);
					break;
				case 1:
					easyMediumFloorRand(1);
					Donut1Chance(3);
					Donut4Chance(6);
					Donut6Chance(8);
					break;
				case 2:
					Donut3Chance(3);
					Donut5Chance(8);
					Donut6Chance(8);
					break;
				case 3:
					Donut2Chance(3);
					Donut5Chance(8);
					Donut6Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 50 && CameraTrack.positionLock <= 55)
		{
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					easyMediumFloorRand(1);
					Donut1Chance(3);
					Donut2Chance(2);
					Donut6Chance(6);
					break;
				case 1:
					easyMediumFloorRand(1);
					Donut1Chance(3);
					Donut4Chance(6);
					Donut6Chance(6);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut6Chance(6);
					break;
				case 3:
					Donut2Chance(2);
					Donut5Chance(8);
					Donut6Chance(6);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 55 && CameraTrack.positionLock <= 58)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					easyHardFloorRand(3);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut6Chance(4);
					break;
				case 1:
					easyMediumFloorRand(1);
					Donut1Chance(2);
					Donut4Chance(4);
					Donut6Chance(4);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(6);
					Donut6Chance(4);
					break;
				case 3:
					Donut2Chance(2);
					Donut5Chance(6);
					Donut6Chance(4);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 58)
		{
			CoffeeCollect();
		}
break;
case 7:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 13)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					easyMediumFloorRand(4);
					Donut1Chance(2);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				case 1:
					easyMediumFloorRand(4);
					Donut3Chance(4);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				case 2:
					Donut3Chance(4);
					Donut5Chance(16);
					Donut6Chance(10);
					break;
				case 3:
					Donut4Chance(10);
					Donut5Chance(16);
					Donut6Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 13 && CameraTrack.positionLock <= 21)
		{
			wall();
			easyMediumFloorRand(4);
			Donut7Chance(16);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 21 && CameraTrack.positionLock <= 26)
		{
			wall();
			easyMediumFloorRand(3);
			Donut7Chance(12);
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 26 && CameraTrack.positionLock <= 29)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					easyMediumFloorRand(2);
					Donut3Chance(3);
					Donut7Chance(8);
					break;
				case 1:
					easyMediumFloorRand(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				case 2:
					Donut5Chance(12);
					Donut7Chance(8);
					break;
				case 3:
					easyMediumFloorRand(2);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 29 && CameraTrack.positionLock <= 44)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					mediumHardFloorRand(4);
					Donut1Chance(4);
					Donut4Chance(10);
					Donut7Chance(12);
					break;
				case 1:
					Donut3Chance(4);
					Donut5Chance(12);
					Donut7Chance(12);
					break;
				case 2:
					mediumHardFloorRand(4);
					Donut4Chance(10);
					Donut6Chance(10);
					Donut7Chance(12);
					break;
				case 3:
					Donut5Chance(12);
					Donut6Chance(10);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 44 && CameraTrack.positionLock <= 55)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					mediumHardFloorRand(4);
					Donut1Chance(3);
					Donut4Chance(8);
					Donut7Chance(10);
					break;
				case 1:
					Donut3Chance(3);
					Donut5Chance(10);
					Donut7Chance(10);
					break;
				case 2:
					mediumHardFloorRand(4);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(10);
					break;
				case 3:
					Donut5Chance(10);
					Donut6Chance(8);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 55 && CameraTrack.positionLock <= 62)
		{
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				case 1:
					Donut3Chance(2);
					Donut5Chance(10);
					Donut7Chance(8);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut4Chance(8);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				case 3:
					Donut5Chance(10);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 62 && CameraTrack.positionLock <= 67)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut4Chance(6);
					Donut7Chance(6);
					break;
				case 1:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut7Chance(6);
					break;
				case 2:
					mediumHardFloorRand(2);
					Donut4Chance(6);
					Donut6Chance(6);
					Donut7Chance(6);
					break;
				case 3:
					Donut5Chance(8);
					Donut6Chance(6);
					Donut7Chance(6);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 67)
		{
			CoffeeCollect();
		}
break;
case 8:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					mediumHardFloorRand(4);
					Donut1Chance(2);
					break;
				case 1:
					mediumHardFloorRand(4);
					Donut3Chance(3);
					break;
				case 2:
					mediumHardFloorRand(4);
					Donut6Chance(8);
					break;
				case 3:
					mediumHardFloorRand(4);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 13)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					mediumHardFloorRand(4);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(4);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(4);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(4);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 13 && CameraTrack.positionLock <= 16)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(4);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 16 && CameraTrack.positionLock <= 29)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					mediumHardFloorRand(4);
					Donut1Chance(1);
					Donut2Chance(2);
					break;
				case 1:
					mediumHardFloorRand(4);
					Donut3Chance(2);
					Donut2Chance(2);
					break;
				case 2:
					mediumHardFloorRand(4);
					Donut6Chance(6);
					Donut2Chance(2);
					break;
				case 3:
					mediumHardFloorRand(4);
					Donut7Chance(8);
					Donut2Chance(2);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 29 && CameraTrack.positionLock <= 37)
		{	
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(16);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(16);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 37 && CameraTrack.positionLock <= 42)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 42 && CameraTrack.positionLock <= 45)
		{
			wall();
			switch (levelRandomize[6])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(1);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(1);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(6);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut4Chance(6);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 45 && CameraTrack.positionLock <= 58)
		{
			wall();
			switch (levelRandomize[7])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(12);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(12);
					Donut7Chance(12);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut4Chance(12);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 58 && CameraTrack.positionLock <= 66)
		{	
			wall();
			switch (levelRandomize[8])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(10);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(10);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(10);
					Donut7Chance(10);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut4Chance(10);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 66 && CameraTrack.positionLock <= 71)
		{
			wall();
			switch (levelRandomize[9])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 71 && CameraTrack.positionLock <= 74)
		{
			wall();
			switch (levelRandomize[10])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(1);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(1);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(1);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 74)
		{
			CoffeeCollect();
		}
break;
case 9:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(2);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(3);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(8);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 13)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 13 && CameraTrack.positionLock <= 16)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(4);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 16 && CameraTrack.positionLock <= 31)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					break;
				case 1:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut2Chance(2);
					break;
				case 2:
					mediumHardFloorRand(2);
					Donut6Chance(6);
					Donut2Chance(2);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut7Chance(8);
					Donut2Chance(2);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 31 && CameraTrack.positionLock <= 44)
		{	
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(16);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(16);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 44 && CameraTrack.positionLock <= 52)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					mediumHardFloorRand(1);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(1);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 52 && CameraTrack.positionLock <= 57)
		{
			wall();
			switch (levelRandomize[6])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(1);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(1);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(6);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					hardFloorRand();
					Donut4Chance(6);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 57 && CameraTrack.positionLock <= 70)
		{
			wall();
			switch (levelRandomize[7])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(12);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(12);
					Donut7Chance(12);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(12);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 70 && CameraTrack.positionLock <= 78)
		{	
			wall();
			switch (levelRandomize[8])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(10);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(10);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(10);
					Donut7Chance(10);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(10);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 78 && CameraTrack.positionLock <= 83)
		{
			wall();
			switch (levelRandomize[9])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 83 && CameraTrack.positionLock <= 86)
		{
			wall();
			switch (levelRandomize[10])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(1);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(1);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(1);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 86)
		{
			CoffeeCollect();
		}
break;
case 10:
		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 8)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(2);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(3);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(8);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 8 && CameraTrack.positionLock <= 13)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 13 && CameraTrack.positionLock <= 16)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(4);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 16 && CameraTrack.positionLock <= 29)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					break;
				case 1:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut2Chance(2);
					break;
				case 2:
					mediumHardFloorRand(2);
					Donut6Chance(6);
					Donut2Chance(2);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut7Chance(8);
					Donut2Chance(2);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 29 && CameraTrack.positionLock <= 37)
		{	
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(16);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(16);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 37 && CameraTrack.positionLock <= 42)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					mediumHardFloorRand(1);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(1);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 42 && CameraTrack.positionLock <= 45)
		{
			wall();
			switch (levelRandomize[6])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(1);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(1);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(6);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					hardFloorRand();
					Donut4Chance(6);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 45 && CameraTrack.positionLock <= 58)
		{
			wall();
			switch (levelRandomize[7])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(12);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(12);
					Donut7Chance(12);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(12);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 58 && CameraTrack.positionLock <= 66)
		{	
			wall();
			switch (levelRandomize[8])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(10);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(10);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(10);
					Donut7Chance(10);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(10);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 66 && CameraTrack.positionLock <= 71)
		{
			wall();
			switch (levelRandomize[9])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 71 && CameraTrack.positionLock <= 73)
		{
			wall();
			switch (levelRandomize[10])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(1);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(1);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(1);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 73 && CameraTrack.positionLock <= 86)
		{
			wall();
			switch (levelRandomize[11])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(2);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(2);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(4);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 86 && CameraTrack.positionLock <= 94)
		{	
			wall();
			switch (levelRandomize[12])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(3);
					Donut7Chance(12);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(3);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 94 && CameraTrack.positionLock <= 99)
		{
			wall();
			switch (levelRandomize[13])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(3);
					Donut7Chance(10);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(2);
					Donut7Chance(10);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(3);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 99 && CameraTrack.positionLock <= 102)
		{
			wall();
			switch (levelRandomize[14])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(2);
					Donut7Chance(8);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(1);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(2);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock > 102)
		{
			CoffeeCollect();
		}
break;
case 11: case 12:
		var continueCountCounter = continueCount * 112;
		if (CameraTrack.positionLock - continueCountCounter > 0 && CameraTrack.positionLock - continueCountCounter <= 8)
		{
			wall();
			switch (levelRandomize[0])
			{
				case 0:
					easyMediumFloorRand(3);
					Donut1Chance(3);
					break;
				case 1:
					easyMediumFloorRand(3);
					Donut3Chance(4);
					break;
				case 2:
					easyMediumFloorRand(3);
					Donut6Chance(10);
					break;
				case 3:
					easyMediumFloorRand(3);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
			coffeeCollected = false;
		}
		if (CameraTrack.positionLock - continueCountCounter > 8 && CameraTrack.positionLock - continueCountCounter <= 13)
		{
			wall();
			switch (levelRandomize[1])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 13 && CameraTrack.positionLock - continueCountCounter <= 16)
		{
			wall();
			switch (levelRandomize[2])
			{
				case 0:
					mediumHardFloorRand(3);
					Donut1Chance(1);
					Donut1Chance(1);
					break;
				case 1:
					mediumHardFloorRand(3);
					Donut3Chance(2);
					Donut3Chance(2);
					break;
				case 2:
					mediumHardFloorRand(3);
					Donut6Chance(6);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(3);
					Donut7Chance(4);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 16 && CameraTrack.positionLock - continueCountCounter <= 31)
		{
			wall();
			switch (levelRandomize[3])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					break;
				case 1:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut2Chance(2);
					break;
				case 2:
					mediumHardFloorRand(2);
					Donut6Chance(6);
					Donut2Chance(2);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut7Chance(8);
					Donut2Chance(2);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 31 && CameraTrack.positionLock - continueCountCounter <= 42)
		{	
			wall();
			switch (levelRandomize[4])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(16);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(16);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 42 && CameraTrack.positionLock - continueCountCounter <= 49)
		{
			wall();
			switch (levelRandomize[5])
			{
				case 0:
					mediumHardFloorRand(1);
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(2);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(8);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					mediumHardFloorRand(1);
					Donut4Chance(8);
					Donut6Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 49 && CameraTrack.positionLock - continueCountCounter <= 54)
		{
			wall();
			switch (levelRandomize[6])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut3Chance(1);
					break;
				case 1:
					Donut2Chance(2);
					Donut3Chance(1);
					Donut5Chance(12);
					break;
				case 2:
					Donut4Chance(6);
					Donut5Chance(12);
					Donut6Chance(6);
					break;
				case 3:
					hardFloorRand();
					Donut4Chance(6);
					Donut6Chance(6);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 54 && CameraTrack.positionLock - continueCountCounter <= 67)
		{
			wall();
			switch (levelRandomize[7])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(12);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(12);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(12);
					Donut7Chance(12);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(12);
					Donut7Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 67 && CameraTrack.positionLock - continueCountCounter <= 75)
		{	
			wall();
			switch (levelRandomize[8])
			{
				case 0:
					mediumHardFloorRand(2);
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(10);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(10);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(10);
					Donut7Chance(10);
					break;
				case 3:
					mediumHardFloorRand(2);
					Donut3Chance(2);
					Donut4Chance(10);
					Donut7Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 75 && CameraTrack.positionLock - continueCountCounter <= 80)
		{
			wall();
			switch (levelRandomize[9])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(2);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(2);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(2);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(2);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 80 && CameraTrack.positionLock - continueCountCounter <= 83)
		{
			wall();
			switch (levelRandomize[10])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut2Chance(2);
					Donut7Chance(8);
					break;
				case 1:
					Donut1Chance(1);
					Donut2Chance(2);
					Donut5Chance(8);
					break;
				case 2:
					Donut3Chance(1);
					Donut5Chance(8);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(1);
					Donut4Chance(8);
					Donut7Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 83 && CameraTrack.positionLock - continueCountCounter <= 96)
		{
			wall();
			switch (levelRandomize[11])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(2);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(2);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(4);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 96 && CameraTrack.positionLock - continueCountCounter <= 104)
		{	
			wall();
			switch (levelRandomize[12])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(4);
					Donut7Chance(12);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(3);
					Donut7Chance(12);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(3);
					Donut4Chance(12);
					Donut6Chance(12);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 104 && CameraTrack.positionLock - continueCountCounter <= 109)
		{
			wall();
			switch (levelRandomize[13])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(3);
					Donut7Chance(10);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(2);
					Donut7Chance(10);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(3);
					Donut4Chance(10);
					Donut6Chance(10);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 109 && CameraTrack.positionLock - continueCountCounter <= 112)
		{
			wall();
			switch (levelRandomize[14])
			{
				case 0:
					hardFloorRand();
					Donut1Chance(1);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				case 1:
					hardFloorRand();
					Donut1Chance(1);
					Donut3Chance(2);
					Donut7Chance(8);
					break;
				case 2:
					hardFloorRand();
					Donut2Chance(2);
					Donut3Chance(1);
					Donut7Chance(8);
					break;
				case 3:
					hardFloorRand();
					Donut3Chance(2);
					Donut4Chance(8);
					Donut6Chance(8);
					break;
				default:
					break;
			}
			blockCounter += 1;
		}
		if (CameraTrack.positionLock - continueCountCounter > 112)
		{
			CoffeeCollectContinue();
			blockCounter += 2;
		}
break;
//		if (CameraTrack.positionLock > 37 && CameraTrack.positionLock <= 42)
//		{
//			wall();
//			easyMediumFloorRand(3);
//			Donut2Chance(2);
//			Donut3Chance(1);
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 42 && CameraTrack.positionLock <= 50)
//		{
//			wall();
//			easyMediumFloorRand(2);
//			switch (levelRandomize[0])
//			{
//				case 0:
//					Donut1Chance(2);
//					Donut4Chance(10);
//					break;
//				case 1: 
//					Donut2Chance(3);
//					Donut4Chance(10);
//					break;
//				case 2:
//					Donut3Chance(3);
//					Donut4Chance(10);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 50 && CameraTrack.positionLock <= 55)
//		{
//			wall();
//			easyMediumFloorRand(1);
//			switch (levelRandomize[1])
//			{
//				case 0:
//					Donut1Chance(3);
//					Donut4Chance(8);
//					break;
//				case 1: 
//					Donut4Chance(2);
//					Donut4Chance(8);
//					break;
//				case 2:
//					Donut3Chance(3);
//					Donut4Chance(8);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 55 && CameraTrack.positionLock <= 58)
//		{
//			wall();
//			easyMediumFloorRand(1);
//			switch (levelRandomize[2])
//			{
//				case 0:
//					Donut1Chance(1);
//					Donut4Chance(4);
//					break;
//				case 1: 
//					Donut2Chance(3);
//					Donut4Chance(4);
//					break;
//				case 2:
//					Donut3Chance(2);
//					Donut4Chance(4);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 58)
//		{
//			CoffeeCollect();
//		}
//		if (CameraTrack.positionLock > 58 && CameraTrack.positionLock <= 66)
//		{
//			wall();
//			easyMediumFloorRand(1);
//			switch (levelRandomize[2])
//			{
//				case 0:
//					Donut1Chance(1);
//					Donut4Chance(4);
//					break;
//				case 1: 
//					Donut2Chance(3);
//					Donut4Chance(4);
//					break;
//				case 2:
//					Donut3Chance(2);
//					Donut4Chance(4);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//  Donut 05
//	wall();	
//	Donut5Chance(12);
//	blockCounter += 1;
}
	}
	if (CameraTrack.positionLock > counter) 
	{
		counter = CameraTrack.positionLock;
	}
	if (CameraTrack.absolutePositionLock == 1 && tiltBoolean == true && restart != 1) 
	{
		Instantiate(tilt, Vector2(0, 1.04), Quaternion.Euler(0, 0, 15));
		tiltBoolean = false;
	}
	if (Time.time > relativeTime + 1.5f && swipeBoolean == true && restart != 1)
	{
		Instantiate(swipe, Vector2(0.75, -4), Quaternion.identity);
		swipeBoolean = false;
	}
}
function testBlock ()
{
	wall();
	easyFloorRand();
	Donut6Chance(8);
	blockCounter += 1;
}
function WeightLevel ()
{
	var currentWeight = PlayerPrefs.GetFloat("weightTotal");
	if (currentWeight < 119)
	{
		weightLevel = 1;
	}
	if (currentWeight < 117)
	{
		weightLevel = 2;
	}
	if (currentWeight < 114)
	{
		weightLevel = 3;
	}
	if (currentWeight < 110)
	{
		weightLevel = 4;
	}
	if (currentWeight < 105)
	{
		weightLevel = 5;
	}
	if (currentWeight < 99)
	{
		weightLevel = 6;
	}
	if (currentWeight < 92)
	{
		weightLevel = 7;
	}
	if (currentWeight < 84)
	{
		weightLevel = 8;
	}
	if (currentWeight < 75)
	{
		weightLevel = 9;
	}
	if (currentWeight < 65)
	{
		weightLevel = 10;
	}
	if (currentWeight < 54)
	{
		weightLevel = 11;
	}
	if (currentWeight < 42)
	{
		weightLevel = 12;
	}
	if (currentWeight >= 119)
	{
		weightLevel = 0;
	}
}
function CoffeeCollect ()
{
	if (coffeeCollected == false)
	{
		for (var i = 0; i < 2; i++)
		{
			Instantiate(floorBottom, Vector2(0, 4.78 + (i + blockCounter)*1.5), Quaternion.identity);
			Instantiate(wallBounce, Vector2(0, 4.18 + (i + blockCounter)*1.5), Quaternion.identity);
		}
		Instantiate(coffeeCollect, Vector2(0, 8.5 + (blockCounter)*1.5), Quaternion.identity);
		coffeeCollected = true;
	}
}
function CoffeeCollectContinue ()
{
	if (coffeeCollected == false)
	{
		for (var i = 0; i < 2; i++)
		{
			Instantiate(floorBottom, Vector2(0, 4.78 + (i + blockCounter)*1.5), Quaternion.identity);
			Instantiate(wallBounce, Vector2(0, 5.68 + (i + blockCounter)*1.5), Quaternion.identity);
		}
		Instantiate(coffeeCollect, Vector2(0, 7 + (blockCounter)*1.5), Quaternion.identity);
		continueCount = continueCount + 1;
		PlayerPrefs.SetInt("continueCount", continueCount);
		coffeeCollected = true;
	}
}
function Donut1Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate == 0)
	{
		Donut1();
	}
}
function Donut2Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate == 0)
	{
		Donut2();
	}
}
function Donut3Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate == 0)
	{
		Donut3();
	}
}
function Donut4Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate < 4)
	{
		Donut4();
	}
}
function Donut5Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate < 4)
	{
		Donut5();
	}
	else 
	{
		easyEasyFloorRand();
	}
}
function Donut6Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate < 4)
	{
		Donut6();
	}
}
function Donut7Chance(chance:int)
{
	var randInstantiate = Random.Range(0, chance);
	if (randInstantiate < 4)
	{
		Donut7();
	}
}
function wall()
{
	Instantiate(wallBounce, Vector2(0, wallOffset + blockCounter*1.5), Quaternion.identity);
}

//DONUTS
function Donut1()
{
	var randPosX = Random.Range(-1.74, 1.74);
	Instantiate(donut01, Vector2(randPosX, donut01Offset + blockCounter*1.5), Quaternion.identity);
}
function Donut2()
{
	var randInstantiate = Random.Range(0,2);
	var randPosX = Random.Range(0, 2) < 0.5 ? -1 : 1;
	if (randInstantiate == 0)
	{
		Instantiate(donut02, Vector2(randPosX * 1.8, donut02Offset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		Instantiate(donut02_1, Vector2(randPosX * 1.8, donut02_1Offset + blockCounter*1.5), Quaternion.identity);
	}
}
function Donut3()
{
	var randPosX = Random.Range(-2.3, 2.3);
	Instantiate(donut03, Vector2(randPosX, donut03Offset + blockCounter*1.5), Quaternion.identity);
}
function Donut4()
{
	var randPosX = Random.Range(-2.2, 2.2);
	Instantiate(donut04, Vector2(randPosX, donut04Offset + blockCounter*1.5), Quaternion.identity);
}
function Donut5()
{
	var randPosX = Random.Range(-1.2, 1.2);
	if (randPosX < 0)
	{
		Instantiate(floorLLP, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
		Instantiate(donut05, Vector2(randPosX, donut05Offset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		Instantiate(floorPLL, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
		Instantiate(donut05, Vector2(randPosX, donut05Offset + blockCounter*1.5), Quaternion.identity);
	}
}
function Donut6()
{
	var randPosX = Random.Range(-2.2, 2.2);
	Instantiate(donut06, Vector2(randPosX, donut06Offset + blockCounter*1.5), Quaternion.identity);
}
function Donut7()
{
	var randPosX = Random.Range(-2.2, 2.2);
	Instantiate(donut07, Vector2(randPosX, donut07Offset + blockCounter*1.5), Quaternion.identity);
}

//FLOORS
function RestartBlock ()
{
	for (var i = 0; i < 9; i++)
	{
		Instantiate(floorBottom, Vector2(0, -5.72 + (i + blockCounter)*1.5), Quaternion.identity);
		Instantiate(wallBounce, Vector2(0, -4.82 + (i + blockCounter)*1.5), Quaternion.identity);
	}
	blockCounter = blockCounter + 2;
}
function easyFloorRand()
{
	var randPosX = Random.Range(-1.74, 1.74);
	Instantiate(floorLLPLL, Vector2(randPosX, floorOffset + blockCounter*1.5), Quaternion.identity);
}
function easyEasyFloorRand()
{
	var randInstantiate = Random.Range(0, 2);
	if (randInstantiate == 0)
	{
		Instantiate(floorLLP, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		Instantiate(floorPLL, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
}
function easyMediumFloorRand(chance:int)
{
	var myRandomIndex = Random.Range(0, 7); //Selects 1 of 7 medium floors
	var randInstantiate = Random.Range(0, chance); //1 in x chance of medium floor
	if (randInstantiate == 0)
	{
		Instantiate(mediumFloor[myRandomIndex], Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		var randPosX = Random.Range(-1.74, 1.74);
		Instantiate(floorLLPLL, Vector2(randPosX, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
}
function easyHardFloorRand(chance:int)
{
	var randInstantiate = Random.Range(0, chance); //1 in x chance of hard floor
	if (randInstantiate == 0)
	{
		Instantiate(floorPPP, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		var randPosX = Random.Range(-1.74, 1.74);
		Instantiate(floorLLPLL, Vector2(randPosX, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
}
function mediumHardFloorRand(chance:int)
{
	var myRandomIndex = Random.Range(0, 7); //Selects 1 of 7 medium floors
	var randInstantiate = Random.Range(0, chance); //1 in x chance of hard floor
	if (randInstantiate == 0)
	{
		Instantiate(floorPPP, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
	else
	{
		Instantiate(mediumFloor[myRandomIndex], Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
	}
}
function hardFloorRand()
{
	Instantiate(floorPPP, Vector2(0, floorOffset + blockCounter*1.5), Quaternion.identity);
}
function AddMediumFloor()
{
	mediumFloor = new GameObject[7];
	mediumFloor[0] = floorLPMP;
	mediumFloor[1] = floorLPP;
	mediumFloor[2] = floorLPSP;
	mediumFloor[3] = floorPLP;
	mediumFloor[4] = floorPMPL;
	mediumFloor[5] = floorPPL;
	mediumFloor[6] = floorPSPL;
}
function LevelRandomize()
{
	levelRandomize = new int[100];
	for (var i = 0; i < 100; i++)
	{
		var randInt = Random.Range(0, 4);
		levelRandomize[i] = randInt;
	}
}
//case 4:
//		if (CameraTrack.positionLock > 0 && CameraTrack.positionLock <= 14)
//		{
//			wall();
//			easyMediumFloorRand(3);
//			switch (levelRandomize[0])
//			{
//				case 0: case 1:
//					Donut1Chance(3);
//					Donut2Chance(3);
//					break;
//				case 2: case 3:
//					Donut1Chance(3);
//					Donut3Chance(3);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 14 && CameraTrack.positionLock <= 28)
//		{
//			wall();
//			easyMediumFloorRand(3);
//			switch (levelRandomize[1])
//			{
//				case 0: case 1:
//					Donut1Chance(3);
//					break;
//				case 2: case 3:
//					Donut3Chance(3);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 28 && CameraTrack.positionLock <= 42)
//		{
//			wall();
//			easyMediumFloorRand(3);
//			switch (levelRandomize[2])
//			{
//				case 0:
//					Donut1Chance(2);
//					Donut2Chance(2);
//					break;
//				case 1:
//					Donut2Chance(1);
//					Donut3Chance(3);
//					break;
//				case 2:
//					Donut1Chance(3);
//					Donut3Chance(2);
//					break;
//				case 3:
//					Donut1Chance(1);
//					Donut2Chance(3);
//					break;
//				default:
//					break;
//			}
//			blockCounter += 1;
//		}
//		if (CameraTrack.positionLock > 42)
//		{
//			CoffeeCollect();
//		}
//break;