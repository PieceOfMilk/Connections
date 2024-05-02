var clickedTiles = [];
let gameNum = 1;

$(document).ready(function() {
    // Use event delegation for dynamically added elements
    $('#tile-container').on('click', '.tile', function() {
        var tileId = $(this).attr('id');

        // Toggle active class and add/remove from array
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            clickedTiles = clickedTiles.filter(id => id !== tileId);
        } else if (clickedTiles.length < 4) {
            $(this).addClass('active');
            clickedTiles.push(tileId);
        }

        console.log(clickedTiles); // Output to console for verification
    });

    $("#submit").click(() => {
        if (clickedTiles.length !== 4){
            alert("please select 4 tiles");
        } else {
            $.ajax("/submit", {
                type: "GET",
                processData: true,
                data: { clicked: clickedTiles },
                dataType: "json",
                success: function (res) {
                    console.log(res);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error: " + jqXHR.responseText);
                    alert("Error: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            });
        }
    });
});


function displayGrid(tiles) {
    $("#tile-container").empty();
    tiles.forEach((x) => {
      $("#tile-container").append(`<div class="tile" id="${x}">${x}</div>`);
    });
}

function init() {
    $.ajax("/load", {
        type: "GET",
        processData: true,
        data: { num: gameNum },
        dataType: "json",
        success: function (tiles) {
            displayGrid(tiles);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

$( () => {
    init();
});
