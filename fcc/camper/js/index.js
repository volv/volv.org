$(document).ready(function() {

  $.ajax({
    url: "http://www.freecodecamp.com/news/hot"
  })

  .done(function(data) {

    for (var i = 0; i < data.length; i++) {
      var story = {};
      story.title = data[i].headline;
      story.date = new Date(data[i].timePosted).toDateString();
      story.link = data[i].link;
      story.upvotes = data[i].upVotes.length;
      story.authorpic = data[i].author.picture;
      story.author = data[i].author.username;
      story.authorlink = "http://www.freecodecamp.com/" + story.author;
      story.image = data[i].image;
      story.discusslink = "http://www.freecodecamp.com/news/" + data[i].storyLink.replace(" ", "-");
      loadStories(story);
    }

    $('.alink').click(function() {
      window.open($(this).attr("href"), "_blank");
    });

    //Overly complex looking click attach to also handle middle mouse
    $(".alink").on('mousedown', function(e) {
      if ((e.which == 2)) { // Middle Mouse
        e.preventDefault();
        window.open($(this).attr("href"));
      }
    });

    /*        for (var i = 0; i < data.length; i++)
              for (k in data[i])
                $(".debug").append("<b>" + k + "</b> - " + JSON.stringify(data[i][k]) + "<br>");*/

  }); // ajax

  function loadStories(story) {
    var storyString = "";

    storyString += "<div class='post'>";
    storyString += "<img href = '" + story.link + "' class='img-responsive alink' src='" + story.authorpic + "' data-toggle='tooltip' title='"+story.title+"'>";
    storyString += "<span class='description'>";
    storyString += "<p class='title'><a href='" + story.link + "' class='title-link alink' data-toggle='tooltip' title='"+story.title+"'>" + trunc(story.title, 21) + "</a></p>";
    storyString += "<p class='author'><a href='" + story.authorlink + "' class='author-link'>By: " + story.author + "</a></p>";
    storyString += "<p class='heart'>";
    storyString += "<i class='fa fa-heart' data-toggle='tooltip' title='"+story.upvotes+" Upvotes'></i>";
    storyString += "<span class='like-count' data-toggle='tooltip' title='"+story.upvotes+" Upvotes'>" + story.upvotes + "</span>";
    //storyString += "<button href = '" + story.discusslink + "' class='btn btn-xs alink'>Discuss</button>";
    storyString += "</p>";
    storyString += "<p class='date'>Posted On: " + story.date + "</p>";
    storyString += "</span>";
    storyString += "</div>";

    $(storyString).appendTo(".outer-container");
  }

  function trunc(str, len) {
    if (str.length > len) {
      return str.slice(0, len) + " ...";
    }

    return str;
  }

}); // Ready