const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;

const objectWidth = 20;
const objectHeight = 20;
const objectSpeed = 2;
const numberOfObjects = 5;
let objects = [];

function initObjects() {
  for (let i = 0; i < numberOfObjects; i++) {
    objects.push({
      x: Math.random() * (canvas.width - objectWidth),
      y: -objectHeight - i * (canvas.height / numberOfObjects),
    });
  }
}

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawObject(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, objectWidth, objectHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

let score = 0;

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  objects.forEach((object) => drawObject(object.x, object.y));
  drawScore();

  objects.forEach((object) => {
    object.y += objectSpeed;

    if (object.y > canvas.height) {
      object.x = Math.random() * (canvas.width - objectWidth);
      object.y = -objectHeight;
    }

    if (
      object.y + objectHeight > canvas.height - playerHeight &&
      object.x > playerX - objectWidth &&
      object.x < playerX + playerWidth
    ) {
      score++;
      object.x = Math.random() * (canvas.width - objectWidth);
      object.y = -objectHeight;
    }
  });

  if (score >= 20) {
    gameOver();
  } else {
    requestAnimationFrame(updateGame);
  }
}

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Game Over! Final Score: " + score, canvas.width / 2 - 120, canvas.height / 2);
}

document.addEventListener("keydown", keyDownHandler,
