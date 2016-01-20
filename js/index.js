var projects = [
{
  "heading": "FreeCodeCamp",
  "src": "http://volv.org/images/screens/frontenddev.jpg",
  "href": "http://volv.org/fcc/frontendcert/",
  "title": "Front End Dev",
  "skills": "Certification",
  "date" : "18/12/2015 16:23:23"
},
{
  "heading": "Simon",
  "src": "http://volv.org/images/screens/simon.jpg",
  "href": "http://volv.org/fcc/simon/",
  "title": "Beat Stage 20 To Win",
  "skills": "HTML, jQuery, CSS, Audio",
  "date" : "18/12/2015 16:20:29"
},
{
  "heading": "Tic Tac Toe",
  "src": "http://volv.org/images/screens/tictactoe.png",
  "href": "http://volv.org/fcc/tictactoe/",
  "title": "Unbeatable?...",
  "skills": "HTML, jQuery, CSS, AI",
  "date" : "17/12/2015 02:08:40"
}, 
{
  "heading": "Wiki Viewer",
  "src": "http://volv.org/images/screens/wiki.png",
  "href": "http://volv.org/fcc/wiki/",
  "title": "Wiki Viewer",
  "skills": "HTML, jQuery, CSS, AJAX, Autocomplete",
  "date" : "08/12/2015 23:56:46"
}, 
{
  "heading": "Camper News",
  "src": "http://volv.org/images/screens/camper.png",
  "href": "http://volv.org/fcc/camper/",
  "title": "Camper News Feed",
  "skills": "HTML, jQuery, CSS, AJAX",
  "date" : "08/12/2015 00:52:01"
}, 
{
  "heading": "Twitch",
  "src": "http://volv.org/images/screens/twitch.png",
  "href": "http://volv.org/fcc/twitch/",
  "title": "Twitch Status Widget",
  "skills": "HTML, jQuery, CSS, AJAX",
  "date" : "03/12/2015 17:13:53"
}, 
{
  "heading": "Local Weather",
  "src": "http://volv.org/images/screens/weather.png",
  "href": "http://volv.org/fcc/weather/",
  "title": "Local Weather",
  "skills": "HTML, jQuery, CSS, AJAX, Geolocation",
  "date" : "30/11/2015 22:39:07"
}, 
{
  "heading": "Calculator",
  "src": "http://volv.org/images/screens/calc.jpg",
  "href": "http://volv.org/fcc/calc/",
  "title": "CSS Calc",
  "skills": "HTML, jQuery, CSS",
  "date" : "26/11/2015 22:39:07"
}, 
{
  "heading": "Pomodoro",
  "src": "http://volv.org/images/screens/pomodoro.png",
  "href": "http://volv.org/fcc/pomodoro/",
  "title": "Pomodoro Timer",
  "skills": "HTML, jQuery, CSS",
  "date" : "21/11/2015 22:39:07"
}, 
{
  "heading": "Chuck Norris Quotes",
  "src": "http://volv.org/images/screens/quotegen.png",
  "href": "http://volv.org/fcc/quotegen",
  "title": "Quote Machine",
  "skills": "HTML, jQuery, CSS",
  "date" : "30/10/2015 22:39:07"
},
{
  "heading": "Game of Life",
  "src": "http://volv.org/images/screens/gol.png",
  "href": "http://volv.org/gameoflife/gol.htm",
  "title": "Simulation",
  "skills": "HTML, Canvas & JS",
  "date" : "30/11/2015 22:39:07"
}, 
{
  "heading": "Bouncy",
  "src": "http://volv.org/images/screens/bouncy.png",
  "href": "http://volv.org/bouncy.htm",
  "title": "Quote Machine",
  "skills": "HTML, jQuery, CSS",
  "date" : "30/11/2014 22:39:07"
},
{
  "heading": "Maze",
  "src": "http://volv.org/images/screens/pathfind.png",
  "href": "http://volv.org/maze.htm",
  "title": "A* Pathing",
  "skills": "HTML, Canvas & JS",
  "date" : "30/11/2013 22:39:07"
},
{
  "heading": "Old Homepage",
  "src": "http://volv.org/images/screens/volvorg.png",
  "href": "http://volv.org/index_old.htm",
  "title": "Old Homepage",
  "skills": "HTML, CSS",
  "date" : "30/11/2013 22:39:07"
},
{
  "heading": "xkcd Weight Graph",
  "src": "http://volv.org/images/screens/weight.png",
  "href": "http://volv.org/weight/weightdata.htm",
  "title": "Python & JS Graphing",
  "skills": "Python, HTML, & JS",
  "date" : "30/11/2014 22:39:07"
},
{
  "heading": "CSS Form Test",
  "src": "http://volv.org/images/screens/csstest.png",
  "href": "http://volv.org/formtest/formtest.htm",
  "title": "~ 2012",
  "skills": "HTML, CSS",
  "date" : "30/11/2012 22:39:07"
},
{
  "heading": "Retro Growtext",
  "src": "http://volv.org/images/screens/growtext.png",
  "href": "http://volv.org/retro/navbar/growtext.htm",
  "title": "1999. Sliding Menu",
  "skills": "DHTML, JS",
  "date" : "30/11/1999 22:39:07"
},
{
  "heading": "Retro Codepen",
  "src": "http://volv.org/images/screens/retrocodepen.png",
  "href": "http://volv.org/retro/retrocodepen.htm",
  "title": "1999. Iframe Goodness",
  "skills": "DHTML, CSS",
  "date" : "30/11/1999 22:39:07"
},
];


(function() {

  var outputstring = "";

  for (var i = 0; i < projects.length; i++) {

    if (i % 3 === 0) { //First and every 3 times. Add row
      outputstring += "<div class='row innerrow'>"
    }

    outputstring += "<div class='col-md-4'>";
    outputstring += "<h3>" + projects[i].heading + "</h3>";
    outputstring += "<div class='projthumb'>";
    outputstring += "<img class='img-responsive projimg' src='" + projects[i].src + "' href='" + projects[i].href + "'>";
    outputstring += "<p>";
    outputstring += projects[i].title;
    outputstring += "</p>";
    outputstring += "<p>" + projects[i].skills + "</p>";
    outputstring += "</div>";
    outputstring += "</div>";

    if (i % 3 === 2) { //3rd + 3 times end row.
      outputstring += "</div>"
    }
  }

  $(outputstring).appendTo($("#secPortfolio"));

})();

$(document).ready(function() {

  $('.btnlink').click(function() {
    window.open($(this).attr("href"), "_blank");
  });

  $('.projimg').click(function() {
    window.open($(this).attr("href"), "_blank");
  });


  //Overly complex looking click attach to also handle middle mouse
  $(".projimg, .btnlink").on('mousedown', function(e) { 
    if( (e.which == 2) ) { // Middle Mouse
      e.preventDefault();
      window.open($(this).attr("href"));
    }
  });

});






