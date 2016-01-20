/*global numeral*/
var cookies = 0;
var rate = 0;

function l(what) { 'use strict'; return document.getElementById(what); }
function niceNo(num) { 'use strict';  return numeral(Math.floor(num)).format('0,0'); }
function updateNo(loc, no) { 'use strict';  l(loc).innerHTML = niceNo(no); }

var Game = {};

Game.FPS = 60;
Game.Rate = 0; 
Game.Objects = [];

Game.Object=function(name,desc,icon,basePrice,baseCPS) {
    'use strict'; 
    this.name = name;
    this.desc = desc;
    this.icon = icon;
    this.basePrice = basePrice;
    this.baseCPS = baseCPS;
    this.amount = 0;

    this.getCost = function() {
        return Math.floor(this.basePrice * Math.pow(1.1,this.amount));
    };

    this.buy = function() {
        if(cookies >= this.getCost()) {
            cookies -= this.getCost();
            this.amount++;
            updateNo(this.name+'Count', this.amount);  //updates the number of cursors for the user
            updateNo(this.name+'Cost', this.getCost());
            rate += this.baseCPS;
        }
    };

    Game.Objects[this.name] = this;
    return this; 
};

new Game.Object('cursor','Clicks a bit', 'cursor.png', 10, 1);
new Game.Object('cursor2','Clicks a bit more', 'cursor.png', 100,  10);
new Game.Object('cursor3','Clicks the mostest', 'cursor.png', 1000, 100);

var interval = (1000/Game.FPS);
var before = new Date();

window.setInterval(function(){
    'use strict';
    var now = new Date(),
        elapsedTime = (now.getTime() - before.getTime());

    //Recover the motion lost while inactive.
    cookies += (elapsedTime/1000*rate);
    updateNo('cookies',cookies);
    updateNo('rate', rate);

    before = new Date();   

}, interval);

