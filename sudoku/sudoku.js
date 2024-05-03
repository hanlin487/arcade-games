window.onload = () => {
    done = document.querySelector('.done')
    done.addEventListener("click", checkSolution);
    reset = document.querySelector('#reset')
    reset.addEventListener("click", resetBoard);
    setupBoard();
    tileSize = document.querySelectorAll(".tile")
    for (let t = 0; t < tileSize.length; t++) {
        tileSize[t].addEventListener("keydown", (event) => {
            if (isNaN(parseInt(event.key))) {
                event.preventDefault();
                event.target.value = '';
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
                tile.style.fontWeight = "bold"
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
            row.push(value);
            index++;
        }
        player.push(row);
    }

    console.log(player)
    
    var site = document.querySelector('.content');
    message = document.createElement("h2")

    if (isSudokuValid(player)) {
        console.log("Congratulations! You solved the Sudoku puzzle!");
        message.innerText = "Congratulations! You solved the Sudoku puzzle!";
    } 
    else {
        console.log("Oops! There's a mistake in your solution :/");
        message.innerText = "Oops! There seems to be a mistake in your solution.";
    }

    if (document.querySelector(".win_response") == null) {
        message.classList.add("win_response");
        if (site == null) {
            console.log("site was null");
        }
        else {
            site.insertBefore(message, document.querySelector(".horizontal"));
        }
    }
}

function isSudokuValid(board) {
    for (let i = 0; i < 9; i++) {
        if (!isRowValid(board, i) || !isColumnValid(board, i) || !isSquareValid(board, i)) {
            return false;
        }
    }
    return true;
}

function isRowValid(board, row) {
    nums_seen = []
    for (let i = 0; i < 10; i++) {
        value = board[row][i]
        if (value == "") {
            console.log("row valid saw a space")
            return false;
        } 
        else if (nums_seen.includes(value)) {
            console.log("I saw a number that I've already seen before in row " + toString(value))
            return false
        }
        else {
            nums_seen.push(value)
        }
        console.log(nums_seen)
    }

    return true
}

function isColumnValid(board, col) {
    nums_seen = []
    for (let i = 0; i < 9; i++) {
        value = board[i][col]
        if (value == "") {
            console.log("column valid saw a space")
            return false;
        }
        else if (nums_seen.includes(value)) {
            console.log("I saw a number that I've already seen before in column " + toString(value))
            return false;
        }
        else {
            nums_seen.push(value)
        }
        console.log(nums_seen)
    }
    
    return true;
}

function isSquareValid(board, square) {
    nums_seen = []
    var startRow = Math.floor(square / 3) * 3;
    var startCol = (square % 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            value = board[i][j]
            if (value == "") {
                console.log("square valid saw a space")
                return false;
            }
            else if (nums_seen.includes(value)) {
                console.log("I saw a number that I've already seen before in square " + toString(value))
                return false;
            }
            else {
                nums_seen.push(value)
            }
        }
    }
    return true;
}

function resetBoard() {
    console.log("I'm resetting the board")

    tiles = document.querySelectorAll(".tile")
    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].readOnly) {
            tiles[i].value = "";
        }
    }

    win_resp = document.querySelector(".win_response")
    if (win_resp != null) {
        win_resp.remove()
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
