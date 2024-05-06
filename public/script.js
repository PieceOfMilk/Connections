var clickedTiles = [];
var solved = [];
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
                    if (res !== "Incorrect"){
                        init(() => { // Ensure this runs after the grid is reloaded
                            clickedTiles.forEach(answer => {
                                const $tile = $(`#${answer}`);
                                $tile.addClass('solved');

                                // Check if the overlay div exists, if not, create it
                                if (!$tile.children('.tile-overlay').length) {
                                    $tile.append(`<div class="tile-overlay">${res}</div>`);
                                }

                                // Show the overlay
                                $tile.find('.tile-overlay').show();
                                solved.push(answer);
                            });
                            clickedTiles = [];
                            solved.forEach(tile => {
                                $(`#${tile}`).addClass('solved');
                                console.log(`'solved' class added to: #${tile}`);
                            })
                        });
                    }
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

    $("#prev").click(() => {
        if (gameNum - 1 > 0){
            gameNum--;
            console.log(gameNum);
            switchGrid();
        }
    });
    
    $("#next").click(() => {
        gameNum++;
        console.log(gameNum);
        switchGrid();
    });
});


function displayGrid(answerTiles, tiles) {
    const container = $("#tile-container"); // Proper definition of the container variable
    container.empty(); // Clear existing content
    
    answerTiles.forEach((x) => {
        container.append(`<div class="tile solved" id="${x}">${x}</div>`); 

    });
    tiles.forEach((x) => {
        container.append(`<div class="tile" id="${x}">${x}</div>`); 

    });
    
    console.log(container.html()); // Log the HTML of the container
}

function switchGrid() {
    $.ajax("/switch", {
        type: "GET",
        processData: true,
        data: { num: gameNum },
        dataType: "json",
        success: function (response) {
            const answerTiles = response.answerGrid;
            const tiles = response.currentGrid;
            
            displayGrid(answerTiles, tiles); 
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

function init(callback) {
    $.ajax("/load", {
        type: "GET",
        processData: true,
        data: { num: gameNum },
        dataType: "json",
        success: function (response) {
            const answerTiles = response.answerGrid;
            const tiles = response.currentGrid;
            
            displayGrid(answerTiles, tiles); 
    
            if (callback) {
                callback(); 
            }
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
