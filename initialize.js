import { game, settings } from "./constants.js";
import { deepClone } from "./utils/js.utils.js";
import { GetItemBelowCursor, GetTiles } from "./utils/ui.utils.js";

const board = document.getElementById("board");
const mainSection = document.getElementById("menu-card");
const gameSection = document.getElementById("game-board");
const backButton = document.getElementById("back-button");

// Game buttons
const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");
const restartButton = document.getElementById("restart");

function InitializeGame(){
    window.game = deepClone(game);
    window.game = deepClone(settings);
    
    board.addEventListener("dragover", (event) => {
        event.preventDefault();
        const selected = board.querySelector(".dragging");
        if(!selected) {
            return;
        }
        const {clientX, clientY} = event;
        const ItemToReplaceWith = GetItemBelowCursor(board, {clientX, clientY});
        ItemToReplaceWith.classList.add("highlighted");
    });
    // StartGame(5);
}

function StartGame(complexityCount) {
    if(complexityCount) {
        console.log("parameter - ", complexityCount)
        window.game = deepClone({...game, complexity: complexityCount});
        GetTiles(complexityCount);
    }
    else {
            console.log("window - ", complexityCount)
        const _complexityCount = window?.game?.complexity;
        GetTiles(_complexityCount);
    }
}

// EventListeners
function HandleComplexity(complexity) {
    window.game.complexity = complexity;
    StartGame(complexity);
}
function HideMainMenu() {
    mainSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
}
function HideGameBoard() {
    mainSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
}
if(backButton) 
    backButton.addEventListener("click",() => HideGameBoard());

if(easyButton)
    easyButton.addEventListener("click",() => {HideMainMenu();StartGame(3)});
if(mediumButton)
    mediumButton.addEventListener("click",() => {HideMainMenu();StartGame(4)});
if(hardButton)
    hardButton.addEventListener("click",() => {HideMainMenu();StartGame(6)});
if(restartButton)
    restartButton.addEventListener("click",() => {StartGame()});

export { board, gameSection, mainSection };
InitializeGame();
//