const express = require("express");
const app = express();
let solvedTiles = [];
let gameNum;


app.use(express.static('public'));

const g2Words = ["shadow", "bud", "kitty", "fuzz", 
                 "dark", "whiskers", "pot", "cold", 
                 "pool", "dank", "mate", "fund", 
                 "chum", "scruff", "musty", "pal"];

const g2Answers = [["Slang for friend", "bud", "chum", "mate", "pal"],
                   ["Adjective for a basement", "cold", "dark", "dank", "musty"],
                   ["Collection of money", "fund", "kitty", "pool", "pot"],
                   ["Stubble", "fuzz", "scruff", "shadow", "whiskers"]];

const g1Words = ["tab", "joke", "sketch", "plasma",
                 "bookmark", "routine", "liquid", "spot",
                 "window", "bit", "solid", "splash",
                 "history", "gas", "drop", "sprinkle"];

const g1Answers = [["States of Matter", "gas", "liquid", "plasma", "solid"],
                   ["Web Browser-Ralated", "bookmark", "history", "tab", "window"],
                   ["Little Bit of a Beverage", "drop", "splash", "spot", "sprinkle"],
                   ["Comedian's Output", "bit", "joke", "routine", "sketch"]];

const g3Words = ["will", "stone", "fire", "stairs", 
                 "chest", "ramp", "hazel", "pine",
                 "pea", "elevator", "pack", "prince",
                 "bone", "secrets", 'escalator', "mud"];

const g3Answers = [["Ways to get up", "stairs", "elevator", "ramp", "escalator"],
                   ["Parts of Lehigh building names", "bone", "mud", "pack", "will"],
                   ["___nut", "pea", "hazel", "pine", "chest"],
                   ["Last word of Harry Potter titles", "secrets", "stone", "fire", "prince"]];

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
        case "3":
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
        case "3":
            currentGrid = g3Words;
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
                    
                    responseText = group; 
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
                    
                    responseText = group; 
                }
            });
            console.log(solvedTiles);
            res.json(responseText);
        case "3":
            g3Answers.forEach(group => {
                if (areEqual(clickedTiles, group.slice(1))) {
                    clickedTiles.forEach(tile => {
                        if (!solvedTiles.includes(tile)) {
                            solvedTiles.push(tile);
                        }
                    });
        
                    currentGrid = currentGrid.filter(tile => !solvedTiles.includes(tile));
                    
                    responseText = group; 
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