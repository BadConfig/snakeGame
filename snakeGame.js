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
   }
}
snake.push(new Node(5,5));
snake.push(new Node(6,5));
snake.push(new Node(7,5));


var dir = 'left';
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
    console.log(dir);
    
    snake.push(nHead);
    if (food.x == nHead.x && food.y == nHead.y) {
        food = new Node(Math.floor(Math.random()*(cnv.width/SQUARE_SIZE)),Math.floor(Math.random()*(cnv.height/SQUARE_SIZE)));
        return;
    }
    snake.splice(0,1);
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



var food = new Node(Math.floor(Math.random()*(cnv.width/SQUARE_SIZE)),Math.floor(Math.random()*(cnv.height/SQUARE_SIZE)));
function mainSycle() {
    console.log(food);
    move();
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    snake.forEach(function(e){
        e.draw();
    })
    food.draw();
}

let game = setInterval(mainSycle,1000);