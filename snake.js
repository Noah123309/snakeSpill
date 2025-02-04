//spillBrett
const blockStr = 25;
const rad = 20;
const col = 20;
let spillBrett;
let context;

//slangeHode
let snakeX = blockStr * 5
let snakeY = blockStr * 5

//slangeFart
let fartX = 0;
let fartY = 0;

//slangeKropp
let snakeBody = [];

//eple
let epleX;
let epleY;

//gameOver
let gameOver = false;

window.onload = function () {
    spillBrett = document.getElementById("spillBrett");
    spillBrett.height = rad * blockStr;
    spillBrett.width = col * blockStr;
    context = spillBrett.getContext("2d");

    flyttEple();
    document.addEventListener("keyup", endreRetning);
    setInterval(update, 1000 / 10)
}

function update() {
    if (gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, spillBrett.width, spillBrett.height);

    context.fillStyle = "red";
    context.fillRect(epleX, epleY, blockStr, blockStr);

    if (snakeX == epleX && snakeY == epleY) {
        snakeBody.push([epleX, epleY])
        flyttEple();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) { 
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "green";
    snakeX += fartX * blockStr;
    snakeY += fartY * blockStr;
    context.fillRect(snakeX, snakeY, blockStr, blockStr);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockStr, blockStr);
    }

    //game over conditions
    
    if (snakeX < 0 || snakeX > col*blockStr || snakeY < 0 || snakeY > rad*blockStr) {
        gameOver = true; 
        alert("Du er ferdig brur")
    } 
    
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true; 
            alert("Du er ferdig brur")
        }
    } 

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


