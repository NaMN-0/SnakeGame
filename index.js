WebFont.load({
    google: {
        families: ['Indie Flower']
    }
});

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Create the unit

const box = 30;

const x0 = 0;
const xn = 39;
const y0 = 3;
const yn = 19;

// Create the snake

let snake = [];
snake[0] = {
    x : Math.floor(Math.random()*(xn-x0)+x0)*box,
    y : Math.floor(Math.random()*(yn-y0)+y0)*box
}

// create the food

let food = {
    x : Math.floor(Math.random()*(xn-x0)+x0)*box,
    y : Math.floor(Math.random()*(yn-y0)+y0)*box
}

// create the score

let score = 0;

// control the snake

document.addEventListener("keydown",direction);
let d;
function direction(e){
    let key = e.keyCode;
    e.preventDefault();
    if((key==37)&&(d!="right")){
        d="left";
    }
    else if((key==38)&&(d!="down")){
        d="up";
    }
    else if((key==39)&&(d!="left")){
        d="right";
    }
    else if((key==40)&&(d!="up")){
        d="down";
    }
}

// Collision Checker

function collision(snakeHead,snake){
    for(let i=0;i<snake.length;i++){
        if((snakeHead.x==snake[i].x)&&(snakeHead.y==snake[i].y)){
            return true;
        }
    }
    return false;
}

// Restart

function gameOver(){
    clearInterval(game);
    document.location.href = "";
}

// draw the canvas

function draw(){

    // background

    for(let i=0;i<=xn;i++){
        for(let j=0;j<=yn;j++){
            if((i<x0)||(j<y0)){
                ctx.fillStyle = "black";
                ctx.fillRect(box*i,box*j,box,box);
            }
            else{
                if(i%2){
                    ctx.fillStyle = "#7CFC00";
                }
                else{
                    ctx.fillStyle = "#32CD32";
                }
                ctx.fillRect(box*i,box*j,box,box);
            }
        }
    }
    // snake
    for(let i=0;i<snake.length;i++){
        if(i==0){
            ctx.fillStyle = "black";
            ctx.fillRect(snake[i].x,snake[i].y,box,box);
        }
        else{
            const liteBox = box-6;
            ctx.fillStyle = "white";
            ctx.fillRect(snake[i].x+3,snake[i].y+3,liteBox,liteBox);
        }
    }

    // food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x+4,food.y+4,box-8,box-8);

    // snake movement
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d=="left") snakeX-=box;
    if(d=="right") snakeX+=box;
    if(d=="down") snakeY+=box;
    if(d=="up") snakeY-=box;

    // If snake eats food
    if((snakeX==food.x)&&(snakeY==food.y)){
        score++;
        food = {
            x : Math.floor(Math.random()*(xn-x0)+x0)*box,
            y : Math.floor(Math.random()*(yn-y0)+y0)*box
        }
    }
    else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if((snakeX<x0*box)||(snakeX>xn*box)||(snakeY<y0*box)||(snakeY>yn*box)||collision(newHead,snake)){
        gameOver();
    }
    snake.unshift(newHead);

    // score

    ctx.fillStyle = "white";
    ctx.font = "45px Indie Flower";
    ctx.fillText("Score : "+score,31*box,2*box);

}

// calling draw function
// set speed
const speed = 70;

let game = setInterval(draw,speed); 