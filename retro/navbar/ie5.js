var front = "<DIV ID='navi' style='position: absolute; left: -155'><TABLE><TR><TD WIDTH='150' BACKGROUND='back3.jpg'><CENTER><IMG SRC='main1.gif' name='m1' onClick='do1c()' onMouseOver='do1()' onMouseOut='do1b()'><BR><IMG SRC='ss1.gif' name='s1' onClick='do2c()' onMouseOver='do2()' onMouseOut='do2b()'><BR><IMG SRC='lay1.gif' name='la1' onClick='do3c()' onMouseOver='do3()' onMouseOut='do3b()'><BR><IMG SRC='loc1.gif' name='l1' onClick='do4c()' onMouseOver='do4()' onMouseOut='do4b()'><BR><IMG SRC='colour1.gif' name='co1' onClick='do5c()' onMouseOver='do5()' onMouseOut='do5b()'><BR><IMG SRC='time.gif' name='t1' onClick='do6c()' onMouseOver='do6()' onMouseOut='do6b()'><BR><IMG SRC='ran1.gif' name='r1' onClick='do7c()' onMouseOver='do7()' onMouseOut='do7b()'><BR><IMG SRC='cook1.gif' name='c1' onClick='do8c()' onMouseOver='do8()' onMouseOut='do8b()'><BR><IMG SRC='game1.gif' name='g1' onClick='do9c()' onMouseOver='do9()' onMouseOut='do9b()'><BR></CENTER></TD>"
var back = "<TD><IMG SRC='greenled.gif' onClick='right()'><BR><IMG SRC='toolbar1.gif' onClick='right()'></TD></TR><TR><TD><IMG SRC='toolbot.gif'></TD></TR></TABLE></DIV><CENTER><MAP NAME='homemap'><AREA SHAPE=RECT COORDS='246,3,326,84' HREF='index.htm'></MAP><TABLE WIDTH='100'><TR><TD><IMG SRC='logo.gif' USEMAP='#homemap'></TD></TR></TABLE></CENTER>"

document.write(front+back)

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
setTimeout("pos()", 5)

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











function do1() {
document.m1.src = 'main2.gif'
}
function do1b() {
document.m1.src = 'main1.gif'
}
function do1c() {
location = 'index.htm'
} 


function do2() {
document.s1.src = 'ss2.gif'
}
function do2b() {
document.s1.src = 'ss1.gif'
}
function do2c() {
location = 'index1.htm'
}


function do3() {
document.la1.src = 'lay2.gif'
}
function do3b() {
document.la1.src = 'lay1.gif'
}
function do3c() {
location = 'index2.htm'
}


function do4() {
document.l1.src = 'loc2.gif'
}
function do4b() {
document.l1.src = 'loc1.gif'
}
function do4c() {
location = 'index3.htm'
}


function do5() {
document.co1.src = 'colour2.gif'
}
function do5b() {
document.co1.src = 'colour1.gif'
}
function do5c() {
location = 'index4.htm'
}


function do6() {
document.t1.src = 'time2.gif'
}
function do6b() {
document.t1.src = 'time.gif'
}
function do6c() {
location = 'index5.htm'
}


function do7() {
document.r1.src = 'ran2.gif'
}
function do7b() {
document.r1.src = 'ran1.gif'
}
function do7c() {
location = 'index6.htm'
}


function do8() {
document.c1.src = 'cook2.gif'
}
function do8b() {
document.c1.src = 'cook1.gif'
}
function do8c() {
location = 'index7.htm'
}


function do9() {
document.g1.src = 'game2.gif'
}
function do9b() {
document.g1.src = 'game1.gif'
}
function do9c() {
location = 'index8.htm'
}