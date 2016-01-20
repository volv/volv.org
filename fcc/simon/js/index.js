"use strict";
$(document).ready(function() {

  //Strict Mode on off
  $("#btnstrict").on("click", toggleStrict);

  //OnOff Switch
  $(".togglebtn").on("click", toggleOnOffSwitch);
  $(".togglearea").on("click", toggleOnOffSwitch);

  //Start button
  $("#btnstart").on("click", startPlay);

  //Gameplay coloured buttons
  $(".simonbtn").on("mousedown", function(e) {
    e.preventDefault();
    if (playerTurn) doPress( $(this).attr("id"), "player" ); 
  });

  $(".simonbtn").on("mouseup", function() {
    if (playerTurn) lightOff( $(this).attr("id") );
  });
  
  $(".simonbtn").on("mouseout", function() {
    if (playerTurn) lightOff( $(this).attr("id") );
  });

  var MOVES_FOR_WIN = 20;

  var colours = ["red", "blue", "yellow", "green"]; //Used for indexing into sounds and picking random colour
  
  var lights = [ //Store Lights as name onstate offstate - used for light switching
    ["red", "red", "darkred"],
    ["blue", "blue", "darkblue"],
    ["yellow", "yellow", "darkyellow"],
    ["green", "green", "darkgreen"],
    ["btnstrict", "on", "off"],
  ];

  var ssStart = new Audio('http://www.volv.org/fcc/simon/ssstart.mp3');
  var ssStop = new Audio('http://www.volv.org/fcc/simon/ssstop.mp3');
  var ssWin = new Audio('http://www.volv.org/fcc/simon/sswin.mp3');
  var ssClick = new Audio('http://www.volv.org/fcc/simon/ssclick.mp3');
  var ssWrong = new Audio('http://www.volv.org/fcc/simon/sswrong.mp3');
  var ss1 = new Audio('http://www.volv.org/fcc/simon/ss1.mp3');
  var ss2 = new Audio('http://www.volv.org/fcc/simon/ss2.mp3');
  var ss3 = new Audio('http://www.volv.org/fcc/simon/ss3.mp3');
  var ss4 = new Audio('http://www.volv.org/fcc/simon/ss4.mp3');
  var sounds = [ss1, ss2, ss3, ss4];

  var gameOn = false; //Game physically switched on?
  var strictOn = false; //Strict function on?
  var runCount = 1; //How many notes should computer play
  var gamePlaying = false; //Actually playing game
  var playerTurn = false; // Is the players turn?

  var compChoice = []; // Array of comp picks
  var currentNote = 0; // Which note to check player choice against

  var curInterval = 800; // Game Speed

  var playerTimeout = 0; // Waiting for player input
  var compTimeout = 0; // Computer doing its thing
  var genericTimeout = 0; //Misc

  
  function turnOff() { // AKA Reset
    doLights("all", "off");
    updateCounter("");
    stopSounds();
    ssStop.play();
    
    resetGameplayVars();

    gameOn = false;
    strictOn = false;
  }

  //So I can do it on win too
  function resetGameplayVars() {
    runCount = 1;
    gamePlaying = false;
    playerTurn = false;

    compChoice = [];
    currentNote = 0;    

    curInterval = 800;

    clearTimeout(playerTimeout);
    clearTimeout(compTimeout);
    clearTimeout(genericTimeout);
    playerTimeout = 0;
    compTimeout = 0;
    genericTimeout = 0;
  }

  function turnOn() {
    gameOn = true;
    stopSounds();
    ssStart.play();
    updateCounter("--");
  }

  //Universal light changer. Swanky.
  function doLights(which, state) {
    if (!gameOn) //Just in case
      return;
    
    if (which === "all") { // Change every light to state
      $.each(lights, function(index) {
        changeLight(index);
      });
    } //which == all
    else { // Change only passed light
      var index = -1;

      $.each(lights, function(i) { //Find index of passed light
        if (lights[i][0] === which)
          index = i;
      });
      
      if (index === -1) { console.log("Error - Non existant Light"); return; } //Error detection ftw
      
      changeLight(index);
      
    }

    function changeLight(index) {
      if (state === "off") {
        $("#" +lights[index][0]).removeClass(lights[index][1] + " " + lights[index][2]);
        $("#" +lights[index][0]).addClass(lights[index][2]);
      } 
      if (state === "on") {
        $("#" +lights[index][0]).removeClass(lights[index][1] + " " + lights[index][2]);
        $("#" +lights[index][0]).addClass(lights[index][1]);
      }
      if (state === "toggle") {
        $("#" +lights[index][0]).toggleClass(lights[index][1] + " " + lights[index][2]);
      }
    } // changeLight
  }

  function toggleOnOffSwitch(event) {
    $(".togglebtn").toggleClass("pull-left pull-right");
    event.stopPropagation();

    if (gameOn)
      turnOff();
    else 
      turnOn();
  }

  function toggleStrict() {
    if (!gameOn) // But not if game isn't turned on
      return;

    stopSounds();
    ssClick.play();
    strictOn = !strictOn;
    $("#btnstrict").toggleClass("on off");
  }

  function lightOn(which) {
    if (!gameOn) // But not if game isn't turned on
      return;

    playSound(which);
    doLights(which, "on");

  } //lightOn

  function lightOff(which) {
    if (!gameOn) // But not if game isn't turned on
      return;

    doLights(which, "off");
  }
  
  function playSound(which) {
    sounds[colours.indexOf(which)].currentTime = 0;
    sounds[colours.indexOf(which)].play();
  }
  
  function stopSounds() {
    $.each(sounds, (i, s) => s.pause());
  }
  
  function updateCounter(str) {    
    if (parseInt(str)) {
      var string = (parseInt(str) < 10) ? "0" +str : str;
      $("#counter").val(string);
    }
    else {
      $("#counter").val(str);
    }
  }

  function startPlay() {
    if (!gameOn || gamePlaying) // But not if game isn't turned on or game in progress
      return;
    
    stopSounds();
    ssClick.play();

    gamePlaying = true;
    
    //Generate computer choices
    for (var i=0; i<MOVES_FOR_WIN; i++) {
      compChoice.push(colours[Math.floor(Math.random()*4)]);
    }

    compTurn(); //Computer goes first.
  }
  
  function startPlaySilent() {
    if (!gameOn || gamePlaying) return;
    gamePlaying = true;
    for (var i=0; i<MOVES_FOR_WIN; i++) {
      compChoice.push(colours[Math.floor(Math.random()*4)]);
    }
    compTurn(); //Computer goes first.
  }

  //All gameplay presses end up here
  function doPress(which, who) {
    if (!gameOn) //Just in case
      return;

    lightOn(which);
    
    if (who === "player") {
      playerTurn = false;
      checkPlayerTurn(which);
    }

    // Turn off light after interval (Leaving Gap between lights(*0.7))
    setTimeout(function() {
      lightOff(which);
    }, (curInterval*0.7));
    
  }

  function compTurn() {
    if (!gameOn) //Just in case
      return;

    playerTurn = false;
    var i = 0; // Counter to play as many notes as position are in runCount  

    compTimeout = setTimeout(play, curInterval); 
    
    function play() {
      updateCounter(runCount);
      doPress(compChoice[i], "comp"); //Press initial note
      i++; // Next Note
      
      if (i < runCount) { // Go again
        compTimeout = setTimeout(play, curInterval);
      }
      else { // We are Finished
        setTimeout(doPlayerTurn, 500); //Wait a bit - hand to player
      }
    } //play  

  } //compTurn

  function doPlayerTurn() {
    if (!gameOn) //Just in case
      return;

    playerTurn = true;
    playerTimeout = setTimeout(checkPlayerTurn, 3000);   
  }
  
  function checkPlayerTurn(which) {
    if (!gameOn) //Just in case
      return;

    if (which) { // If we were passed a variable
      clearTimeout(playerTimeout); // Stop timer waiting for player
      
      if (which === compChoice[currentNote]) { // Correct
        
        currentNote++; //Move to next position
        
        if (currentNote < runCount) { // Not at end of run. Await next player move
          doPlayerTurn();
        }
        else if (currentNote === MOVES_FOR_WIN) {
          gameWon();
        }
        else { //Success - Next comp move
          runCount++; // Next note please comp
          if (runCount === 5 || runCount === 9 || runCount === 13) decreaseInterval(); 
          currentNote = 0; //Reset player position
          compTurn();
        }
      }
      else {
        wrongMove();
      }

    }
    
    else {
      wrongMove();
    }
    
  } //checkPlayerTurn
  
  function wrongMove() {
    if (!gameOn) //Just in case
      return;

    playerTurn = false;
    stopSounds();
    ssWrong.play();
    flashError();
    currentNote = 0;
    
    if (strictOn) {
      resetGameplayVars(); //Start from start
      genericTimeout = setTimeout(startPlaySilent, 1000); //Wait a second. Start over
    }
    else {
      genericTimeout = setTimeout(compTurn, 1000); //Wait a second. Start over
    }
    
  }
  
  function flashError() {
    var flash = true;
    var count = 0;
    
    setTimeout(blink, 150);
    
    function blink() {
      count++;
      flash = !flash;
      if (flash)
        updateCounter("!!");
      else 
        updateCounter("");
      
      if (count < 6) {
        setTimeout(blink, 150);
      }      
    }//blink
  } //Flasherror

  function decreaseInterval() {
    curInterval *= 0.8;
  }
  
  function gameWon() {
    stopSounds();
    ssWin.play();
    
    updateCounter("--");
    resetGameplayVars();
  }

}); //Doc rdy

