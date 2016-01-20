function l(what) { 'use strict'; return document.getElementById(what); }
function updateNo(loc, no) { 'use strict';  l(loc).innerHTML = no; }

var Game = {};

Game.FPS = 60;
Game.Objects = [];
var i;

Game.Object=function(name, value) {
    'use strict'; 
    this.name = name;
    this.value = value;

    this.getValue = function() {
        return this.value;
    };

    this.setValue = function(value) {
        this.value = value;
        updateNo(this.name, this.getValue());
    };

	updateNo(name, value);

    Game.Objects.push(this);
};

for (i = 1; i <= 19; i++) {
	new Game.Object('tile' + i.toString(), i);
}

33