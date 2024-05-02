const express = require("express");
const app = express();

app.use(express.static('public'));

const g1Words = ["dreamcast", "genesis", "switch", "wii", 
                 "bounty", "crunch", "heath", "milky_way", 
                 "anvil", "cochlea", "hammer", "stirrup", 
                 "blink", "maroon", "sum", "u"];

const g1Answers = [["Game Consoles", "dreamcast", "genesis", "switch", "wii"], 
                   ["Candy Bars", "bounty", "crunch", "heath", "milky_way"], 
                   ["Parts of the Ear", "anvil", "cochlea", "hammer", "stirrup"], 
                   ["Band Names With a Word Missing", "blink", "maroon", "sum", "u"]];

app.get("/load", (req, res) => {
    let gameNum = req.query.num;
    switch(gameNum){
        case "1":
            res.json(g1Words);
    }
});

app.get("/submit", (req, res) => {
    let clickedTiles = req.query.clicked;
    if (areEqual(clickedTiles, g1Answers[0])) {
        res.json(g1Answers[0][0]);
    } else if (areEqual(clickedTiles, g1Answers[1])) {
        res.json(g1Answers[1][0]);
    } else if (areEqual(clickedTiles, g1Answers[2])) {
        res.json(g1Answers[2][0]);
    } else if (areEqual(clickedTiles, g1Answers[3])) {
        res.json(g1Answers[3][0]);
    } else {
        res.json("Incorrect");
    }

});

function areEqual(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    for (let item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }

    return true;
}


  
  
  


app.listen(3000, () => console.log("Starting up Connections"));