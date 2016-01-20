var gameOn = true;
var playersTurn = true;
var playerPiece = "";
var compPiece = "";
var empty = "";
var victory = [];

var board = [];
var boardlookup = [];

$(document).ready(function() {
  $(".square").on("click", function() {
    var curSquare = $(this).find(">:first-child"); // Which Square
    var position = $(curSquare).attr("id"); // Which Span. Gets ID For boardlookup

    boxClick(position, "player");
  });
  

  // X or O Choice buttons
  $(".btnx").tooltip({title: "X Starts the Game", animation: false}); 
  
  $(".btnx").on("click", function() {
    $(".dialogue").css("display", "none");
    init("X"); //Player is X
  });
  
  $(".btno").on("click", function() {
    $(".dialogue").css("display", "none");
    init("O"); //Player is O
  });

  // Game Start. Initial Page Load
  showChoice();
  
});

function showChoice() {
  gameOn = false;
  $(".dialogue").css("display", "block");
}

function init(choice) {
  gameOn = true; //In progress
  playersTurn = true;
  playerPiece = choice;
  compPiece = (choice == "X") ? "O" : "X"; //Opposite of players choice.
  empty = "&nbsp;" //Hacky

  board = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
  boardlookup = ["top_left", "top_middle", "top_right", "middle_left", "middle_middle", "middle_right", "bottom_left", "bottom_middle", "bottom_right"];

  message("Player's Turn");
  
  //X Goes First
  if (playerPiece == "O") {
    playersTurn = false;
    compPlay();
  }
  
  displayBoard();
}

//Resets board to initial. Only called on init.
function displayBoard() {
  $.each(board, function(index) {
    $("#" + boardlookup[index]).parent().removeClass("crossWin noughtWin draw");
    $("#" + boardlookup[index]).removeClass("blue red crossWin noughtWin draw");
    $("#" + boardlookup[index]).html(board[index]);
  });
}

//which = span ID (no #)
//who = "player" or "comp"
function boxClick(boxname, who) {

  if (getBoxContentByName(boxname) != empty || !gameOn) { //Only if blank
    return;
  }

  if (who == "player" && playersTurn && gameOn) {

    playersTurn = false;
    message("Comps Turn");

    setBoxContentByName(boxname, playerPiece);

    if (!gameOver())
      compPlay();

  } else if (who == "comp") {

    setBoxContentByName(boxname, compPiece);

  }
}

function compPlay() {

  message("Thinking");

  setTimeout(function() { //AI Time

    var emptySquares = getEmptySquares();
    
    //TODO - Ensure unbeatable
    if (emptySquares.indexOf(4) != -1) { //Middle Square is empty take it
      boxClick(getBoxNameFromIndex(4), "comp");
    }
    else if (canWinNextMove("comp") != -1) { //We can win next move
      boxClick(getBoxNameFromIndex(canWinNextMove("comp")), "comp");  //Win
    }
    else if (canWinNextMove("player") != -1) { //Player can win next move
      boxClick(getBoxNameFromIndex(canWinNextMove("player")), "comp");  //Block
    }
    else if (getSquares(emptySquares, "corners") != -1) { //Corners Free
      var corners = getSquares(emptySquares, "corners");
      var choice = Math.floor(Math.random() * corners.length);
      boxClick(getBoxNameFromIndex(corners[choice]), "comp");
    }
    else { //Edges Free
      var edges = getSquares(emptySquares, "edges");
      var choice = Math.floor(Math.random() * edges.length);
      boxClick(getBoxNameFromIndex(edges[choice]), "comp");
    }

    if (!gameOver()) {
      playersTurn = true;
      message("Player's Turn");
    }

  }, 250) //Artificial Delay

}

function getSquares(arr, type) {
  var corners = [0, 2, 6, 8];
  var edges = [1, 3, 5, 7];
  var toCheck = (type == "corners") ? corners : edges;
  result = [];
  full = [];
  
  console.log("Input array - " +arr);
  console.log("Check against " +type+ " - " +toCheck);

  result = arr.filter(function (f) {
    if (toCheck.indexOf(f) == -1)
      return false;

    return true;
  });
  
  console.log("result = " +result);
  
  full = corners.filter(function (f) {
    if (arr.indexOf(f) != -1)
      return false;

    return true;
  });
  
  console.log("Full = " +full);

  if (result.length > 0) { //Gets messy :(
    if (type == "corners") {
      if (result.length == 2 && board[full[0]] == board[full[1]]) { //Take edge if two corners occupied by same player.
        return -1; //Special Case to break Fork.
      }
      if (result.length == 2 && board[full[0]] != board[full[1]]) { //Not same player on corners. Go opposite player.
        console.log("Two corners. Different Players");
        if (board[full[0]] == playerPiece) {
          if (full[0] == 0 && full[1] != 8) return [8];
          if (full[0] == 2 && full[1] != 6) return [6];
          if (full[0] == 6 && full[1] != 2) return [2];
          if (full[0] == 8 && full[1] != 0) return [0];
        }
        if (board[full[1]] == playerPiece) {
          if (full[1] == 0 && full[0] != 8) return [8];
          if (full[1] == 2 && full[0] != 6) return [6];
          if (full[1] == 6 && full[0] != 2) return [2];
          if (full[1] == 8 && full[0] != 0) return [0];
        }
      }
      if (result.length == 3) { //Take opposite corner if open.
        if (result.indexOf(0) == -1) return [8];
        if (result.indexOf(2) == -1) return [6];
        if (result.indexOf(6) == -1) return [2];
        if (result.indexOf(8) == -1) return [0];
      }
    }
    
    return result;
  }
  else {
    return -1;
  }
}

