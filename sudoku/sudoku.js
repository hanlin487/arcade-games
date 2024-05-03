window.onload = () => {
    done = document.querySelector('.done')
    done.addEventListener("click", checkSolution);
    reset = document.querySelector('#reset')
    reset.addEventListener("click", resetBoard);
    tileSize = document.querySelectorAll(".tile")
    setupBoard();
    for (let t = 0; t < tileSize.length; t++) {
        tileSize[t].addEventListener("keydown", (event) => {
            if (isNaN(parseInt(event.key))) {
                event.preventDefault();
                event.target.innerText = '0';
            }
        });
    }
}

var board = Array.from({length: 9}, () => Array(9).fill(''))

function setupBoard() {
    var boardContainer = document.querySelector('.board');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            tile = document.createElement("input")
            tile.classList.add("tile")
            tile.value = "0";
            tile.maxLength = 1;
            if (j % 4 == 0) {
                tile.readOnly = true;
            }
            else {
                tile.value = ""
                tile.readOnly = false;
            }
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
        if (!tiles[i].readOnly) {
            tiles[i].value = "";
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
