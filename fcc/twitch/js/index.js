$(".tab").on("click", function() {
  $(".tab").removeClass("selected");
  $(this).addClass("selected");
  userFilter = $(this).prop("id"); // Choose filter
  
  curusers = users; //Get full list to start
  
  curusers = curusers.filter(function(f, i) { //Filter based on online status
    switch(userFilter) {
      case "tabAll":
        return true;
      case "tabOn":
        return curusers[i].online;
      case "tabOff":
        return !curusers[i].online;
    }
  });
  
  doSearch();//Run current search on it
});

var userFilter = "tabAll";
var users = [];
var curusers = [];

var fccusers = ["freecodecamp", "milleniumtvlol", "terakilobyte", "habathcx", "dotastarladder_en", "RobotCaleb", "comster404", "medryBW","gripex90"];

var wedone = 0;

for (var i = 0; i < fccusers.length; i++) {

  $.getJSON('https://api.twitch.tv/kraken/users/' + fccusers[i] + '?callback=?')
    .done(function(data) {

      var user = {};
      user.display_name = data.display_name;
      user.name = data.name;
      user.logo = (data.logo != null) ? data.logo : "http://placehold.it/63x63";
      user.url = "http://www.twitch.tv/" + data.name;
      user.updateStatus = updateStatus;
      users.push(user);
    
      wedone++;
      if (wedone == fccusers.length)
        loadingDone();

    });
}

function loadingDone() {
  wedone = 0;
  
  curusers = users;

  for (var i = 0; i < users.length; i++)
    users[i].updateStatus(users[i], keeptrack);
}

function keeptrack() {
  wedone++;
  if (wedone == users.length) {
    updateDisplay(users);
  }
}

function updateStatus(obj, callback) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + obj.name + '?callback=?')
    .done(function(data) {
      if (!data._links) {
        obj.closed=true;
      }
      obj.online = (data.stream) ? true : false;
      if (data.stream)
        if (data.stream.channel)
          obj.gamedesc = data.stream.channel.status;
    
      callback();
    });
}

//Remember. Doesn't care. Just displays current result list
//result = subset to display. or all
function updateDisplay(result) {

  var outstring = "";

  $(".friend-container").empty();

  result.forEach(function(currentValue, index) {
    outstring = buildString(currentValue);
    $(outstring).appendTo(".friend-container");
  });
  
  //Stick some click handlers on
  $('.friend').on("click", function() {
    window.open($(this).attr("href"), "_blank");
  });
  //Overly complex looking click attach to also handle middle mouse
  $(".friend").on('mousedown', function(e) { 
    if( (e.which == 2) ) { // Middle Mouse
      e.preventDefault();
      window.open($(this).attr("href"));
    }
  });
  
}

function buildString(currentValue) {
  var xline = (currentValue.online) ? "online" : (currentValue.closed) ? "closed" : "offline";
  var tagLine = (currentValue.online) ? currentValue.gamedesc : (currentValue.closed) ? "Account Closed" : "Offline";
  outstring = "";
  outstring += "<div href='" +currentValue.url+ "'class='friend " +xline+ "''>";
  outstring += "<p>";
  outstring += "<img src='" + currentValue.logo + "'>";
  outstring += "<ul>";
  outstring += "<li class='name'>" + currentValue.display_name + "</li>";
  outstring += "<li class='extra'>" +tagLine+ "</li>";
  outstring += "</ul></p></div>";
  return outstring;
}


function findInName(arr, search) {
  result = [];
  result = arr.filter(function(f, i) {
    if (arr[i].name.indexOf(search.toLowerCase().trim()) != -1)
      return true;
    
    return false;
  });
  
  return result;
}


//ertioadflxcbnm = wait for 2nd letter.
//qwyupsghjkzv = go now.
//Dunno why. but thats what it did on fcc
$("#searchbox").on("keyup", doSearch);

function doSearch() {
  var result = [];
  var goLetters = "qwyupsghjkzv";
  var searchstring = $("#searchbox").val();
  searchstring = searchstring.toLowerCase();  
  
  if ((searchstring.length > 1) || goLetters.indexOf(searchstring) != -1) {
    result = findInName(curusers, searchstring);
  }
  else {
    result = curusers;
  }
  
  updateDisplay(result);
}