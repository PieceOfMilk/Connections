$(document).ready(function() {
    var clickedTiles = [];
    const g1 = ["dreamcast", "genesis", "switch", "wii"];
    const g2 = ["bounty", "crunch", "heath", "milky_way"];
    const g3 = ["anvil", "cochlea", "hammer", "stirrup"];
    const g4 = ["blink", "maroon", "sum", "u"];

    $('.tile').click(function() {
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
        }else {
            if (areEqual(clickedTiles, g1)) {
                console.log("Correct, You solved g1");
            }else if (areEqual(clickedTiles, g2)) {
                console.log("Correct, You solved g2");
            }else if (areEqual(clickedTiles, g3)) {
                console.log("Correct, You solved g3");
            }else if (areEqual(clickedTiles, g4)) {
                console.log("Correct, You solved g4");
            }else{
                console.log("Incorrect");
            }
        }
    });
    
});

function areEqual(arr1, arr2){
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    if (set1.size !== set2.size) {
        return false;
    }

    for (let item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }

    return true;
}