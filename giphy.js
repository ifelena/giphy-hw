$(document).ready(function() {
  var fruits = [
    "orange", "watermelon", "starfruit", "guava", "lemon", "passion fruit",
    "pineapple", "kiwi", "melon", "strawberry", "blueberry",
    "dragon fruit", "pear", "grape", "mango", "apple",
    "avocado", "papaya", "peach", "cherry", "apricot"
  ];
  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }
  $(document).on("click", ".fruit-button", function() {
    $("#fruits").empty();
    $(".fruit-button").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type  + "&api_key=utW10k7t2r0hhyMA0hnOVDvHj679fR0u";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var fruitDiv = $("<div class=\"fruit-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var fruitImage = $("<img>");
        fruitImage.attr("src", still);
        fruitImage.attr("data-still", still);
        fruitImage.attr("data-animate", animated);
        fruitImage.attr("data-state", "still");
        fruitImage.addClass("fruit-image");
        fruitDiv.append(p);
        fruitDiv.append(fruitImage);
        $("#fruits").append(fruitDiv);
      }
    });
  });
  $(document).on("click", ".fruit-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $("#add-fruit").on("click", function(event) {
    event.preventDefault();
    var newfruit = $("input").eq(0).val();
    if (newfruit.length > 2) {
      fruits.push(newfruit);
    }
    populateButtons(fruits, "fruit-button", "#fruit-buttons");
  });
  populateButtons(fruits, "fruit-button", "#fruit-buttons");
});