const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player's spaceship
const playerWidth = 30;
const playerHeight = 30;
const playerSpeed = 5;
let playerX = (canvas.width - playerWidth) / 2;

// Projectile
const projectileWidth = 5;
const projectileHeight = 10;
const projectileSpeed = 8;
let projectiles = [];

// Enemies
const enemyWidth = 30;
const enemyHeight = 30;
const enemySpeed = 2;
const numberOfEnemies = 10;
let enemies = [];

function initEnemies() {
  for (let i = 0; i < numberOfEnemies; i++) {
    enemies.push({
      x: (i * (enemyWidth + 10)) + 10,
      y: 10,
      movingRight: true,
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

function drawProjectile(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, projectileWidth, projectileHeight);
  ctx.fillStyle = "#FFD700";
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

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  projectiles.forEach((projectile) => drawProjectile(projectile.x, projectile.y));
  enemies.forEach((enemy) => drawEnemy(enemy.x, enemy.y));

  // Update projectiles
  projectiles.forEach((projectile, index) => {
    projectile.y -= projectileSpeed;

    if (projectile.y < 0) {
      projectiles.splice(index, 1);
    } else {
      enemies.forEach((enemy, enemyIndex) => {
        if (
          projectile.x >= enemy.x && projectile.x <= enemy.x + enemyWidth &&
          projectile.y >= enemy.y && projectile.y <= enemy.y + enemyHeight
        ) {
          projectiles.splice(index, 1);
          enemies.splice(enemyIndex, 1);
        }
      });
    }
  });

  // Update enemies
  enemies.forEach((enemy) => {
    if (enemy.movingRight) {
      enemy.x += enemySpeed;
      if (enemy.x + enemyWidth > canvas.width) {
        enemy.movingRight = false;
        enemy.y += enemyHeight;
      }
    } else {
      enemy.x -= enemySpeed;
      if (enemy.x < 0) {
        enemy.movingRight = true;
        enemy.y += enemyHeight;
      }
    }
  });

  if (rightPressed) {
    playerX += playerSpeed;
    if (playerX + playerWidth > canvas.width) {
      playerX = canvas.width - playerWidth;
    }
  } else if (leftPressed) {
    playerX -= playerSpeed;
    if (playerX < 0) {
      playerX = 0;
    }
  }

  if (spacePressed && !projectiles.some((p) => p.active)) {
    projectiles.push({ x: playerX + (playerWidth / 2) - (projectileWidth / 2), y: canvas.height - playerHeight - projectileHeight
                      
                      
                      
  function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.code === "Space") {
    spacePressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.code === "Space") {
    spacePressed = false;
  }
}
