import SoundManager;

public var m_HeaderImage:GUIAnim;
public var m_PauseMenu:GUIAnim;
public var m_EndScreen:GUIAnim;
public var m_LoadingScreen:GUIAnim;
public var m_StatMenu:GUIAnim;
public var m_NameInput:GUIAnim;
public var m_CoffeeMenu:GUIAnim;
public var m_CoffeeSave:GUIAnim;
public var m_CoffeePurchased:GUIAnim;
public var m_ChallengeMenu:GUIAnim;
public var m_ChallengeCompleted:GUIAnim;
public var m_EmailInput:GUIAnim;
public var m_CreditsMenu:GUIAnim;
public var m_MessageMenu:GUIAnim;
public var m_FreeCoffeeMenu:GUIAnim;

// GUIAnim objects of TopLeft buttons
//var m_TopLeft_A : GUIAnim;
//var m_TopLeft_B : GUIAnim;

// GUIAnim objects of BottomLeft buttons
//var m_BottomLeft_A : GUIAnim;
//var m_BottomLeft_B : GUIAnim;

// GUIAnim objects of RightBar buttons
//var m_RightBar_A : GUIAnim;
//var m_RightBar_B : GUIAnim;
//var m_RightBar_C : GUIAnim;

// Toggle state of TopLeft, BottomLeft and BottomLeft buttons
protected var m_PauseMenu_IsOn:boolean = true;
protected var m_HeaderImage_IsOn:boolean = true;
protected var m_BottomLeft_IsOn : boolean= false;
protected var m_RightBar_IsOn : boolean= false;
protected var m_StatMenu_IsOn:boolean = true;
protected var m_NameInput_IsOn:boolean = true;
	
// ######################################################################
// MonoBehaviour Functions
// ######################################################################
	
// Use this for initialization
function Awake () {
	if(enabled)
	{
			GUIAnimSystem.Instance.m_AutoAnimation = false;
	}
}

// Use this for initialization
function Start () {
//	// MoveIn m_TopBar and m_BottomBar
//	m_TopBar.MoveIn(eGUIMove.SelfAndChildren);
//	m_BottomBar.MoveIn(eGUIMove.SelfAndChildren);
//
//	// MoveIn m_Title1 and m_Title2
//	StartCoroutine(MoveInTitleGameObjects());
//
//	// Disable all scene switch buttons
//	GUIAnimSystem.Instance.SetGraphicRaycasterEnable(m_Canvas, false);
}
	
// ######################################################################
// MoveIn/MoveOut functions
// ######################################################################

function MoveInHeaderImage ()
{
	m_HeaderImage.MoveIn(eGUIMove.SelfAndChildren);
}

function MoveOutHeaderImage ()
{
	if (m_HeaderImage_IsOn)
	{
		m_HeaderImage.MoveOut(eGUIMove.SelfAndChildren);
		m_HeaderImage_IsOn = false;
	}
}

