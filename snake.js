const blockStr = 25;
const rad = 15;
const col = 17;
let spillBrett;
let context;

let snakeX = blockStr * 5
let snakeY = blockStr * 5
let fartX = 0;
let fartY = 0;
let snakeBody = []

let epleX;
let epleY;

let score = 0;

let gameOver = false;

window.onload = function () {

    spillBrett = document.getElementById("spillBrett");
    spillBrett.height = rad * blockStr;
    spillBrett.width = col * blockStr;
    context = spillBrett.getContext("2d");

    fartX = 1;
    fartY = 0;

    snakeBody = [
        [snakeX - blockStr, snakeY],
        [snakeX - 2 * blockStr, snakeY]
    ];

    flyttEple();
    document.addEventListener("keydown", endreRetning);
    setInterval(update, 1000 / 10)
}

function update() {
    if (gameOver) return;

    context.fillStyle = "rgb(81, 235, 71)";
    context.fillRect(0, 0, spillBrett.width, spillBrett.height);

    for (let r = 0; r < rad; r++) {
        for (let c = 0; c < col; c++) {
            if ((r + c) % 2 != 0) {
                context.fillStyle = "rgb(158, 235, 71)";
                context.fillRect(c * blockStr, r * blockStr, blockStr, blockStr);
            }
        }
    }

    context.fillStyle = "red";
    context.fillRect(epleX, epleY, blockStr, blockStr);

    if (snakeX == epleX && snakeY == epleY) {
        snakeBody.push([epleX, epleY])
        flyttEple();
        oppdaterScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "rgb(91, 105, 215)";
    snakeX += fartX * blockStr;
    snakeY += fartY * blockStr;
    context.fillRect(snakeX, snakeY, blockStr, blockStr);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockStr, blockStr);
    }

    if (snakeX < 0 || snakeX >= col * blockStr || snakeY < 0 || snakeY >= rad * blockStr) {
        gameOverFunc();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOverFunc();
        }
    }
}

function oppdaterScore() {
    score++;
    document.getElementById("scoreTeller").innerText = "Score: " + score;
}

function gameOverFunc() {
    gameOver = true;
    alert("Game Over");

    score = 0;
    document.getElementById("scoreTeller").innerText = "Score: 0";

    snakeX = blockStr * 5
    snakeY = blockStr * 5
    fartX = 1;
    fartY = 0;
    snakeBody = [
        [snakeX - blockStr, snakeY],
        [snakeX - 2 * blockStr, snakeY]
    ];
    gameOver = false;

    flyttEple();
}

function endreRetning(f) {
    if (f.code == "ArrowUp" && fartY != 1) {
        fartX = 0;
        fartY = -1;
    }
    else if (f.code == "ArrowDown" && fartY != -1) {
        fartX = 0;
        fartY = 1;
    }
    else if (f.code == "ArrowLeft" && fartX != 1) {
        fartX = -1;
        fartY = 0;
    }
    else if (f.code == "ArrowRight" && fartX != -1) {
        fartX = 1;
        fartY = 0;
    }
}

function flyttEple() {
    epleX = Math.floor(Math.random() * col) * blockStr
    epleY = Math.floor(Math.random() * rad) * blockStr
}


