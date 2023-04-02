const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;

const objectWidth = 20;
const objectHeight = 20;
let objectX = Math.random() * (canvas.width - objectWidth);
let objectY = 0;
const objectSpeed = 2;

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawObject() {
  ctx.beginPath();
  ctx.rect(objectX, objectY, objectWidth, objectHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawObject();

  objectY += objectSpeed;

  if (objectY > canvas.height) {
    objectX = Math.random() * (canvas.width - objectWidth);
    objectY = 0;
  }

  if (
    objectY + objectHeight > canvas.height - playerHeight &&
    objectX > playerX - objectWidth &&
    objectX < playerX + playerWidth
  ) {
    objectX = Math.random() * (canvas.width - objectWidth);
    objectY = 0;
  }

  requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    playerX += playerSpeed;
    if (playerX + playerWidth > canvas.width) {
      playerX = canvas.width - playerWidth;
    }
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    playerX -= playerSpeed;
    if (playerX < 0) {
      playerX = 0;
    }
  }
}

updateGame();
