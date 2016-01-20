var screen = [];
var calcExpression = [];
var curOp = "?";
var lastOp = "?";
var lastScreen = [];
var dotPressed=false;
var calcJustDone = false;
var SCREEN_SIZE=10;
var doDebug = false;
var onFirstDigit = true;

bugOut("Things to try:", false, true);
bugOut("", false, true);
bugOut("100 / 3", false, true);
bugOut("1.001 + 0.001", false, true);
bugOut("Do a sum. Then hit equals a lot.", false, true);
bugOut("Digit Operator Digit Operator", false, true);
bugOut("Try CE vs AC", false, true);
bugOut("Try huge numbers", false, true);
bugOut("Try % Operator in place of = Operator", false, true);

$(".cbut").click(function() {
    numPress($(this).html());
});

function numPress(num) {

    $(".calcDisplay").removeClass("faded");
    
    switch (num) {
        case "AC":
        clearAll();
        break;
        case "CE":
        if (calcJustDone) clearAll();
        clearScreen();
        break;
        case "÷":
        case "x":      
        case "-":
        case "+":
        pushOp(num);
        dotPressed=false;
        onFirstDigit = true;
        break;
        case "%":
        switch(curOp) {
            case "+":
            case "-":
            screen = toArr((getNo(screen) / 100)*getNo(calcExpression[0]));
            break;
            case "÷":
            screen = toArr(getNo(screen)/100);
            break;
            case "x":
            screen = toArr(getNo(screen)/100);
            break;
        }
        
        calcResult();
        dotPressed=false;
        break;
        case "=":
        calcResult();
        dotPressed=false;
        break;
        case ".":
        if (dotPressed)  return;
      if (onFirstDigit || calcJustDone) screen =[0]; // Add leading 0 to decimal as first input 
      if (!screen) 
        dotPressed = true;
    default:
      //If Stack full & op empty & calcJustDone -> clear Stack. calcJustDone = false - OR just clearALL.
      if ((calcExpression[0]) && (curOp == "?") && (calcJustDone)) {
        calcExpression[0] = [];
        calcJustDone = false;
    }

    addToScreen(num);
    onFirstDigit = false;
}

}

function clearAll() {
    screen = [];
    calcExpression = [];
    curOp = "?";
    lastOp = "?";
    dotPressed=false;
    calcJustDone=false;
    onFirstDigit = true;
    updateDisplay();
  //bugOut("", true);
}

function clearScreen() {
    screen = [];
    updateDisplay();
}

function addToScreen(num) {

    if (screen.length < SCREEN_SIZE) 
        screen.push(num);
    
    updateDisplay();
}

function pushOp(num) {

    if (calcExpression[0] && screen[0]) { curOp = num; calcResult(true); curOp = num; return; } //If theres something on the stack and on screen then calc result now. Preserve Operator.

    if (curOp == "?") { //No operator
        bugOut("pushOp. Operator DOES NOT already exist - Store Number - " +curOp, false);
        curOp = num; //Make it exist
        calcExpression[0] = (calcExpression[0]) ? calcExpression[0] :screen; //If no number on stack. put screen on stack.
        screen = []; // Empty but don't clear screen
    }
    else { 
        if (!onFirstDigit) { //Chain sums - but not on first digit. Also means I can press (num * / +) and only have last op count
            bugOut("pushOp. Operator DOES INDEED already exist - Do Calc - " +curOp, false);
            calcResult();
        }
        else {
            bugOut("pushOp. Operator DOES INDEED already exist - No Calc - Preserve latest OP - " +num, false);
            curOp = num; //Make last op count.
        }
    }
}

function calcResult(useLastOp) {
    var result = 0;
    var opToUse;
    
    if (lastOp =="?") {bugOut("lastOp EMPTY"); lastOp = curOp;}

    opToUse = (useLastOp) ? lastOp : curOp;
    if (useLastOp) { bugOut("Using Last OP!"); }

  firstNo = getNo(calcExpression[0]); // Stored No
  secondNo = getNo(screen); // Screen
  
  bugOut("firstNo - " +firstNo+ ", secondNo - " +secondNo+ ", curOp - " +curOp, false);
  
  switch(opToUse) { //1e10 fixes float issues up t 10 places.
    case "÷":
    result = (firstNo/secondNo);
    break;
    case "x":      
    result = (firstNo*secondNo);
    break;
    case "-":
    result = (firstNo*1e10-secondNo*1e10)/1e10;
    break;
    case "+":
    result = (firstNo*1e10+secondNo*1e10)/1e10;
    break;
    case "?": // Repeat last calc if equals is pressed with nothing else.
    result = result;
    screen = lastScreen;
    curOp = lastOp;
    calcResult();
    return;
}

  lastScreen = screen; // Save screen for equals repeat
  
  screen = toArr(result); //to format screen expects
  calcExpression[0] = screen; // Stack now has result on it
  
  calcJustDone = true;
  updateDisplay(); //Output result

  screen = [];
  lastOp = curOp;
  curOp = "?";

  bugOut("Calculation done. Operator removed. Screen variable emptied. Result Showing.", false)
}

function getNo(arr) {
    result = 0;
    result = parseFloat(arr.join(""));
    return (result) ? result : 0;
}

function toArr (num) {
    result = [];
    
    num.toString().split("").map(function(m) {
        result.push(m);
    });
    
    return result;
}

function updateDisplay() {
    result = "";
    var fullString;

    fullString = screen.join("");

    bugOut("NUMBER BEFORE - " +fullString);
    
    if (fullString.length <= SCREEN_SIZE) {
        result = fullString;
    }
    else {
        result = parseFloat(fullString).toPrecision(SCREEN_SIZE-5).toString();
        
    if (result.indexOf("e") == -1) { // If not exponent. Display full
        result = parseFloat(fullString).toPrecision(SCREEN_SIZE).toString();
    }
    
    if ( (parseFloat(fullString) >= 1e100) || (parseFloat(fullString) <= 1e-100) ) {
        result = "FIZZBUZZ"; 
    }
}

result = result.slice(0, 10);


  if (calcJustDone) { //Only after calc - leave user alone.
    if (result.indexOf(".")!= -1) { //Trim Zeroes off of decimals.
        while (result[result.length-1] == "0") {
            result = result.slice(0, result.length-1);
        }
      if (result[result.length-1] == ".") { //Remove trailing decimal.
        result = result.slice(0, result.length-1);
    }
}
}

result = (result=="") ? "0" : result;

$(".calcDisplay").html(result);
}

function bugOut(error, clear, override) {
    if (clear)
        $(".debug").html("");
    
    if (doDebug || override)
        $(".debug").html($(".debug").html() + "<br>" + error);
}

/*
Number = add number to screen if pos.

Operator
  Store number [or result]
  Store operator 
  Clear screen variable
  Number = add number to screen if pos
  Operator = evaluate. Screen + Old screen. Place Result
  Store 2nd Operator.
  Repeat
  
Equals = Evaluate.
CE = clear screen. Keep Stuff
AC = clear all
*/