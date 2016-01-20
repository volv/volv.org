$(document).ready(function() {
  addOpener();
  addSubmit();

  $(".searchbox").val(""); //Empty search just in case.

});

function addOpener() {

  $(".search-container").one("click", function() { // We are opening
    $(".searchbox").focus();
    $(".searchbox").switchClass("closed", "opened", 400, "easeInBack");
    $("#tickcross").switchClass("tick", "cross", 400, "linear", function() {
      $("#tickcross").html("X");
    });
    event.stopPropagation();
    addCloser();
  });

}

function addCloser() {

  $("#tickcross").one("click", function() { //We are closing search box. Cross clicked.

    $(".searchbox").val(""); //Empty search
    $("#tickcross").html(""); //Remove cross
    $(".outer").addClass("jump", 600); // Move back down page

    $("#results").slideUp(600, function() {
      $("#results").html("");
    }); // Kill Search results    

    $(".searchbox").toggleClass("opened closed", 400, "linear"); // Close it
    $("#tickcross").toggleClass("cross tick", 200, "easeInQuart", function() { //Switch cross to tick
      //When cross tick easing is done
      $("#clicktosearch").css("display", "block");
    });
    event.stopPropagation();
    addOpener();
  });

}

function addSubmit() {

  $(".searchbox").on("keypress", function(e) {
    if (e.keyCode == 13) {
      $(".searchbox").autocomplete("close");
      doSearch();
    }
  })

  $(".searchbox").on("input propertychange paste", function(e) {
    if ($(".searchbox").val().length > 1) {
      getSuggest();
    }
  });

}

function getSuggest() {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    jsonp: "callback",
    dataType: 'jsonp',
    data: {
      action: "query",
      list: "prefixsearch",
      pssearch: $(".searchbox").val(),
      pslimit: "10",
      format: "json"
    },
    xhrFields: {
      withCredentials: true
    },
    success: updateSuggest,
    error: function(err) {
      console.log(err);
    }
  });
}

function updateSuggest(data) {

  var autocomp = [];

  $.each(data.query.prefixsearch, function(index, obj) {

    autocomp.push(obj.title);
  });

  //Load it
  $(".searchbox").autocomplete({
    select: doSearch,
    source: autocomp
  });

  $(".searchbox").autocomplete("search");

  console.log(autocomp);
}

function doSearch(str) {

  $(".outer").removeClass("jump", 600);
  $("#clicktosearch").css("display", "none");

  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    jsonp: "callback",
    dataType: 'jsonp',
    data: {
      action: "query",
      list: "search",
      srsearch: $(".searchbox").val(),
      srinfo: "suggestion",
      srlimit: "10",
      format: "json"
    },
    xhrFields: {
      withCredentials: true
    },
    success: displayResult
  });

}

function displayResult(data) {

  $("#results").slideUp(200, function() {
    $("#results").html(""); // Clear

    $.each(data.query.search, function(index, obj) {

      var outstring = "";

      outstring += "<a href='https://en.wikipedia.org/wiki/" + obj.title.replace(" ", "_") + "'>";
      outstring += "<div class='result'>";
      outstring += "<p class='title'>";
      outstring += obj.title;
      outstring += "</p>";
      outstring += "<p class='snippet'>"
      outstring += obj.snippet;
      outstring += "</p>";
      outstring += "</div>";
      outstring += "</a>";

      $("#results").append(outstring);

    }); //Each

    $("#results").slideDown(200);

  }); // Clear

}