function canWinNextMove(who) {
  var victory = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]; // 3 in a row
  
  var pieceToCheck = (who == "comp") ? compPiece : playerPiece;

  for (var i = 0; i < victory.length; i++) {

    var box1 = getBoxContentByIndex(victory[i][0]);
    var box2 = getBoxContentByIndex(victory[i][1]);
    var box3 = getBoxContentByIndex(victory[i][2]);
    
    if (box1 == empty) {
      if (box2 != empty && box2 == box3 && box3 == pieceToCheck) {
        return victory[i][0];
      }
    }

    if (box2 == empty) {
      if (box1 != empty && box1 == box3 && box3 == pieceToCheck) {
        return victory[i][1];
      }
    }

    if (box3 == empty) {
      if (box1 != empty && box1 == box2 && box1 == pieceToCheck) {
        return victory[i][2];
      }
    }
    
  }

  return -1;
}

//Check for victory or draw
function gameOver() {
  var victory = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]; // 3 in a row
    
  for (var i = 0; i < victory.length; i++) {

    var box1 = getBoxContentByIndex(victory[i][0]);
    var box2 = getBoxContentByIndex(victory[i][1]);
    var box3 = getBoxContentByIndex(victory[i][2]);
    
    if (box1 == box2 && box1 == box3 && box1 != empty) {
      endGame (box1 + " Wins", victory[i]);
      return true;
    }
    
  }

  if (board.indexOf(empty) == -1) { // All Squares Used
    endGame("Draw");
    return true;
  }
  
  return false;
}


//Show end game message and animation
//Message determined from gameOver() check and is passed squares that triggered a win
function endGame(msg, winSquares) {

  //Win animation
  if (winSquares) {
    for (var i = 0; i < winSquares.length; i++) {
      var boxname = getBoxNameFromIndex(winSquares[i]);
      if (getBoxContentByName(boxname) == "X") {
        $("#" +boxname).parent().addClass("crossWin");
        $("#" +boxname).addClass("crossWin");
      }
      else {
        $("#" +boxname).parent().addClass("noughtWin");
        $("#" +boxname).addClass("noughtWin");
      }
    }
  }
  else { //Game is a draw Animatiom
    $.each(board, function(index) {
    $("#" + boardlookup[index]).parent().addClass("draw");
    $("#" + boardlookup[index]).addClass("draw");
    });
  }

  var overMessage = msg;
  overMessage += "<div style='width: 400px; margin: auto;'>";
  overMessage += "<p style='margin-top:10px; width:100%'>";
  overMessage += "<button class='restart pull-right'>Restart</button>";
  overMessage += "<button class='pick pull-left'>Pick Player</button></p></div>"
  message(overMessage);
  $(".restart").on("click", function() { init(playerPiece) } );
  $(".pick").on("click", function() { showChoice(); } );
  gameOn = false;
}

//Returns indexes of empty squares
function getEmptySquares() {
  result = [];

  board.map(function(m, i) {
    if (m == empty) {
      result.push(i);
    }
  });

  return result;
}

function getBoxNameFromIndex(index) {
  return boardlookup[index];
}

function getIndexFromBoxName(boxname) {
  return boardlookup.indexOf(boxname);
}

function getBoxContentByIndex(index) {
  var boxname = getBoxNameFromIndex(index);
  return getBoxContentByName(boxname);
}

function setBoxContentByIndex(index, whichPiece) {
  var boxname = getBoxNameFromIndex(index);
  setBoxContentByName(boxname, whichPiece)
}

//All setting ends up here;
function setBoxContentByName(boxname, whichPiece) {

  if (whichPiece == "X") {
    $("#" +boxname).addClass("red");
  }
  else {
    $("#" +boxname).addClass("blue");
  }

  $("#" + boxname).html(whichPiece);
  updateBoard(boxname, whichPiece); // The array
}

//All getting ends up here
function getBoxContentByName(boxname) {
  return $("#" + boxname).html();
}

//updates actual board array. Takes boxname
function updateBoard(boxname, playPiece) {
  board[getIndexFromBoxName(boxname)] = playPiece;
}

function message(str) {
  $(".info").html(str);
}

//Game Runs
//Ask for X or O
//X Goes first
//Waits for user input.
//Then conumpet stuff.
//Computer turn.
//Check board
//Win Draw?
//Repeat
//End