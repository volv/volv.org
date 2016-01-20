var dist = -155
function right() {
if (dist < -4) {
right1()
}
else {
left()
}
}


function right1() {
if (dist < -4) {
dist += 4
navi.style.left = dist

setTimeout("right1()", 5)
}
else {
}
}


function left() {
if (dist > -155) {
dist -= 4
navi.style.left = dist
setTimeout("left()", 5)
}
}


function pos() {
navi.style.top = (0 + document.body.scrollTop)
setTimeout("pos()", 5)
}

if (document.images) {
time1 = new Image
time2 = new Image
sis1 = new Image
sis2 = new Image
cook1 = new Image
cook2 = new Image
loca1 = new Image
loca2 = new Image
ran1 = new Image
ran2 = new Image
mai1 = new Image
mai2 = new Image
game1 = new Image
game2 = new Image
colour1 = new Image
colour2 = new Image
time1.src = 'time.gif'
time2.src = 'time2.gif'
sis1.src = 'ss1.gif'
sis2.src = 'ss2.gif'
cook1.src = 'cook1.gif'
cook2.src = 'cook2.gif'
loca1.src = 'loc1.gif'
loca2.src = 'loc2.gif'
ran1.src = 'ran1.gif'
ran2.src = 'ran2.gif'
mai1.src = 'main1.gif'
mai2.src = 'main2.gif'
colour1.src = 'colour1.gif'
colour2.src = 'colour2.gif'
game1.src = 'game1.gif'
game2.src = 'game2.gif'
} 
setTimeout("pos()", 5)