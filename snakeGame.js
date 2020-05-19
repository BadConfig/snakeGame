const cnv = document.getElementById('cnv');
/** @type {CanvasRenderingContext2D} */
const context = cnv.getContext('2d');


const SQUARE_SIZE = 10;
context.fillStyle = 'green';
var snake = new Array()
function Node(x,y) {
   this.x = x;
   this.y = y;
   this. draw = function(){
        context.fillStyle = 'green';
       if (this.x*SQUARE_SIZE+SQUARE_SIZE > cnv.width) this.x = 0;
       if (this.y*SQUARE_SIZE+SQUARE_SIZE > cnv.height) this.y = 0;
       if (this.x*SQUARE_SIZE < 0) this.x = cnv.width/SQUARE_SIZE-1;
       if (this.y * SQUARE_SIZE < 0) this.y = cnv.height/SQUARE_SIZE-1;
       context.fillRect(
           this.x*SQUARE_SIZE,
           this.y*SQUARE_SIZE,
           SQUARE_SIZE,
           SQUARE_SIZE,
        )
        context.fillStyle = 'black';
        context.strokeRect(
           this.x*SQUARE_SIZE,
           this.y*SQUARE_SIZE,
           SQUARE_SIZE,
           SQUARE_SIZE,
        )
   }
}
snake.push(new Node(5,5));
snake.push(new Node(6,5));
snake.push(new Node(7,5));

var gameOver = false;
function makeButton() {

}

function gameOver() {
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    context.font = 'bold 15px sans-serif';
    context.textAlign= 'center';
    context.textBaseline = 'center';
    context.fillText('Game Over',context.canvas.width/2,context.canvas.height/2);
    context.strokeText('Game Over',context.canvas.width/2,context.canvas.height/2);
    clearInterval(game);
    gameOver = true;
    return; 
}

var score = 0;
var dir = 'right';
function move(){
    var Head = snake[snake.length-1];
    let nHead = {}
    nHead = Object.assign(nHead,Head);
    switch (dir) {
        case 'up':
            nHead.y-=1;
            break;
        case 'down':
            nHead.y+=1;
            break;
        case 'left':
            nHead.x-=1;
            break;
        case 'right':
            nHead.x+=1;
            break;
    }

    if (in_snake(nHead.x,nHead.y)) {
        gameOver();
        return;
    }
    
    snake.push(nHead);
    if (food.x == nHead.x && food.y == nHead.y) {
        food = gen_food_coords();
        score++;
        document.getElementById("score").innerHTML = score;
        return;
    }
    snake.splice(0,1);
}

function game_restart() {

}

function FoodNode(x,y) {
    this.x = x;
    this.y = y
    this.draw = function() {
        context.fillStyle = 'purple';
        context.fillRect(
           this.x*SQUARE_SIZE,
           this.y*SQUARE_SIZE,
           SQUARE_SIZE,
           SQUARE_SIZE,
        )
        context.fillStyle = 'black';
        context.strokeRect(
           this.x*SQUARE_SIZE,
           this.y*SQUARE_SIZE,
           SQUARE_SIZE,
           SQUARE_SIZE,
        )
    }
}


var keyFunc = function(e) {
    switch (e.keyCode) {
        case 37: dir = 'left';
        break;
        case 38: dir = 'up';
        break;
        case 39: dir = 'right';
        break;
        case 40: dir = 'down';
        break;
    }
}
document.addEventListener("keydown",keyFunc)

function in_snake(x,y) {
    for( let i = 0; i < snake.length; ++i) {
        if ( snake[i].x == x && snake[i].y == y) return true;
    }
    return false;
}
function gen_food_coords() {
    let x = Math.floor(Math.random()*(cnv.width/SQUARE_SIZE));
    let y = Math.floor(Math.random()*(cnv.width/SQUARE_SIZE));
    while (in_snake(x,y)) {
        let x = Math.floor(Math.random()*(cnv.width/SQUARE_SIZE));
        let y = Math.floor(Math.random()*(cnv.width/SQUARE_SIZE));
    }
    return new FoodNode(x,y);
}

var food = gen_food_coords();
function mainSycle() {
    move();
    if ( gameOver == true) {
        clearInterval(game);
        return;
    }
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    snake.forEach(function(e){
        e.draw();
    })
    food.draw();
}

let game = setInterval(mainSycle,300);