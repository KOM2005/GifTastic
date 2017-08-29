$( document ).ready(function(){


  var flowers = [
  "Raflesia",
  "Camomile",
  "Hastas",
  "Lilic",
  "anemone"
  ];

     // Calling the renderButtons function to display the intial buttons
     renderButtons();


     

      // Function for displaying flower data
      function renderButtons() {

        // Deleting the flowers prior to adding new flowers
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of flowers
        for (var i = 0; i < flowers.length; i++) {

          // Then dynamicaly generating buttons for each flower in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of flower to our button
          a.addClass("flower");
          // Adding a data-attribute
          a.attr("data-flower", flowers[i]);
          // Providing the initial button text
          // Adding the button to the buttons-view div
          a.text(flowers[i]);
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a flower button is clicked
      $("#add-flower").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var flower = $("#flower-input").val().trim();

        // Adding flower from the textbox to our array
        flowers.push(flower);

        // Calling renderButtons which handles the processing of our flower array
        renderButtons();
      });

      

      

      $(".flower").on("click", function() {
    // have a problem here as it grabs dynamicaly created buttons but static ones it does not grab

    var flower = $(this).attr("data-flower");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    flower + "&api_key=9c7a5bdb80b747f29ef6073dd653f63b&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {



     var results = response.data;

     for (var i = 0; i < results.length; i++) {
      var flowerDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var flowerImage = $("<img>");
      flowerImage.attr("src", results[i].images.fixed_height_still.url);

      flowerImage.attr("src_moving", results[i].images.fixed_height.url);
      flowerImage.attr("src_still", results[i].images.fixed_height_still.url);
      flowerImage.attr("src_state", "still");
      flowerImage.attr("class", "img");


      flowerDiv.prepend(p);
      flowerDiv.prepend(flowerImage);

      $("#gifs-appear-here").prepend(flowerDiv);
    }
    console.log(response);

    $("#gifs-appear-here").on("click", ".img", function() {

      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var src_state = $(this).attr("src_state");
      var src_moving = $(this).attr("src_moving");
      var src_still = $(this).attr("src_still");



      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (src_state === "still") {
        $(this).attr("src", src_moving);
        $(this).attr("src_state", "moving");
      } else {
        $(this).attr("src", src_still);
        $(this).attr("src_state", "still");
      }

    });
  });
  });

    });