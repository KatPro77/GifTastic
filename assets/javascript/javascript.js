$(document).ready(function () {

    //Show buttons with various dances + form/button for adding new ones
    // Initial array of dances
    var dances = ["Wedding Dancing", "Irish Dancing", "Sexy Dancing", "Bad Dancing", "Dirty Dancing", "Break Dancing", "Tribal Dancing", "Club Dancing", "Silly Dancing"];

    function renderButtons() {
        $("#dance-view").empty();

        for (var i = 0; i < dances.length; i++) {
            var d = $("<button>");
            d.addClass("dancing");
            d.attr("data-name", dances[i]);
            d.text(dances[i]);
            $("#dance-view").append(d);
        }
    }
    renderButtons();

    $("add-dance").on("click", function (event) {
        event.preventDefault();
        var dance = $("#dance-input").val().trim();
        
        dance.push(dances);
        renderButtons();
    });

    $("#dance-view").on("click", function () {
        //queryURL for Giphy API
        // var dance = $(this).attr("data-dance");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dances + "&api_key=tzmPw5qcowMBrrBptGHnPjVTLSP1pXnf&limit=10";

        //AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $("#dances").empty();
            console.log(response);

            for (var i = 0; i < results.length; i++) {
                var danceDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var danceImg = $("<img>");

                danceImg.attr("src", results[i].images.original_still.url);
                danceImg.attr("data-still", results[i].images.original_still.url);
                danceImg.attr("data-animate", results[i].images.original.url);
                danceImg.attr("data-state", "still");
                danceImg.attr("class", "gif");
                danceDiv.append(p);
                danceDiv.append(danceImg);
                $("#dances").append(danceDiv);
            }

            //functions to start and stop gifs
            function changeState() {
                var state = $(this).attr("data-state");
                var animateImage = $(this).attr("data-animate");
                var stillImage = $(this).attr("data-still");

                if (state == "still") {
                    $(this).attr("src", animateImage);
                    $(this).attr("data-state", "animate");
                }

                else if (state == "animate") {
                    $(this).attr("src", stillImage);
                    $(this).attr("data-state", "still");
                }
            }

            $(document).on("click", ".gif", changeState);
            // var danceImage = $("<img>");
            // danceImage.attr("src", danceURL);

            // $("#dance-view").html(JSON.stringify());
            // // This .on("click") function will trigger the AJAX Call
            // $("#find-movie").on("click", function (event) {

            //     // event.preventDefault() can be used to prevent an event's default behavior.
            //     // Here, it prevents the submit button from trying to submit a form when clicked
            //     event.preventDefault();

            //     // Here we grab the text from the input box
            //     var movie = $("#movie-input").val();

            //     //Will need API key for Giphy
            //     // Example queryURL for Giphy API
            //     var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

            
        });
    });



});