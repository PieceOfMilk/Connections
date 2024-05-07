
var clickedTiles = [];
var solved = [];
let gameNum = 1;
let triesLeft = 4;

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

        console.log(clickedTiles); 
    });

    $("#submit").click(() => {
        if (clickedTiles.length !== 4){
            var myModal = new bootstrap.Modal(document.getElementById('choose4Modal'), {
                keyboard: false
            });
            myModal.show();
        } else {
            $.ajax("/submit", {
                type: "GET",
                processData: true,
                data: { clicked: clickedTiles },
                dataType: "json",
                success: function (res) {
                    if (res !== "Incorrect"){
                        init(() => { // Ensure this runs after the grid is reloaded
                            solved.push(res);
                            clickedTiles = [];
                            solved.forEach(answerRow => {
                                for (let i = 0; i < answerRow.length; i++){
                                    if (i !== 0){
                                        $(`#${answerRow[i]}`).addClass('solved');
                                    }
                                }
                            })
                            updateSolved(solved);
                            $("#submit").removeClass(`btn-primary`);
                            $("#submit").removeClass(`btn-danger`);
                            $("#submit").addClass(`btn-success`);
                        });
                    }else {
                        triesLeft--; 
                        $("#tries").empty(); 
                        $("#tries").append(`<p>Mistakes remaining: ${triesLeft}</p>`);
                        $("#submit").removeClass(`btn-primary`);
                        $("#submit").addClass(`btn-danger`);
                        if (triesLeft === 0) {
                            var myModal = new bootstrap.Modal(document.getElementById('loseModal'), {
                                keyboard: false
                            });
                            myModal.show();
                            $("#submit").prop('disabled', true);
                        }

                    }
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
            clickedTiles = [];

            triesLeft = 4;
            $("#tries").empty(); 
            $("#tries").append(`<p>Tries: ${triesLeft}</p>`);
            $("#submit").removeClass(`btn-success`);
            $("#submit").removeClass(`btn-danger`);
            $("#submit").addClass(`btn-primary`);

            if(gameNum === 1){
                $("#prev").prop('disabled', true);
            }else {
                $("#prev").prop('disabled', false);
                $("#next").prop('disabled', false);
            }
            $("#submit").prop('disabled', false);
        }
    });
    
    $("#next").click(() => {
        gameNum++;
        console.log(gameNum);
        switchGrid();
        clickedTiles = [];

        triesLeft = 4;
        $("#tries").empty(); 
        $("#tries").append(`<p>Tries: ${triesLeft}</p>`);
        $("#submit").removeClass(`btn-success`);
        $("#submit").removeClass(`btn-danger`);
        $("#submit").addClass(`btn-primary`);

        if(gameNum === 3){
            $("#next").prop('disabled', true);
        }else {
            $("#next").prop('disabled', false);
            $("#prev").prop('disabled', false);
        }
        $("#submit").prop('disabled', false);
    });
});

function updateSolved(solvedTitles){
    let category;
    solvedTitles.forEach(answerArr => {
        for (let i = 0; i < answerArr.length; i++){
            if (i == 0){
                category = answerArr[0];
            }else {
                const $tile = $(`#${answerArr[i]}`);
                $tile.addClass('solved');

                // Check if the overlay div exists, if not, create it
                if (!$tile.children('.tile-overlay').length) {
                    $tile.append(`<div class="tile-overlay">${category}</div>`);
                }

                // Show the overlay
                $tile.find('.tile-overlay').show();
            }
        }
    });
}

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

            if (tiles.length === 0) {
                var myModal = new bootstrap.Modal(document.getElementById('winModal'), {
                    keyboard: false
                });
                myModal.show();
                confetti({
                    particleCount: 150,
                    spread: 180
                });
            }
    
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
