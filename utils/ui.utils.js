import { board } from "../initialize.js";
import { convertTo2D, isSorted, shuffle } from "./js.utils.js";

export function GetTiles(complexityCount) {
    board.textContent = "";
    board.style.setProperty("grid-template-columns",`repeat(${complexityCount}, 1fr)`)
    const tileCount = complexityCount * complexityCount;
    const shuffledArray = shuffle(tileCount);
    shuffledArray.forEach(item => {
        const tile=document.createElement("div");
        tile.classList = "tile"
        tile.setAttribute("draggable","true");
        tile.setAttribute("data-id", item);
        const {x, y} = convertTo2D(item, complexityCount);
        tile.setAttribute("data-x", x);
        tile.setAttribute("data-y", y);
        tile.style.setProperty("--xpos", `${x/(complexityCount-1) * 100}%`);
        tile.style.setProperty("--ypos", `${y/(complexityCount-1) * 100}%`);
        _addEvents(tile);
        board.appendChild(tile);
    });
}
export function GetItemBelowCursor(grid, cursor) {
    const nonDraggingItems = [
        ...grid.querySelectorAll(".tile")
    ];
    // ...grid.querySelectorAll(".tile:not(.dragging)")
    const {clientX, clientY} = cursor;
    return nonDraggingItems.reduce(
    (closest, item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        item.classList.remove("highlighted");

        // Squared distance (faster than Math.sqrt)
        const distance =
            (clientX - centerX) ** 2 +
            (clientY - centerY) ** 2;

        if (distance < closest.distance) {
            return {
                distance,
                element: item
            };
        }

        return closest;
    }, {
        distance: Infinity,
        element: null
    }).element;
}

//#region private function
function _addEvents(tile) {
    tile.addEventListener("click", () => {
        const first = document.querySelector(".dragging");
        if(!first)
            tile.classList.add("dragging");
        else if(first == tile){
            tile.classList.remove("dragging");
        } else {
            _SwapTiles(first, tile);
        }
    });
    tile.addEventListener("dragstart", () => {
        tile.classList.add("dragging");
    });
    tile.addEventListener("dragend", () => {
        tile.classList.remove("dragging");
        const highlighted = board.querySelector(".highlighted");
        if(highlighted)
            highlighted.classList.remove("highlighted");
        _SwapTiles(tile, highlighted);
    });
}

function _SwapTiles(first, second){
    if(first == second)
        return;
    const previousSpecs = [...board.children].map((el) => ({
        element: el,
        rect: el.getBoundingClientRect() 
    }));
    // Swap DOM positions
    const firstNext = first.nextSibling;
    const secondNext = second.nextSibling;

    const firstParent = first.parentNode;
    const secondParent = second.parentNode;

    if (firstNext === second) {
        secondParent.insertBefore(second, first);
    } else if (secondNext === first) {
        firstParent.insertBefore(first, second);
    } else {
        firstParent.insertBefore(first, secondNext);
        secondParent.insertBefore(second, firstNext);
    }


    previousSpecs.forEach(({ element: el, rect }) => {
        const lastRect = el.getBoundingClientRect();

        const dx = rect.left - lastRect.left;
        const dy = rect.top - lastRect.top;

        el.animate([
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: "translate(0,0)" }
        ], {
            duration: 400,
            easing: "ease"
        });
    });
    first.classList.remove("dragging");
    second.classList.remove("highlighted");
    const items = [...board.children].map((item) => Number(item.dataset.id));
    console.log(items, isSorted(items));
    if(isSorted(items)) {
        alert("Game Over");
    }
}
//#endregion private function
