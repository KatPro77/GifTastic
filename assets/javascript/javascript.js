$(document).ready(function() {
          
          $("#dance-view").on("click", function() {
           
            //queryURL for Giphy API
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dances + "&api_key=xkDgjQ09sDmx8fw3eDCfEfPxCIV30CAY&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var danceURL = response.data;

                // var danceImage = $("<img>");
                // danceImage.attr("src", danceURL);
                
                $("#dance-view").html(JSON.stringify());
                console.log(response);
            });
        });


            //Show buttons with various dances + form/button for adding new ones
            // Initial array of dances
            var dances = ["Wedding Dancing", "Irish Dancing", "Sexy Dancing", "Bad Dancing", "Dirty Dancing", "Break Dancing", "Tribal Dancing", "Club Dancing", "Silly Dancing"];

            function renderButtons() {
                $("#dance-views").empty();

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
});