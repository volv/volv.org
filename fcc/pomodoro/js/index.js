reset();
$(".timer").one("click", start);
$("#resetTimer").on("click", reset);

var TIMER_SIZE = 200;

var fillPos; // 200 = empty. 0 = full.
var secondsElapsed;
var secondsFull;
var timer;
var lap; //Session time in minutes
var gap; //Gap time in minutes
var isSession = true;

function toggleGap() { //starts at green
  $(".timer").toggleClass("greenBack");
  $(".timer").toggleClass("redBack");
}

function updateTimer() {
  fillPos = 200 - ((secondsElapsed / secondsFull) * TIMER_SIZE);
  $(".timer").css({"background-position": "0px " +fillPos+ "px"});
  $(".timeDisplay").html(formatTime(secondsFull-secondsElapsed));
}

function formatTime(secs) {
  var hours = Math.floor(secs / 3600);
  var mins = Math.floor((secs / 60) % 60);
  var secs = secs % 60;

  var startOfResult = (hours > 0) ? "" +hours+ ":" : "";
  var midResult = (mins < 10) ? "0" : "";
  var endOfResult = (secs > 9) ? "" +mins+ ":" +secs : "" +mins+ ":0" +secs;
  result = startOfResult + midResult + endOfResult; 
  return result;
}

function timerTick(time) {

  if (secondsElapsed < secondsFull) {
    secondsElapsed += 1;
  }
  else {
    isSession = !isSession;
    toggleGap();
    updateLengths();
    secondsElapsed = 0;
    
    if (isSession) {
      $(".sessionDisplay").css("color", "green");
      $(".sessionDisplay").html("Session");
    }
    else {
      $(".sessionDisplay").css("color", "white");
      $(".sessionDisplay").html("Gap");
    }
    
  }
  
  updateTimer();

  timer = setTimeout(timerTick, 1000);
  
}

function start() {
  timerTick();
  
  $(".promptDisplay").css("color", "white");
  $(".promptDisplay").html("Pause");
  
  $( ".controlcon" ).slideToggle( "slow", function() {
    // Animation complete.
  });
  
  $(".timer").one("click", stop)
}

function stop() {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
  
  $( ".controlcon" ).slideToggle( "slow", function() {
    // Animation complete.
  });
  
  $(".promptDisplay").css("color", "green");
  $(".promptDisplay").html("Start");
  
  $(".timer").one("click", start)
}

function reset() {
  fillPos = 200; // 200 = empty. 0 = full.
  secondsElapsed = 0;
  timer = 0;
  lap = $("#sessionTime").html();
  gap = $("#breakTime").html();

  if (isSession == false) toggleGap(); // Puts back to green back.

  isSession = true;
  secondsFull = (isSession) ? lap*60 : gap*60;
  
  $(".promptDisplay").css("color", "green");
  $(".promptDisplay").html("Start");
  
  $(".timeDisplay").html(formatTime(secondsFull-secondsElapsed));
  
  $(".sessionDisplay").css("color", "green");
  $(".sessionDisplay").html("Session");
  
  updateLengths();
  updateTimer();

}

function updateLengths() {
  $("#breakTime").html(gap);
  $("#sessionTime").html(lap);
  secondsFull = (isSession) ? lap*60 : gap*60;
  $(".timeDisplay").html(formatTime(secondsFull-secondsElapsed));
  updateTimer();
}

$("#breakMinus").on("click", function() {
  if (timer != 0) { //If not paused
    return;
  }
  
  if (gap > 1) {
    gap--;
  }
  
  updateLengths();
});

$("#breakPlus").on("click", function() {
  if (timer != 0) { //If not paused
    return;
  }
  
  if (gap < 999) {
    gap++;
  }
  
  updateLengths();
});

$("#sessionMinus").on("click", function() {
  if (timer != 0) { //If not paused
    return;
  }
  
  if (lap > 1) {
    lap--;
  }
  
  updateLengths();
});

$("#sessionPlus").on("click", function() {
  if (timer != 0) { //If not paused
    return;
  }
  
  if (lap < 999) {
    lap++;
  }

  updateLengths();
});