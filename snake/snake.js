let game, ctx
let tileSize = 25
let rows = 20
let cols = 20
let speedX = 0
let speedY = 0
let food = {x : 0, y : 0}
let snake = [{x : rows / 2 * tileSize, y : cols / 2 * tileSize}]
let gameInterval
let gameOver = false
let gameWon = false

/* load an initial state and wait for user input to begin game */
window.onload = () => {
    drawBoard()
    drawSnake()
    generateFood()
    drawFood()
    document.addEventListener("keydown", changeDirection)
    gameInterval = setInterval(run, 1000/12)
}

// function to "run" the game where we constantly update the game by redrawing the board, food, and snake
// based on their X and Y values
function run() {
    if (gameOver) {
        alert("Game Over!")
        clearInterval(gameInterval)
        return NaN
    } else if (gameWon) {
        alert("You Won")
        clearInterval(gameInterval)
    }
    drawBoard()
    drawFood()
    drawSnake()
    moveSnake()
    checkGame()
}

// get HTML element, set context, get the height and width that we want for the game board and color it
function drawBoard() {
    game = document.getElementById("game")
    ctx = game.getContext("2d")
    
    game.height = rows * tileSize
    game.width = cols * tileSize
    
    ctx.fillStyle = "#405070"
    ctx.fillRect(0, 0, game.height, game.width)    
}

// ONLY generate the coordinates of the next food but NOT draw it incase it collides with existing snake body
// if collision with snake body, redraw it, no worries about recursion, we don't return anything
function generateFood() {
    food.x = Math.floor(Math.random() * cols) * tileSize
    food.y = Math.floor(Math.random() * rows) * tileSize
    
    snake.forEach((body) => {
        if (food.x == body.x && food.y == body.y) {
            generateFood()
        }
    })
}

// draw the actual food particle on the board once we have a valid food position
function drawFood() {
    ctx.fillStyle ="#ffff47"
    ctx.fillRect(food.x, food.y, tileSize, tileSize)
}

// move the snake by creating a new "head" and prepending it as opposed to searching through and 
// appending a tail based on the direction the snake is going currently
function moveSnake() {
    let head = { x : snake[0].x + (speedX * tileSize), y : snake[0].y + (speedY * tileSize)}
    snake.unshift(head)
    if (!snakeEat()) {
        snake.pop()
    }
}

// draw snake and body segments
function drawSnake() {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(snake[0].x, snake[0].y, tileSize, tileSize) 
    ctx.fillStyle = "#adf7f2"
    snake.slice(1).forEach((body) => {
        ctx.fillRect(body.x, body.y, tileSize, tileSize)
    })
}

// direction changing 
function changeDirection(event) {
    if (event.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    }
    else if (event.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (event.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (event.code == "ArrowRight" && speedX != -1) { 
        speedX = 1;
        speedY = 0;
    }
}

// check to see if snake is at food position aka eating
function snakeEat() {
    let head = snake[0]
    
    if (head.x == food.x && head.y == food.y){
        return true
    }

    return false
}

// position checking for within board boundaries AND if snake collides into itself
function validPos() {
    if (snake[0].x < 0 || snake[0].x >= cols * tileSize || snake[0].y < 0 || snake[0].y >= rows * tileSize) {
        return false
    }
    else if (snake.slice(1).some((body) => body.x == snake[0].x && body.y == snake[0].y)) {
        return false
    }
    return true
}

// general game status checker after each "frame" or "move"
function checkGame() {
    if (snakeEat()){
        generateFood()
        drawFood()
    }
    if (!validPos()) {
        gameOver = true
    }
    if (snake.length == rows * cols) {
        gameWon = true
    }
}