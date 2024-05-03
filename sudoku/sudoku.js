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

    var sudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillSudoku(sudokuBoard);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            tile = document.createElement("input")
            tile.classList.add("tile")
            tile.maxLength = 1;
            if (sudokuBoard[i][j] == 0) {
                tile.value = ""
                tile.readOnly = false;
            }
            else {
                tile.value = sudokuBoard[i][j]
                tile.readOnly = true;
            }
            boardContainer.append(tile);
        }
    }
}

function checkSolution() {
    console.log("I'm checking the solution, wait...");

    var player = [];
    var tiles = document.querySelectorAll(".tile");
    var index = 0;

    for (let i = 0; i < 9; i++) {
        var row = [];
        for (let j = 0; j < 9; j++) {
            var value = tiles[index].value;

            if (value == "") {
                value = 0
            }
            else {
                value = parseInt(value)
            }
            index++;
        }
        player.push(row);
    }

    console.log(player)

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

function fillSudoku(board) {
    // dummy test function
    board[0] = [5, 3, 0, 0, 7, 0, 0, 0, 0];
    board[1] = [6, 0, 0, 1, 9, 5, 0, 0, 0];
    board[2] = [0, 9, 8, 0, 0, 0, 0, 6, 0];
    board[3] = [8, 0, 0, 0, 6, 0, 0, 0, 3];
    board[4] = [4, 0, 0, 8, 0, 3, 0, 0, 1];
    board[5] = [7, 0, 0, 0, 2, 0, 0, 0, 6];
    board[6] = [0, 6, 0, 0, 0, 0, 2, 8, 0];
    board[7] = [0, 0, 0, 4, 1, 9, 0, 0, 5];
    board[8] = [0, 0, 0, 0, 8, 0, 0, 7, 9];
}