const cnv = document.getElementById('cnv');
/** @type {CanvasRenderingContext2D} */
const context = cnv.getContext('2d');
const SQUARE_SIZE = 10;


function FoodNode(x,y) {
    this.x = x;
    this.y = y;
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

var gameOver;
var score;
var dir;
var snake; 

function game_restart() {
    snake = new Array();
    snake.push(new Node(5,5));
    snake.push(new Node(6,5));
    snake.push(new Node(7,5));
    food = gen_food_coords();
    score = 0;
    sync_score();
    dir = 'right';
    gameOver = false;
}
game_restart();

function game_over() {
    context.fillStyle = 'white';
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    context.font = 'bold 15px sans-serif';
    context.textAlign= 'center';
    context.textBaseline = 'center';
    context.fillStyle = 'red';
    context.fillText('Game Over',context.canvas.width/2,context.canvas.height/2);
    context.strokeText('Game Over',context.canvas.width/2,context.canvas.height/2);
    //clearInterval(game);
    sleep(2000);
    //game = setInterval(mainSycle,300);
    game_restart();
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    context.fillStyle = 'white';
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    context.font = 'bold 15px sans-serif';
    context.textAlign= 'center';
    context.textBaseline = 'center';
    context.fillStyle = 'red';
    context.fillText('Game Over',context.canvas.width/2,context.canvas.height/2);
    context.strokeText('Game Over',context.canvas.width/2,context.canvas.height/2);
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function make_n_head() {
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
    return nHead;
}

function move(){
    let nHead = make_n_head();

    if (in_snake(nHead.x,nHead.y)) {
        game_over();
        return;
    }
    
    snake.push(nHead);
    if (food.x == nHead.x && food.y == nHead.y) {
        food = gen_food_coords();
        score++;
        sync_score();
        return;
    }
    snake.splice(0,1);
}

function sync_score() {
    document.getElementById("score").innerHTML = score;
}

var keyFunc = function(e) {
    switch (e.keyCode) {
        case 37: if (dir != 'right') dir = 'left';
        break;
        case 38: if (dir != 'down') dir = 'up';
        break;
        case 39: if (dir != 'left') dir = 'right';
        break;
        case 40: if (dir != 'up') dir = 'down';
        break;
    }
}
document.addEventListener("keydown",keyFunc);

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

function mainSycle() {
    move();
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    snake.forEach(function(e){
        e.draw();
    })
    food.draw();
}

let game = setInterval(mainSycle,300);