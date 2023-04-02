const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;

const bulletWidth = 5;
const bulletHeight = 10;
const bulletSpeed = 7;
let bullets = [];

const enemyWidth = 30;
const enemyHeight = 30;
const enemySpeed = 2;
let enemies = [];
const maxEnemies = 5;

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBullet(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, bulletWidth, bulletHeight);
  ctx.fillStyle = "#FFFF00";
  ctx.fill();
  ctx.closePath();
}

function drawEnemy(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, enemyWidth, enemyHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function spawnEnemy() {
  if (enemies.length < maxEnemies) {
    enemies.push({
      x: Math.random() * (canvas.width - enemyWidth),
      y: -enemyHeight,
    });
  }
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  bullets.forEach((bullet) => drawBullet(bullet.x, bullet.y));
  enemies.forEach((enemy) => drawEnemy(enemy.x, enemy.y));

  bullets = bullets.filter((bullet) => {
    bullet.y -= bulletSpeed;
    return bullet.y + bulletHeight > 0;
  });

  enemies.forEach((enemy) => {
    enemy.y += enemySpeed;
  });

  enemies = enemies.filter((enemy) => {
    let keep = true;

    bullets.forEach((bullet) => {
      if (
        bullet.y <= enemy.y + enemyHeight &&
        bullet.x + bulletWidth >= enemy.x &&
        bullet.x <= enemy.x + enemyWidth
      ) {
        keep = false;
      }
    });

    return keep;
  });

  spawnEnemy();
  requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    playerX += playerSpeed;
    if (playerX + playerWidth > canvas.width) {
      playerX = canvas.width - playerWidth;
    }
  } else if (
