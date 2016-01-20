$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) { //Success
    getWeather(position.coords["latitude"], position.coords["longitude"]);
  }, function(pos) { //Error
    $("#error").html("Geolocate - FAIL<br>Using lat - 55.867674, long - -3.682519");
    getWeather(55.867674, -3.682519); //Sunny Sunny Whitburn
  });
}

var weatherText = "";
var temp = 0;
var unit = "C";
var timeSearchString = "";

function getWeather(lat_in, long_in) {

  var api_key = "bc64c8986f8de2a1383b606993328a02"; //Dont Steal plz k thx

  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?callback=?"

  weatherGET = $.getJSON(weatherAPI, {
    appid: api_key,
    lat: lat_in,
    lon: long_in,
    units: "metric"
  })

  .done(function(data) {

    var resultString = "";

    for (k in data) { // Debug String of object.
      if (data[k]) //Rest are null I checked.
        resultString += "<b>" + k + "</b>" + ": " + data[k] + "<br>";
    }

    //$("#images").html(resultString); //Debug

    var theWeather = {
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      temp: data.main.temp,

      name: data.name, //(whitburn)
      country: data.sys.country, //(GB)
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,

      description: data.weather[0].description, //Broken Clouds,
      icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
      id: data.weather[0].id, //803?
      main: data.weather[0].main, //Clouds

      deg: data.wind.deg,
      speed: data.wind.speed,

      update: data.dt
    };

    console.log(theWeather.sunrise, " - ", theWeather.sunset);
    
    var curHour = new Date().getHours();
    var sunriseHour = new Date(theWeather.sunrise*1000).getHours();
    var sunsetHour = new Date(theWeather.sunset*1000).getHours();

    console.log ("curHour - " +curHour+ ", sunriseHour - ", +sunriseHour+ ", sunsetHour - " +sunsetHour);
    
    if (curHour > sunriseHour && curHour < sunsetHour) {
      console.log("Using day");
      timeSearchString = "sunrise morning";
      $(".main").css("background", "rgba(100, 100, 255, 0.8)");
    }
    if (curHour < sunriseHour || curHour > sunsetHour){
      console.log("Using night");
      timeSearchString = "night";
      $(".main").css("background", "rgba(50, 50, 255, .9)");
    }
    if (curHour == sunriseHour || curHour == sunriseHour+1 || curHour == sunriseHour-1) {
      console.log("Using sunrise");
      timeSearchString = "dawn sunrise";
      $(".main").css("background", "rgba(100, 100, 255, 0.8)");
    }
    if (curHour == sunsetHour || curHour == sunsetHour+1 || curHour == sunsetHour-1) {
      console.log("Using dusk sunset");
      timeSearchString = "dusk sunset";
      $(".main").css("background", "rgba(100, 100, 255, 0.8)");
    }

    timeSearchString += " epic scene";
    
    var bearings = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var bearing = bearings[Math.floor(data.wind.deg / (360 / 8))];

    $(".icon").html("<img class='tmppic' src='" + theWeather.icon + "' alt='" + theWeather.description + "'>");
    $(".temp").html(Math.floor(theWeather.temp) + "&deg;C");
    $(".sky").html(theWeather.description.split(" ").map(CamelCase).join(" "));
    $(".wind").html(bearing + " " + Math.floor(theWeather.speed) + " Knots");
    $(".loc").html(theWeather.name + ", " + theWeather.country);

    temp = theWeather.temp;
    weatherText = theWeather.description.toString();
    doBackground();
  });

}

function CamelCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function doBackground() {

  var accountKey = "y/SXvpabxaJnY/d0/MMMGcWiWxKWwlTTFDeh9c9FDG0="; //Secret
  var accountKeyEncoded = btoa(":" + accountKey);

  var requestStr = "https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Image?Query=%27" + encodeURI(weatherText+ " " +timeSearchString) + "%27&ImageFilters=%27Style%3Aphoto%27&$top=50&$format=json";

  function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', "Basic " + accountKeyEncoded);
  }

  $.ajax({
    url: requestStr,
    timeout: 3000,
    beforeSend: setHeader,
    error: doBackground
  })

  .done(function(data, textStatus, xhr) {
    // .FileSize.  In Bytes

    //Remove headers
    xhr.setRequestHeader("Authorization", "");

    pickImage();

    function pickImage() {

      do {
        var which = Math.floor(Math.random() * 50);
        var url = data.d.results[which].MediaUrl;
        var fileSize = Math.floor(data.d.results[which].FileSize/1024);
        if (fileSize > 1000) { 
          console.log("Rejected - too big -> "+fileSize+ "Kb" + which + " - " + url);
        }
      } while (fileSize > 1000);

      loadImage(url, which);

    };

    function loadImage(url, which) {

      var img = new Image();
      img.onload = function() {
        console.log("Load pic " +which+ " - " +url);
        $("body").css("background-image", "url(" + url + ")");
        $("#citation").html("<cite><a href='" + url + "'>Background Source</a></cite>");
      };

      img.onerror = function() {
        console.log("Image loading failed - " +which+ " - " +url);
        pickImage();
      }
      
      //Try given pic
      img.src = url;
}

console.log(data);
});

  $(".temp").on("click", function() {
    if (unit == "C") { // Do farenheit conversion
      temp = ((9 / 5) * temp) + 32;
      $(".temp").html(Math.floor(temp) + "&deg;F");
      unit = "F";
    } else { // To Celsius
      temp = (temp - 32) * (5 / 9);
      $(".temp").html(Math.floor(temp) + "&deg;C");
      unit = "C";
    }
  });

}