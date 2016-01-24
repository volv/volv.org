var testVals = [true, false, false, false, true, true, false];

console.log("%cBEGIN", "color:blue; font-size: 3vh; font-weight: bold"); //So I can see

testVals.forEach(function(val, i) {
  var trueCSS = "color:green; font-weight:900";
  var falseCSS = "color:red; font-weight:900";
  var textCSS = "color: black; text-transform: capitalize";
  
  var curResult = (val) ? "%cTrue\t%c%cTrue message woo" : "%c%cFalse\t%cFalse message arrghh";
  
  console.log(i+1 + " - " +curResult, trueCSS, falseCSS, textCSS);
});