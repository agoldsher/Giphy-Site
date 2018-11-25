// initial array of what the buttons will be
var animals = ["Cats", "Dogs", "Birds", "Mouse", "Squirrel", "Whales", "Goats", "Elephant", "Giraffe", "Cow"];
// this function places the buttons on the page
function renderButtons() {
    // Deletes the buttons prior to adding new buttons
    $("#buttons-view").empty();
    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        // Adds a class of animals to the button
        a.addClass("animals");
        // Adds a data-name
        a.attr("data-name", animals[i]);
        // Provided the initial button text
        a.text(animals[i]);
        // Adds the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
// this is an on click event for adding new buttons
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#animal-input").val().trim();
    // Adds the text from the textbox to the array
    animals.push(movie);
    // Clear the input box, so the user doesn't have to manually delete their input
    $("#animal-input").val("");
    // Calls the renderButtons fuction which handles the processing of our animals array
    renderButtons();
});
// this fuction displays the 10 gifs associated with the animal in the array
function displayGiphy() {
    // this grabs the name of the animal and uses it in the query
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1G38r3pk3Adg5kY8nur1WYGKJA75WQqk&q=" + animal + "&limit=10&offset=0&lang=en"
    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // the div where the gifs are displayed is emptied before anything is put into it
        $("#giphy-view").empty();
        // The query retrieves 10 gifs and loops through the array to put them on the page
        for (var i = 0; i < 10; i++) {
            // gifGiv will hold the entire gif
            var gifDiv = $("<div class='card gif ' style='width: 10rem;'>");
            // ratngDiv will hold just the rating of the associated gif
            var ratingDiv = $("<div class='rating card-title'>");
            ratingDiv.append("Rating: " + response.data[0].rating);
            // imageDiv will hold the image or gif
            var imageDiv = $("<div class='gif-image' data-state='still' value = " + i + ">");
            // this is the still image url
            var imgURL = response.data[i].images.fixed_height_small_still.url;
            // this is the gif url which is added as an attribute to the imageDiv
            var videoURL = response.data[i].images.fixed_height_small.url;
            imageDiv.attr("data-video", videoURL);
            // the still url is added to the imageDiv attribute
            imageDiv.attr("data-image", imgURL);
            // Creating an element to hold the image and the still image 
            var image = $("<img>").attr("src", imgURL);
            // each imageDiv is numbered according to the array index
            idAttr = ("image-" + i);
            image.attr("id", idAttr);
            // adding a class for bootstrap
            image.addClass("card-img-top");
            // adding the image to the imageDiv
            imageDiv.append(image);
            // Appending the rating and image Div to the gifDiv
            gifDiv.append(ratingDiv);
            gifDiv.append(imageDiv);
            // Appending the gifDiv to the giphy-view id on the HTML
            $("#giphy-view").append(gifDiv);
        };
    });

}
// this is an on click event to toggle between the still and the gif
// when the gif image is clicked...
$(document).on("click", ".gif-image", function () {
    // this checks if the data-state attribute is still...
    if ($(this).attr("data-state") == 'still') {
        // if it is, then it takes the gif url which was stored under the data-video attr and stores it in the var video.
        var video = $(this).attr("data-video");
        // Also it finds the associated value of the image...
        var value = $(this).attr("value");
        // which is used to grab the id which is assicated with that image...
        imageId = ("image-" + value);
        console.log(imageId);
        // and change the src of that image to be the gif url
        $("#" + imageId).attr("src", video);
        // lastly the data-state is changed to animated
        $(this).attr("data-state", 'animated');
        // if the data-state attribute is animated...
    } else if ($(this).attr("data-state") == 'animated') {
        // then it takes the image url which was stored under the data-image attr and stores it in the var image.
        var image = $(this).attr("data-image");
        // the proper id is found as before
        value = $(this).attr("value");
        imageId = ("image-" + value);
        console.log(imageId);
        // the gif is replaced with the still image on the corresponding id
        $("#" + imageId).attr("src", image);
        // lastly the data-state is changed to still
        $(this).attr("data-state", 'still');
    }
});
// this is an on click event to diplay the gifs whenever one of the buttons is pressed
// using the function displayGiphy
$(document).on("click", ".animals", displayGiphy);
// the buttons (the animals in the array) are displayed on the page when the page is loaded
renderButtons();