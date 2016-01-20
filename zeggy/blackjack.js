var cash = 1000;
var bet = 10;
var deck = new Array();
var player = new Array();
var dealer = new Array();
var hide = true;
document.getElementById("bank").innerHTML ="£" + cash;
document.getElementById("bet").innerHTML ="£" +bet;


function betUp(){
	bet = bet +10;
	updateDisplay();
}
function betDown(){
	if(bet >10){
		bet = bet -10;
		updateDisplay();
	}
}
//Dealer gets his shot
//winner gets the cash
function stick(){
	hide = false;
	document.getElementById("betUp").disabled = false;
	document.getElementById("betDown").disabled = false;
	document.getElementById("hit").disabled =true;
	document.getElementById("stick").disabled =true;
	document.getElementById("go").disabled =false;
	console.log("score(dealer) = :" + score(dealer));
	while(score(dealer) < 16 && score(dealer) != 0){ //dealer hits on 15
		dealer.push(deck.pop());
		console.log("In loop :Dealer's Score: "+score(dealer));
	}
	 console.log("Your Score: "+score(player));
	 console.log("Dealer's Score: "+score(dealer));
	 if(score(player) > score(dealer)){
		cash = cash + (bet * 2);
	 }
	 if(score(player) == score(dealer)){
	 cash = cash + bet;
	 }
	 updateDisplay();
}

//deal 2 cards each
function deal(){
	hide = true;
	player.length = 0;
	dealer.length = 0;
	document.getElementById("betUp").disabled = true;
	document.getElementById("betDown").disabled = true;
	if(deck.length<10){ //not enough cards left in the deck
		shuffle();
	}
	if(cash >= bet){
		document.getElementById("go").disabled = true;
		cash = cash - bet;
		document.getElementById("bank").innerHTML ="£" + cash;
		player.push(deck.pop());
		dealer.push(deck.pop());
		player.push(deck.pop());
		dealer.push(deck.pop());
		document.getElementById("stick").disabled =false;
		document.getElementById("hit").disabled =false;
		updateDisplay();
	}
	else{
		document.getElementById("bet").innerHTML="Fuck Off";
	}
	
}

//Generate a new random deck
function shuffle(){
	deck.length = 0; //toss the cards left over
	var temp = 1;
	while(deck.length < 52){
		temp = Math.floor(Math.random()*52) + 1;
		if(deck.indexOf(temp) == -1){
			deck.push(temp);
		}
		
	}
}

function updateDisplay(){
	//empty the displays
	document.getElementById("myCards").innerHTML = " ";		
	document.getElementById("yourCards").innerHTML = " ";
	document.getElementById("bank").innerHTML ="£" + cash;
	
	//Decode Cards from numerical format
	document.getElementById("yourCards").innerHTML = decode(player);
	if(hide){
		var meh = new Array();
		meh.push(dealer[0]);
		document.getElementById("myCards").innerHTML = decode(meh);
	
	}
	else{
		document.getElementById("myCards").innerHTML = decode(dealer);
	}
	document.getElementById("bet").innerHTML = "£"+bet;
	document.getElementById("playerScore").innerHTML = score(player);
}

//Converts numerical format to cards
//takes array of numbers
//returns string of cards
function decode(hand){
	var decoded = "";
	var disp ="";
	var i = 0;	//loop index
	var j = 0;	//suit
	var k = 0;	//rank
	var c ="black";
	while(i < hand.length){
		c="black";
		disp = " ";
		j = hand.shift();
		hand.push(j);
		//hearts,spades,diamonds,clubs doesnt matter really
		
		k = j%13; //this remainder is the rank of the card REALLY should have objects and shit :(
		
		j = Math.floor(j/13) ; //this is the suit
		if( j == 0){j = "&hearts;";}
		if( j == 1){j = "&spades;";}
		if( j == 2){j = "&diams;";}
		if( j == 3){j = "&clubs;";}
		if( j == 4){j = "&hearts;";} // ace of hearts 
		//html escaped characters
		if(j =="&hearts;" || j=="&diams;"){
			c = "red";
		}
		
		if(k == 0){ 
			console.log("k == 0 this is an A j= " +j);
			disp ="A";
		}
			
		if( k > 0 && k < 10){
			//console.log("if k == 0 we should not be here: k=" +k);
			k = k + 1;
			disp = ""+ k;
		}
		else{	
			if(k==10){ disp ="J";}
			if(k==11){ disp ="Q";}
			if(k==12){ disp ="K";}
		}
		 decoded = '<font color="' + c + '">' + decoded + disp + j + "</font>";
		i ++;
	}
	
	return decoded;
}


//Pass in the hand to be scored (array of numbers)
//As blackjack we can ignore suit
//returns score of passed hand
//returns 0 when bust
function score(hand){
	//console.log("passed :" + hand.join() );
	//console.log("length:" + hand.length );
	
	var containsAces = 0;
	var i = 0;
	var score = 0;
	var temp = 0;
	temp = hand[i]%13;
	//console.log("temp == "+temp);

	while( i < hand.length){
	//console.log("made it into the loop" );
		var temp = hand[i]%13;
		if (temp == 0 ){
			containsAces = containsAces + 1;
			score = score + 11;
		}
		else {
			if (temp <10){
				score = score + temp + 1; //A is 0 so 2 will be 1 and so on
			}
			else {
				score = score +10;
			}
		}
		i++;
	}
	while(score >21 && containsAces){
	console.log("in the containsAces loop containsAces= "+containsAces);
		containsAces = containsAces -1;
		score = score - 10;
	}
		
	
	//console.log("Score == " + score);
	if(score >21){
		return 0;
	}
	return score;
	
}
	
function hit(){
	player.push(deck.pop());
	console.log("player hit");
	console.log("player score :" + score(player));
	
	if(score(player) ==0 ){
		stick();
	}
	updateDisplay();
}
