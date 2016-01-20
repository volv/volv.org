
function nextQuote() {
  var chuckAPI="http://api.icndb.com/jokes/random?firstName=Chuck&lastName=Norris&callback=?";

  $.getJSON(chuckAPI).done(function(data) {
    $("#chuck").html(data.value.joke);
    $('#twit iframe').remove();
    // Generate new markup
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', 'http://volv.org/fcc/quotegen/')
        .attr('data-text', data.value.joke)
        .attr('data-size', 'large')
        .attr('data-via', 'volv777');
    $('#twit').append(tweetBtn);
    twttr.widgets.load();
  });
}

$("#generate").click(nextQuote);

nextQuote();

/*

  
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  yodude = $.getJSON( flickerAPI, {
    tags: "zelda",
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
    
    */