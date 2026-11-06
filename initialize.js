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
const helpButton = document.getElementById("help");

function InitializeGame(){
    window.game = deepClone(game);
    window.game = deepClone(settings);
    
    board.addEventListener("dragover", HandleTileHover);
    board.addEventListener("pointermove", HandleTileHover);
    board.addEventListener("pointerup", (event) => {
        console.log("Pointer released inside board");
    });
}

function HandleTileHover(event){
    const selected = board.querySelector(".dragging");
    if (!selected) return;

    const { clientX, clientY } = event;

    const ItemToReplaceWith = GetItemBelowCursor(board, {
        clientX,
        clientY
    });

    if (ItemToReplaceWith && ItemToReplaceWith !== selected) {
        ItemToReplaceWith.classList.add("highlighted");
    }
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
function HideMainMenu() {
    mainSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
}
function HideGameBoard() {
    mainSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
}
function HideTiles() {
    board.classList.add("help");
}
function UnhideTiles() {
    board.classList.remove("help");
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
if(helpButton) {
    helpButton.addEventListener("mousedown",() => HideTiles());
    helpButton.addEventListener("mouseup",() => UnhideTiles());
    helpButton.addEventListener("pointerdown",() => HideTiles());
    helpButton.addEventListener("pointerup",() => UnhideTiles());
}

export { board, gameSection, mainSection };
InitializeGame();
//