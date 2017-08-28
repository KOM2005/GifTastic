$( document ).ready(function(){


var flowers = [
      "Raflesia",
      "Camomile",
      "Hastas",
      "Lilic"
     ];

      // displayFlowerInfo function re-renders the HTML to display the appropriate content
      function displayFlowerInfo() {

        var flower = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        flower + "&api_key=9c7a5bdb80b747f29ef6073dd653f63b&limit=5";

        // Creating an AJAX call for the specific flower button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creating a div to hold the flower
          var flowerDiv = $("<div class='flower'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          flowerDiv.append(pOne);

         
          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          flowerDiv.append(image);

          // Putting the entire flower above the previous flowers
          $("#flowers-view").prepend(flowerDiv);
        });

      }

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
          a.attr("data-name", flowers[i]);
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

      // Adding a click event listener to all elements with a class of "flower"
      $(document).on("click", ".flower", displayFlowerInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    

    $("button").on("click", function() {

      var flower = $(this).attr("data-flower");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        flower + "&api_key=9c7a5bdb80b747f29ef6073dd653f63b&limit=5";

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

  $(".img").on("click", function() {
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