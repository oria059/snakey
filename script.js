var canvas = document.getElementById("snake-board");

var ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

var xSections = 20;
var ySections = 20;

// height == width probably a good idea
var sectionWidth = canvas.width / xSections;
var sectionHeight = canvas.height / ySections;

var sections = [];
var xSectionCoord = 0;
var ySectionCoord = 0;

for (c = 0; c < ySections; c++) {
  sections[c] = [];
  for (r = 0; r < xSections; r++) {
    sections[c][r] = { x: xSectionCoord, y: ySectionCoord, status: 0 };
  }
  ySectionCoord += sectionWidth;
  xSectionCoord += sectionHeight;
}

var xSnake = canvas.width / 2;
var ySnake = canvas.height / 2;
var snakeBody = [];
var snakeLength = 1;

var score = 0;

var directions = ["left", "right", "up", "down"];
var direction = "right";

document.addEventListener("keydown", keyDownHandler, false);

var speed = 600;
var snakeColor = "#0095DD";

function keyDownHandler(e) {
  // left key
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    console.log("key pressed: ");
    console.log(e.keyCode);
    if (e.keyCode == 39) {
      direction = "left";
      //    moveLeft();
    } else if (e.keyCode == 37) {
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

function moveSnake() {
  if (direction == "left" && xSnake > 0) {
    moveLeft();
  } else if (direction == "right" && xSnake < canvas.width) {
    moveRight();
  } else if (direction == "up" && ySnake < canvas.height) {
    moveUp();
  } else if (direction == "down" && ySnake > 0) {
    moveDown();
  }
}

function moveLeft() {
  xSnake = xSnake + sectionWidth;
}

function moveRight() {
  xSnake = xSnake - sectionWidth;
}

function moveUp() {
  ySnake = ySnake - sectionHeight;
}

function moveDown() {
  ySnake = ySnake + sectionHeight;
}

function drawSnake() {
  snakeBody.push({ x: xSnake, y: ySnake });

  if (snakeBody.length > snakeLength) {
    ctx.clearRect(snakeBody[0].x, snakeBody[0].y, sectionWidth, sectionHeight);
    // ctx.fillStyle = "black";
    // ctx.fillRect(snakeBody[0].x, snakeBody[0].y, sectionWidth, sectionHeight);
    snakeBody.shift();
  }
  ctx.fillStyle = snakeColor;
  ctx.fillRect(xSnake, ySnake, sectionWidth, sectionHeight);
}

function draw() {
  //  console.log("draw");
  moveSnake();
  drawSnake();
}

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setInterval(draw, speed);
}

start();
