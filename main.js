let boardSize = 40;
let rows = 20;
let columns = 20;
let highestScore = 0;
let score = 0;
let board;
let context;
let foodX;
let foodY;
let snakeHeadX;
let snakeHeadY;
let snakeDirectionX;
let snakeDirectionY;
let snakeTail;
let ground = new Image();
ground.src = "Images/ground.jpg";
let foodImg = new Image();
foodImg.src = "Images/apple2.png";
let gameOver = document.getElementById("gameOver");
let restartBtn = document.getElementById("resetBtn");

restartBtn.addEventListener('click', startGame);

startGame();

function startGame() {
    gameOver.classList.remove("show");
    score = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("highestScore").innerHTML = highestScore;
    //Making the snake
    snakeHeadX = boardSize * 5;
    snakeHeadY = boardSize * 15;
    snakeDirectionX = 0;
    snakeDirectionY = 0;
    snakeTail = [[boardSize * 4, boardSize * 15], [boardSize * 3, boardSize * 15]];
    window.onload = function() {
        board = document.getElementById("board");
        board.height = rows * boardSize;
        board.width = columns * boardSize;
        context = board.getContext("2d");
        placeFood();
        document.addEventListener("keydown", changeDirection);
        setInterval(boardUpdate, 120);
    }
}

function boardUpdate() {
    if (checkIfGameOver() === false) {
        context.drawImage(ground, 0, 0);
        context.drawImage(foodImg, foodX, foodY);
        if (snakeHeadX === foodX && snakeHeadY === foodY) {
            snakeTail.push([foodX, foodY]);
            updateScore();
            placeFood();
        }
        drawSnake();
    } else {
        updateHighestScore();
        document.getElementById("endScore").innerHTML = score;
        document.getElementById("endHighestScore").innerHTML = highestScore;
        gameOver.classList.add("show");
        document.getElementById("displayGameOverMsg").innerHTML = "Game Over";
    }
}

function drawSnake() {
    if (snakeDirectionX != 0 || snakeDirectionY != 0) {
        for (let i = snakeTail.length - 1; i > 0; --i) {
            snakeTail[i] = snakeTail[i - 1];
        }
        if (snakeTail.length > 0) {
            snakeTail[0] = [snakeHeadX, snakeHeadY];
        }
    }
    context.fillStyle = "LightGreen";
    snakeHeadX += snakeDirectionX * boardSize;
    snakeHeadY += snakeDirectionY * boardSize;
    context.strokeStyle = "Black";
    context.fillRect(snakeHeadX, snakeHeadY, boardSize, boardSize);
    context.strokeRect(snakeHeadX, snakeHeadY, boardSize, boardSize);
    for (let i = 0; i < snakeTail.length; ++i) {
        context.fillRect(snakeTail[i][0], snakeTail[i][1], boardSize, boardSize);
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * boardSize;
    foodY = Math.floor(Math.random() * rows) * boardSize;
}

function changeDirection(event) {
    if (event.code === "ArrowUp" && snakeDirectionY != 1) {
        snakeDirectionX = 0;
        snakeDirectionY = -1;
    } else if (event.code === "ArrowDown" && snakeDirectionY != -1) {
        snakeDirectionX = 0;
        snakeDirectionY = 1;
    } else if (event.code === "ArrowLeft" && snakeDirectionX != 1 && snakeDirectionY != 0) {
        snakeDirectionX = -1;
        snakeDirectionY = 0;
    } else if (event.code === "ArrowRight" && snakeDirectionX != -1) {
        snakeDirectionX = 1;
        snakeDirectionY = 0;
    }
}

function updateScore() {
    ++score;
    document.getElementById("score").innerHTML = score;
}

function updateHighestScore() {
    if (highestScore <= score) {
        highestScore = score;
    }
    document.getElementById("highestScore").innerHTML = highestScore;
}

function checkIfGameOver() {
    if (snakeHeadX < 0 || snakeHeadX >= columns * boardSize ||
    snakeHeadY < 0 || snakeHeadY >= rows * boardSize) {
        return true;
    }
    for (let i = 0; i < snakeTail.length; ++i) {
        if (snakeHeadX === snakeTail[i][0] && snakeHeadY === snakeTail[i][1]) {
            return true;
        }
    }
    return false;
}