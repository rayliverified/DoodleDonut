#pragma strict

public var uianimator:GameObject;
public var challengeImage:GameObject;
public var challengeTitle:GameObject;
public var challengeDetails:GameObject;
private var challengeSprites:Sprite[];
private var loadingTitle:String[] = [
"Lose 1 Lbs",
"Lose 3 Lbs",
"Lose 6 Lbs",
"Lose 10 Lbs",
"Lose 15 Lbs",
"Lose 21 Lbs",
"Lose 28 Lbs",
"Lose 36 Lbs",
"Lose 45 Lbs",
"Lose 55 Lbs",
"Lose 66 Lbs",
"Lose 78 Lbs",
"Donuteer Initiate",
"Donuteer Novice",
"Donuteer Cadet",
"Donuteer Specialist",
"Donuteer Professional",
"Expert Donuteer",
"Master Donuteer",
"Master Donuteer Supreme",
"Donuteer Legend",
"Taste of Coffee",
"Flavor of Coffee",
"Coffee Sipper",
"Coffee Drinker",
"Coffee Regular",
"Coffee Addict",
"Coffee Connoisseur",
"Coffee Fanatic",
"Coffee Is Life",
"Secret #1",
"Secret #2",
"Secret #3"
];
private var loadingDetails:String[] = [
"Few get off the couch. You did!",
"You found your jumping shoes. Nice!",
"One small jump for man (or woman)...",
"This jumper's got wings! Amazing!",
"Junior Jump Champion of the World!",
"Your new name is Mr. Jumptastic!",
"You are the new star of Harlem Jump-trotters!",
"Tom Hanks plays you in Forest Jump!",
"You took home the Olympic Jumping Gold!",
"You are inducted into the Jump Hall of Fame!",
"Your jump lands on the moon! Dazzling!",
"You are a jump legend! Spectacular!",
"Play 10 games.",
"Play 20 games.",
"Play 30 games.",
"Play 50 games.",
"Play 75 games.",
"Play 100 games.",
"Play 150 games.",
"Play 200 games.",
"Play 300 games.",
"Drink 1 coffee.",
"Drink 5 coffees.",
"Drink 10 coffees.",
"Drink 20 coffees.",
"Drink 30 coffees.",
"Drink 40 coffees.",
"Drink 55 coffees.",
"Drink 75 coffees.",
"Drink 100 coffees.",
"You discovered the Donut Maker!",
"You discovered A. Grande!",
"Thanks! You are a SuperStar!"
];

function Start () {
	challengeSprites = Resources.LoadAll.<Sprite>("ChallengeTrophies");
}

function ChallengeCompleted (id:int)
{
	challengeImage.GetComponent.<Image>().sprite = challengeSprites[id]; //Set image
	challengeTitle.GetComponent.<Text>().text = loadingTitle[id]; //Set title
	challengeDetails.GetComponent.<Text>().text = loadingDetails[id]; //Set details
	//Mark challenge as completed
	var challengeArray:int[] = PlayerPrefsX.GetIntArray("challenges");
	challengeArray[id] = 1;
	PlayerPrefsX.SetIntArray("challenges", challengeArray);
	
	uianimator.GetComponent(UIAnimator).MoveInChallengeCompleted();
	//Sound
	SoundManager.PlaySFX(SoundManager.LoadFromGroup("Achievement"), false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DuckAll, 0f, 1f);
}
//"$25 sweepstakes unlocked! Great job!",
//"Sweepstakes entries doubled! Sweet!",
//"Quadruple sweepstakes entries! Hooray!",
//"$100 sweepstakes unlocked! Impressive!",
//"Sweepstakes entries doubled! Sweet!",
//"Quadruple sweepstakes entries! Hooray!",
//"$500 sweepstakes unlocked! Spectacular!",
//"Sweepstakes entries doubled! Sweet!",
//"Quadruple sweepstakes entries! Hooray!",
//"$2000 sweepstakes unlocked! Unbelievable!",
//"Sweepstakes entries doubled! Sweet!",
//"Quadruple sweepstakes entries! Hooray!",