function MoveInPauseMenu ()
{
	if (m_PauseMenu_IsOn)
	{
		m_PauseMenu.MoveIn(eGUIMove.SelfAndChildren);
		m_PauseMenu_IsOn = false;
		//Sound
		SoundManager.PlaySFX("SFX_Bubble Pop Burp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
		SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
	}		
}

function MoveOutPauseMenu ()
{
	if(m_PauseMenu_IsOn != true)
	{
		m_PauseMenu.MoveOut(eGUIMove.SelfAndChildren);
		m_PauseMenu_IsOn = true;
		//Sound
		SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
		SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
	}
}

function MoveInStatMenu ()
{
	if (m_StatMenu_IsOn)
	{
		m_StatMenu.MoveIn(eGUIMove.SelfAndChildren);
		m_StatMenu_IsOn = false;
		//Sound
		SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}		
}

function MoveOutStatMenu ()
{
	if(m_StatMenu_IsOn != true)
	{
		m_StatMenu.MoveOut(eGUIMove.SelfAndChildren);
		m_StatMenu_IsOn = true;
		//Sound
		SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
}

function MoveInNameInput ()
{
	if (m_NameInput_IsOn)
	{
		m_NameInput.MoveIn(eGUIMove.SelfAndChildren);
		m_NameInput_IsOn = false;
		//Sound
		SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
		SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}		
}

function MoveOutNameInput ()
{
	if(m_NameInput_IsOn != true)
	{
		m_NameInput.MoveOut(eGUIMove.SelfAndChildren);
		m_NameInput_IsOn = true;
		//Sound
		SoundManager.PlaySFX("SFX_Success Smooth Reverb", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
		SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	}
}

function MoveInCoffeeMenu ()
{
	m_CoffeeMenu.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("Loop_Morning Coffee Mix Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.OnlyDuckMusic, 0f, 1f);	
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
}
function MoveOutCoffeeMenu ()
{
	m_CoffeeMenu.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.StopSFX();
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);        	
}

function MoveInCoffeeSave ()
{
	m_CoffeeSave.MoveIn(eGUIMove.SelfAndChildren);	
	//Sends message to CoffeeStore.js to update variables
	var coffeePurchased = GameObject.Find("CoffeeStore");
	coffeePurchased.GetComponent(CoffeeStore).UpdateCoffee();
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutCoffeeSave ()
{
	m_CoffeeSave.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInEndScreen ()
{
	m_EndScreen.MoveIn(eGUIMove.SelfAndChildren);	
}

function MoveInLoadingScreen ()
{
	m_LoadingScreen.MoveIn(eGUIMove.SelfAndChildren);
}

function MoveInCoffeePurchased (id:int)
{
	m_CoffeePurchased.MoveIn(eGUIMove.SelfAndChildren);
	//Sends message to CoffeeStore.js to update variables
	var coffeePurchased = GameObject.Find("CoffeeStore");
	coffeePurchased.GetComponent(CoffeeStore).UpdateCoffee();
	coffeePurchased.GetComponent(CoffeeStore).UpdateText(id);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutCoffeePurchased ()
{
	m_CoffeePurchased.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Success Smooth Upbeat", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInChallengeMenu ()
{
	m_ChallengeMenu.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutChallengeMenu ()
{
	m_ChallengeMenu.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInChallengeCompleted ()
{
	m_ChallengeCompleted.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutChallengeCompleted ()
{
	m_ChallengeCompleted.MoveOut(eGUIMove.SelfAndChildren);//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInEmailInput ()
{
	m_EmailInput.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutEmailInput ()
{
	m_EmailInput.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Success Smooth Reverb", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInCreditsMenu ()
{
	m_CreditsMenu.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutCreditsMenu ()
{
	m_CreditsMenu.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveInMessageMenu ()
{
	m_MessageMenu.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutMessageMenu ()
{
	m_MessageMenu.MoveOut(eGUIMove.SelfAndChildren);
	Time.timeScale = 1;
	PlayerMove.alive = true;
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}
function MoveInFreeCoffeeMenu ()
{
	m_FreeCoffeeMenu.MoveIn(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Bubble Pop Wurp", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
	SoundManager.PlaySFX("SFX_Paper Whoosh In", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

function MoveOutFreeCoffeeMenu ()
{
	m_FreeCoffeeMenu.MoveOut(eGUIMove.SelfAndChildren);
	//Sound
	SoundManager.PlaySFX("SFX_Paper Whoosh Out Short", false, 0f, 1f, 1f, Vector3.zero, null, SoundDuckingSetting.DoNotDuck, 0f, 1f);
}

// MoveIn m_Title1 and m_Title2
//function MoveInTitleGameObjects () : IEnumerator {
//	yield WaitForSeconds(1.0f);
//
//	// MoveIn m_Title1 and m_Title2
//	m_Title1.MoveIn(eGUIMove.Self);
//	m_Title2.MoveIn(eGUIMove.Self);
//	
//	// MoveIn all primary buttons
//	StartCoroutine(MoveInPrimaryButtons());
//}
//
//// MoveIn all primary buttons
//function MoveInPrimaryButtons () : IEnumerator {
//	yield  WaitForSeconds(1.0f);
//
//	// MoveIn all primary buttons
//	m_BottomLeft_A.MoveIn(eGUIMove.Self);
//	m_RightBar_A.MoveIn(eGUIMove.Self);
//
//	// Enable all scene switch buttons
//	StartCoroutine(EnableAllDemoButtons());
//}
//
//function ActivateButton ()
//{
//	m_TopLeft_A.MoveIn(eGUIMove.Self);		
//}
//function DeactivateButton ()
//{
//	m_TopLeft_A.MoveOut(eGUIMove.Self);		
//}
//// MoveOut all primary buttons
//function HideAllGUIs () {
//	m_TopLeft_A.MoveOut(eGUIMove.SelfAndChildren);
//	m_BottomLeft_A.MoveOut(eGUIMove.SelfAndChildren);
//	m_RightBar_A.MoveOut(eGUIMove.Self);
//	
//	if(m_TopLeft_IsOn == true)
//		m_TopLeft_B.MoveOut(eGUIMove.SelfAndChildren);
//	if(m_BottomLeft_IsOn == true)
//		m_BottomLeft_B.MoveOut(eGUIMove.SelfAndChildren);
//	if(m_RightBar_IsOn == true)
//		m_RightBar_B.MoveOut(eGUIMove.SelfAndChildren);
//	
//	// MoveOut m_Title1 and m_Title2
//	StartCoroutine(HideTitleTextMeshes());
//}
//
//// MoveOut m_Title1 and m_Title2
//function HideTitleTextMeshes () : IEnumerator {
//	yield  WaitForSeconds(1.0f);
//
//	// MoveOut m_Title1 and m_Title2
//	m_Title1.MoveOut(eGUIMove.Self);
//	m_Title2.MoveOut(eGUIMove.Self);
//	
//	// MoveOut m_TopBar and m_BottomBar
//	m_TopBar.MoveOut(eGUIMove.SelfAndChildren);
//	m_BottomBar.MoveOut(eGUIMove.SelfAndChildren);
//}
//	
//// ######################################################################
//// Enable/Disable button functions
//// ######################################################################
//
//// Enable/Disable all scene switch Coroutine
//function EnableAllDemoButtons () : IEnumerator {
//	yield  WaitForSeconds(1.0f);
//	
//	// Enable all scene switch buttons
//	GUIAnimSystem.Instance.SetGraphicRaycasterEnable(m_Canvas, true);
//}
//
//// Disable all buttons for a few seconds
//function DisableButtonForSeconds ( GO : GameObject ,   DisableTime : float  ) : IEnumerator {
//	// Disable all buttons
//	GUIAnimSystem.Instance.EnableButton(GO.transform, false);
//	
//	yield  WaitForSeconds(DisableTime);
//	
//	// Enable all buttons
//	GUIAnimSystem.Instance.EnableButton(GO.transform, true);
//}
//	
//// ######################################################################
//// Button handler functions
//// ######################################################################
//
//function OnButton_TopLeft () {
//	// Disable m_TopLeft_A, m_RightBar_A, m_RightBar_C, m_BottomLeft_A for a few seconds
//	StartCoroutine(DisableButtonForSeconds(m_TopLeft_A.gameObject, 0.3f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_A.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_C.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_BottomLeft_A.gameObject, 0.3f));
//
//	// Toggle m_TopLeft
//	ToggleTopLeft();
//
//	// Toggle other buttons
//	if(m_BottomLeft_IsOn==true)
//	{
//		ToggleBottomLeft();
//	}
//	if(m_RightBar_IsOn==true)
//	{
//		ToggleRightBar();
//	}
//}
//
//function OnButton_BottomLeft () {
//	// Disable m_TopLeft_A, m_RightBar_A, m_RightBar_C, m_BottomLeft_A for a few seconds
//	StartCoroutine(DisableButtonForSeconds(m_TopLeft_A.gameObject, 0.3f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_A.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_C.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_BottomLeft_A.gameObject, 0.3f));
//
//	// Toggle m_BottomLeft
//	ToggleBottomLeft();
//	
//	// Toggle other buttons
//	if(m_TopLeft_IsOn==true)
//	{
//		ToggleTopLeft();
//	}
//	if(m_RightBar_IsOn==true)
//	{
//		ToggleRightBar();
//	}
//	
//}
//
//function OnButton_RightBar () {
//	// Disable m_TopLeft_A, m_RightBar_A, m_RightBar_C, m_BottomLeft_A for a few seconds
//	StartCoroutine(DisableButtonForSeconds(m_TopLeft_A.gameObject, 0.3f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_A.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_RightBar_C.gameObject, 0.6f));
//	StartCoroutine(DisableButtonForSeconds(m_BottomLeft_A.gameObject, 0.3f));
//
//	// Toggle m_RightBar
//	ToggleRightBar();
//	
//	// Toggle other buttons
//	if(m_TopLeft_IsOn==true)
//	{
//		ToggleTopLeft();
//	}
//	if(m_BottomLeft_IsOn==true)
//	{
//		ToggleBottomLeft();
//	}
//
//}
//	
//// ######################################################################
//// Toggle button functions
//// ######################################################################
//
//// Toggle TopLeft buttons
//function ToggleTopLeft () {
//	m_TopLeft_IsOn = !m_TopLeft_IsOn;
//	if(m_TopLeft_IsOn==true)
//	{
//		// m_TopLeft_B moves in
//		m_TopLeft_B.MoveIn(eGUIMove.SelfAndChildren);
//	}
//	else
//	{
//		// m_TopLeft_B moves out
//		m_TopLeft_B.MoveOut(eGUIMove.SelfAndChildren);
//	}
//}
//
//// Toggle BottomLeft buttons
//function ToggleBottomLeft () {
//	m_BottomLeft_IsOn = !m_BottomLeft_IsOn;
//	if(m_BottomLeft_IsOn==true)
//	{
//		// m_BottomLeft_B moves in
//		m_BottomLeft_B.MoveIn(eGUIMove.SelfAndChildren);
//	}
//	else
//	{
//		// m_BottomLeft_B moves out
//		m_BottomLeft_B.MoveOut(eGUIMove.SelfAndChildren);
//	}
//}
//
//// Toggle RightBar buttons
//function ToggleRightBar () {
//	m_RightBar_IsOn = !m_RightBar_IsOn;
//	if(m_RightBar_IsOn==true)
//	{
//		// m_RightBar_A moves out
//		m_RightBar_A.MoveOut(eGUIMove.SelfAndChildren);
//		// m_RightBar_B moves in
//		m_RightBar_B.MoveIn(eGUIMove.SelfAndChildren);
//	}
//	else
//	{
//		// m_RightBar_A moves in
//		m_RightBar_A.MoveIn(eGUIMove.SelfAndChildren);
//		// m_RightBar_B moves out
//		m_RightBar_B.MoveOut(eGUIMove.SelfAndChildren);
//	}
//}