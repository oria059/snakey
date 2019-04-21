var canvas = document.getElementById("snake-board");

var ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

var speed = 100;
// var xSections = 20;
// var ySections = 20;
var sectionNums = { x: 20, y: 20 }; // number of sections

// height == width probably a good idea
var sectionWidth = canvas.width / sectionNums.x;
var sectionHeight = canvas.height / sectionNums.y;

// var sections = [];
// var xSectionCoord = 0;
// var ySectionCoord = 0;

// for (c = 0; c < sections.y; c++) {
//   sections[c] = [];
//   for (r = 0; r < sections.x; r++) {
//     sections[c][r] = { x: xSectionCoord, y: ySectionCoord, status: 0 };
//   }
//   ySectionCoord += sectionWidth;
//   xSectionCoord += sectionHeight;
// }

// var xSnake = canvas.width / 2;
// var ySnake = canvas.height / 2;
var snakeHead = { x: canvas.width / 2, y: canvas.height / 2 };
var snake = [snakeHead];
var snakeLength = 1;

var score = 0;

var directions = ["left", "right", "up", "down"];
var direction = "right";

document.addEventListener("keydown", keyDownHandler, false);

// var leftButton = document.getElementById("left")[0];
// var rightButton = document.getElementById("right")[0];
// var upButton = document.getElementById("up")[0];
// var downButton = document.getElementById("down")[0];
// document.addEventListener("click", upClick, false);
// document.addEventListener("click", upClick, false);

document.getElementById("up").addEventListener("click", upClick);
document.getElementById("down").addEventListener("click", downClick);
document.getElementById("left").addEventListener("click", leftClick);
document.getElementById("right").addEventListener("right", rightClick);

var snakeColor = "#0095DD";

var snack = { x: -1, y: -1 };
var snackColor = "red";

function keyDownHandler(e) {
  // left key
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    console.log("key pressed: ");
    console.log(e.keyCode);
    if (e.keyCode == 37) {
      direction = "left";
      //    moveLeft();
    } else if (e.keyCode == 39) {
      direction = "right";
      //      moveRight();
    } else if (e.keyCode == 38) {
      direction = "up";
      //      moveUp();
    } else if (e.keyCode == 40) {
      direction = "down";
      //    moveDown();
    }
    //  drawSnake(direction);
  }
}

function upClick(e) {
  direction = "up";
}
function downClick(e) {
  direction = "down";
}
function leftClick(e) {
  direction = "left";
}
function rightClick(e) {
  direction = "right";
}

// fix later
function moveSnake() {
  if (direction == "left" && snake[0].x > 0) {
    moveLeft();
  } else if (direction == "right" && snake[0].x < canvas.width) {
    moveRight();
  } else if (direction == "up" && snake[0].y > 0) {
    moveUp();
  } else if (direction == "down" && snake[0].y < canvas.height) {
    moveDown();
  }
}

function moveLeft() {
  snake.unshift({ x: snake[0].x - sectionWidth, y: snake[0].y });
  //snake[0].x = snake[0].x + sectionWidth;
}

function moveRight() {
  snake.unshift({ x: snake[0].x + sectionWidth, y: snake[0].y });
  //snake[0].x = snake[0].x - sectionWidth;
}

function moveUp() {
  snake.unshift({ x: snake[0].x, y: snake[0].y - sectionHeight });
  // snake[0].y = snake[0].y - sectionHeight;
}

function moveDown() {
  snake.unshift({ x: snake[0].x, y: snake[0].y + sectionHeight });
  // snake[0].y = snake[0].y + sectionHeight;
}

function snackIsOnSnake(body) {
  return body.x == snack.x && body.y == snack.y;
}

function generateSnacks() {
  do {
    var xSection = Math.floor(Math.random() * sectionNums.x);
    var ySection = Math.floor(Math.random() * sectionNums.y);
    console.log(xSection);
    console.log(ySection);
    snack.x = xSection * sectionWidth;
    snack.y = ySection * sectionHeight;
  } while (snake.some(snackIsOnSnake));
}

function drawSnack() {
  ctx.fillStyle = snackColor;
  ctx.fillRect(snack.x, snack.y, sectionWidth, sectionHeight);
}

function snackIsEaten() {
  if (snake[0].x == snack.x && snake[0].y == snack.y) {
    console.log("snack eaten");
  }
  return snake[0].x == snack.x && snake[0].y == snack.y;
}

function snackCheck() {
  // no snack or snack is eaten
  if (snackIsEaten() || snack.x < 0) {
    snakeLength += 1;
    generateSnacks();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.fillRect(snake[0].x, snake[0].y, sectionWidth, sectionHeight);
  // //snake has moved
  // if (snake[0].x != snake[0].x && snake[0].y != snake[0].y) {
  //   snake.unshift({ x: snake[0].x, y: snake[0].y });
  // }
  if (snake.length > snakeLength) {
    // var itail = snake.length - 1;
    // ctx.clearRect(snake[itail].x, snake[itail].y, sectionWidth, sectionHeight);
    // ctx.fillStyle = "black";
    // ctx.fillRect(snake[0].x, snake[0].y, sectionWidth, sectionHeight);
    snake.pop();
  }
  snake.forEach(function(body) {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(body.x, body.y, sectionWidth, sectionHeight);
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  //  console.log("draw");
  moveSnake();
  clearCanvas();
  drawSnake();
  snackCheck();
  drawSnack();
}

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setInterval(draw, speed);
}

start();
