#pragma strict
import UnityEngine.UI;
private var loadingText:String[] = [
"Rolling donuts...",
"Chewing gumdrops...",
"Calibrating sprinkles...",
"Sniffing sugar. Ahh..ahhh...ahchoo!",
"Licking...erh, moistening...donuts.",
"Twirling twizzlers...",
"Painting candy canes...",
"Crumb cleanup on Level 5!",
"Slicing cake..."
];
private var textNumber:int = 8;

function Start () {
	var randText = Random.Range(0, textNumber);
	gameObject.GetComponent.<Text>().text = loadingText[randText];
}

