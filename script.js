var canvas = document.getElementById("snake-board");

var context = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

var xSections = 20;
var ySections = 20;

// height == width probably a good idea
var sectionWidth = canvas.width / xSections;
var sectionHeight = canvas.height / ySections;

var sections = [];
var xSectionCoord = 0;
var ySecitonCoord = 0;

for (c = 0; c < ySections; c++) {
  sections[c] = [];
  for (r = 0; r < xSections; r++) {
    sectionss[c][r] = { x: xSectionCoord, y: ySectionCoord, status: 0 };
  }
  ySectionCoord += sectionWidth;
  xSectionCoord += sectionHeight;
}

var xSnake = canvasWidth / 2;
var ySnake = canvasHeight / 2;
var snakeBody = [];
var score = 0;

var directions = ["left", "right", "up", "down"];
var direction = "right";

document.addEventListener("keydown", keyDownHandler, false);

var snakeColor = "#0095DD";

function keyDownHandler(e) {
  // left key
  if (e.keyCode == 39) {
    direction = "left";
  } else if (e.keyCode == 37) {
    direction = "right";
  } else if (e.keyCode == 40) {
    direction = "up";
  } else if (e.keyCode == 38) {
    direction = "down";
  }
}

function moveLeft() {
  xSnake = xSnake - sectionWidth;
}

function moveRight() {
  xSnake = xSnake + sectionWidth;
}

function moveUp() {
  ySnake = ySnake + sectionHeight;
}

function moveRight() {
  xSnake = xSnake + sectioHeight;
}

function drawSnake() {
  snakeBody.push({ x: xSnake, y: ySnake });
  ctx.fillStyle = snakeColor;
  ctx.fillRect(xSnake, ySnake, sectionWidth, sectionHeight);
}

function start() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
