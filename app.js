const express = require("express");
const app = express();
let solvedTiles = [];
let gameNum;


app.use(express.static('public'));

const g1Words = ["dreamcast", "genesis", "switch", "wii", 
                 "bounty", "crunch", "heath", "milky_way", 
                 "anvil", "cochlea", "hammer", "stirrup", 
                 "blink", "maroon", "sum", "u"];

const g1Answers = [["Game Consoles", "dreamcast", "genesis", "switch", "wii"], 
                   ["Candy Bars", "bounty", "crunch", "heath", "milky_way"], 
                   ["Parts of the Ear", "anvil", "cochlea", "hammer", "stirrup"], 
                   ["Band Names With a Word Missing", "blink", "maroon", "sum", "u"]];

const g2Words = ["tab", "joke", "sketch", "plasma",
                 "bookmark", "routine", "liquid", "spot",
                 "window", "bit", "solid", "splash",
                 "history", "gas", "drop", "sprinkle"];

const g2Answers = [["States of Matter", "gas", "liquid", "plasma", "solid"],
                   ["Web Browser-Ralated", "bookmark", "history", "tab", "window"],
                   ["Little Bit of a Beverage", "drop", "splash", "spot", "sprinkle"],
                   ["Comedian's Output", "bit", "joke", "routine", "sketch"]];

let currentGrid = g1Words;

app.get("/load", (req, res) => {
    gameNum = req.query.num;
    switch(gameNum){
        case "1":
            res.json({ answerGrid: solvedTiles, currentGrid: currentGrid });
            break;
        case "2":
            res.json({ answerGrid: solvedTiles, currentGrid: currentGrid });
            break;
    }
});

app.get("/switch", (req, res) => {
    gameNum = req.query.num;
    solvedTiles = [];
    answerGrid = [];
   
    switch(gameNum){
        case "1":
            currentGrid = g1Words;
            res.json({ answerGrid: solvedTiles, currentGrid: currentGrid });
            break;
        case "2":
            currentGrid = g2Words;
            res.json({ answerGrid: solvedTiles, currentGrid: currentGrid });
            break;
    }
});

app.get("/submit", (req, res) => {
    let clickedTiles = req.query.clicked; 
    let responseText = "Incorrect";

    switch(gameNum){
        case "1":
            g1Answers.forEach(group => {
                if (areEqual(clickedTiles, group.slice(1))) {
                    clickedTiles.forEach(tile => {
                        if (!solvedTiles.includes(tile)) {
                            solvedTiles.push(tile);
                        }
                    });
        
                    currentGrid = currentGrid.filter(tile => !solvedTiles.includes(tile));
                    
                    responseText = group[0]; // Send back the category name as confirmation
                }
            });
            console.log(solvedTiles);
            res.json(responseText);
        case "2":
            g2Answers.forEach(group => {
                if (areEqual(clickedTiles, group.slice(1))) {
                    clickedTiles.forEach(tile => {
                        if (!solvedTiles.includes(tile)) {
                            solvedTiles.push(tile);
                        }
                    });
        
                    currentGrid = currentGrid.filter(tile => !solvedTiles.includes(tile));
                    
                    responseText = group[0]; // Send back the category name as confirmation
                }
            });
            console.log(solvedTiles);
            res.json(responseText);
    }
});

// app.get("/submit", (req, res) => {
//     let clickedTiles = req.query.clicked;
//     if (areEqual(clickedTiles, g1Answers[0])) {
//         const itemsToMove = g1Answers[0].filter(item => currentGrid.includes(item));

//         // Create a new array with these items at the front
//         const newGrid = [
//             ...itemsToMove,
//             ...currentGrid.filter(item => !itemsToMove.includes(item))
//         ];
//         currentGrid = newGrid;
//         res.json("Items moved");
//     } else if (areEqual(clickedTiles, g1Answers[1])) {
//         const itemsToMove = g1Answers[1].filter(item => currentGrid.includes(item));

//         // Create a new array with these items at the front
//         const newGrid = [
//             ...itemsToMove,
//             ...currentGrid.filter(item => !itemsToMove.includes(item))
//         ];
//         currentGrid = newGrid;
//         res.json(g1Answers[1][0]);
//     } else if (areEqual(clickedTiles, g1Answers[2])) {
//         const itemsToMove = g1Answers[2].filter(item => currentGrid.includes(item));

//         // Create a new array with these items at the front
//         const newGrid = [
//             ...itemsToMove,
//             ...currentGrid.filter(item => !itemsToMove.includes(item))
//         ];
//         currentGrid = newGrid;
//         res.json(g1Answers[2][0]);
//     } else if (areEqual(clickedTiles, g1Answers[3])) {
//         const itemsToMove = g1Answers[3].filter(item => currentGrid.includes(item));

//         // Create a new array with these items at the front
//         const newGrid = [
//             ...itemsToMove,
//             ...currentGrid.filter(item => !itemsToMove.includes(item))
//         ];
//         currentGrid = newGrid;
//         res.json(g1Answers[3][0]);
//     } else {
//         res.json("Incorrect");
//     }

// });

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