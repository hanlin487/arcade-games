window.onload = () => {
    done = document.querySelector('.done')
    done.addEventListener("click", checkSolution);
    reset = document.querySelector('#reset')
    reset.addEventListener("click", resetBoard);
    tileSize = document.querySelectorAll(".tile")
    setupBoard();
    for (let t = 0; t < tileSize.length; t++) {
        tileSize[t].addEventListener("focus", function(event) {
            console.log("event listener was triggered");
            // Save the initial value of the tile for comparison later
            event.target.initialValue = event.target.innerText.trim();
        });
        tileSize[t].addEventListener("input", function(event) {
            
            let inputValue = event.target.innerText.trim();
            inputValue = inputValue.replace(/\D/g, '');

            if (inputValue.length > 1 || (inputValue.length === 1 && event.target.initialValue !== inputValue)) {
                event.target.innerText = event.target.initialValue || '';
            } else {
                event.target.innerText = inputValue;
            }
        });
    }
}

var board = Array.from({length: 9}, () => Array(9).fill(''))

function setupBoard() {
    var boardContainer = document.querySelector('.board');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            tile = document.createElement("div")
            tile.classList.add("tile")
            tile.innerText = "0";
            tile.contentEditable = true;
            tile.maxLength = 1;
            boardContainer.append(tile);
        }
    }
}

function checkSolution() {
    console.log("I'm checking the solution, wait...");
}

function resetBoard() {
    console.log("I'm resetting the board")

    tiles = document.querySelectorAll(".tile")
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].contentEditable) {
            tiles[i].innerText = "0";
        }
    }
}

function checkLen(inp) {
    console.log("don't type too much!")
    if (inp.innerText.length > 1) {
        console.log("too much typed")
        inp.innerText = inp.innerText[0];
    }

}
