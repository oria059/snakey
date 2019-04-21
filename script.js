var canvas = document.getElementById("snake-board");

var ctx = canvas.getContext("2d");

canvas.width = 660;
canvas.height = 660;

var speed = 200;
var lost = false;
var paused = false;
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

window.addEventListener(
  "keydown",
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

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
document.getElementById("right").addEventListener("click", rightClick);

var snakeColor = "#0095DD";

var snack = { x: -1, y: -1 };
var snackColor = "red";

window.mobilecheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function keyDownHandler(e) {
  // left key
  if ((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode == 80) {
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
    } else if (e.keyCode == 80) {
      // p is pressed
      paused = true;
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
  // if (direction == "left" && snake[0].x > 0) {
  //   moveLeft();
  // } else if (direction == "right" && snake[0].x < canvas.width - sectionWidth) {
  //   moveRight();
  // } else if (direction == "up" && snake[0].y > 0) {
  //   moveUp();
  // } else if (
  //   direction == "down" &&
  //   snake[0].y < canvas.height - sectionHeight
  // ) {
  //   moveDown();
  // }
  if (direction == "left") {
    moveLeft();
  } else if (direction == "right") {
    moveRight();
  } else if (direction == "up") {
    moveUp();
  } else if (direction == "down") {
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

function updateScore() {
  score = snakeLength - 2;
  document.getElementById("score").innerHTML = "score: " + score;
}

function checkHitWall() {
  if (!lost) {
    if (
      snake[0].x < 0 ||
      snake[0].x > canvas.width - sectionWidth ||
      snake[0].y < 0 ||
      snake[0].y > canvas.height - sectionHeight
    ) {
      lost = true;
      alert("LOSE LOSE EEL BREAKFAST");
      document.location.reload();
    }
  }
}

function draw() {
  //  console.log("draw");
  if (!lost && !paused) {
    moveSnake();
    clearCanvas();
    drawSnake();
    snackCheck();
    drawSnack();
    updateScore();
    checkHitWall();
  }
}

function mobileCheck() {
  if (window.mobilecheck) {
    speed = 80;
  //  sectionNums = { x: 15, y: 15 }; // number of sections
    //sectionWidth = canvas.width / sectionNums.x;
    //sectionHeight = canvas.height / sectionNums.y;
    //snakeHead = { x: canvas.width / 2, y: canvas.height / 2 };
   // snake = [snakeHead];
  }
}

function start() {
 mobileCheck();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setInterval(draw, speed);
}

start();
