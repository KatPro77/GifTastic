$(document).ready(function () {

    //Show buttons with various dances + form/button for adding new ones
    // Initial array of dances
    var dances = ["Wedding Dancing", "Irish Dancing", "Sexy Dancing", "Bad Dancing", "Dirty Dancing", "Break Dancing", "Tribal Dancing", "Club Dancing", "Silly Dancing"];

    function renderButtons() {
        $("#dance-view").empty();

        for (var i = 0; i < dances.length; i++) {
            var x = $("<button>");
            x.addClass("dancing");
            x.attr("data-name", dances[i]);
            x.text(dances[i]);
            $("#dance-view").append(x);
        }
    }

    $("add-dance").on("click", function (event) {
        event.preventDefault();
        var dance = $("#dance-input").val().trim();
        dances.push(dance);
        renderButtons();

    });
    renderButtons();


    $("#dance-view").on("click", function () {
        //queryURL for Giphy API
        var dance = $(this).attr("data-dance");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dances + "&api_key=xkDgjQ09sDmx8fw3eDCfEfPxCIV30CAY&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $("#dances").empty();

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

            // var danceImage = $("<img>");
            // danceImage.attr("src", danceURL);

            // $("#dance-view").html(JSON.stringify());
            // console.log(response);
        });
    });



});