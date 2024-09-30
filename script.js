let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let intervalId;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();

    document.getElementById("startButton").addEventListener("click", startGame);
    document.addEventListener("keyup", changeDirection);  //for movements

    // Draw initial background and food
    drawBackground();
    drawFood();
}

// Start the game
function startGame() {
    if (!intervalId) {
        intervalId = setInterval(update, 1000 / 10); // Set snake speed
    }
}

function update() {
    if (gameOver) {
        clearInterval(intervalId); // Stop the game loop
        return;
    }

    // Update game components
    drawBackground();
    drawFood();
    moveSnake();
    drawSnake();
    checkGameOver();
}

function drawBackground() {
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
}

function drawFood() {
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function moveSnake() {
    // Snake eats food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Update snake position
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
}

function drawSnake() {
    context.fillStyle = "white";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function checkGameOver() {
    // Check if snake hits the wall
    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
        alert("Game Over! Refresh to play again.");
    }

    // Check if snake collides with its body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over! Refresh to play again.");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}
