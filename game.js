const LEVELS = [
  {
    id: 1,
    name: "Green Ascent",
    start: { x: 60, y: 420 },
    goal: { x: 890, y: 80, w: 35, h: 70 },
    platforms: [
      { x: 0, y: 500, w: 960, h: 40 },
      { x: 120, y: 440, w: 170, h: 16 },
      { x: 340, y: 390, w: 160, h: 16 },
      { x: 560, y: 330, w: 130, h: 16 },
      { x: 740, y: 260, w: 130, h: 16 },
      { x: 600, y: 180, w: 120, h: 16 },
      { x: 810, y: 130, w: 120, h: 16 }
    ],
    coins: [
      { x: 250, y: 400 }, { x: 420, y: 350 }, { x: 635, y: 290 }, { x: 790, y: 220 }, { x: 860, y: 90 }
    ],
    hazards: [
      { x: 490, y: 500, w: 80, h: 40 },
      { x: 700, y: 500, w: 120, h: 40 }
    ],
    enemies: [{ x: 360, y: 370, min: 340, max: 500, speed: 60 }]
  },
  {
    id: 2,
    name: "Crystal Cavern",
    start: { x: 40, y: 460 },
    goal: { x: 900, y: 95, w: 35, h: 65 },
    platforms: [
      { x: 0, y: 500, w: 960, h: 40 },
      { x: 70, y: 455, w: 120, h: 16 },
      { x: 240, y: 410, w: 145, h: 16 },
      { x: 450, y: 360, w: 120, h: 16 },
      { x: 260, y: 305, w: 140, h: 16 },
      { x: 80, y: 250, w: 130, h: 16 },
      { x: 280, y: 205, w: 140, h: 16 },
      { x: 500, y: 160, w: 160, h: 16 },
      { x: 730, y: 130, w: 150, h: 16 }
    ],
    coins: [
      { x: 125, y: 420 }, { x: 315, y: 375 }, { x: 515, y: 325 }, { x: 330, y: 270 },
      { x: 145, y: 215 }, { x: 355, y: 170 }, { x: 780, y: 95 }
    ],
    hazards: [
      { x: 390, y: 500, w: 90, h: 40 },
      { x: 670, y: 500, w: 110, h: 40 }
    ],
    enemies: [
      { x: 260, y: 390, min: 240, max: 385, speed: 75 },
      { x: 760, y: 110, min: 730, max: 880, speed: 80 }
    ]
  },
  {
    id: 3,
    name: "Obsidian Tower",
    start: { x: 50, y: 460 },
    goal: { x: 902, y: 40, w: 40, h: 70 },
    platforms: [
      { x: 0, y: 500, w: 960, h: 40 },
      { x: 80, y: 445, w: 90, h: 16 },
      { x: 220, y: 400, w: 100, h: 16 },
      { x: 380, y: 355, w: 100, h: 16 },
      { x: 540, y: 305, w: 100, h: 16 },
      { x: 700, y: 255, w: 95, h: 16 },
      { x: 560, y: 205, w: 95, h: 16 },
      { x: 390, y: 155, w: 95, h: 16 },
      { x: 220, y: 110, w: 95, h: 16 },
      { x: 500, y: 70, w: 160, h: 16 },
      { x: 770, y: 35, w: 170, h: 16 }
    ],
    coins: [
      { x: 110, y: 410 }, { x: 255, y: 365 }, { x: 410, y: 320 }, { x: 575, y: 270 },
      { x: 735, y: 220 }, { x: 595, y: 170 }, { x: 430, y: 120 }, { x: 255, y: 75 }, { x: 560, y: 35 }, { x: 830, y: 15 }
    ],
    hazards: [
      { x: 160, y: 500, w: 90, h: 40 },
      { x: 430, y: 500, w: 100, h: 40 },
      { x: 760, y: 500, w: 120, h: 40 }
    ],
    enemies: [
      { x: 230, y: 380, min: 220, max: 320, speed: 90 },
      { x: 560, y: 285, min: 540, max: 640, speed: 95 },
      { x: 530, y: 50, min: 500, max: 660, speed: 100 }
    ]
  }
];

const DIFFICULTIES = {
  easy: { label: "Easy", gravity: 1050, jump: 520, speed: 240, lives: 5, enemyMult: 0.7, rewardMult: 0.9 },
  normal: { label: "Normal", gravity: 1200, jump: 500, speed: 260, lives: 3, enemyMult: 1.0, rewardMult: 1.0 },
  hard: { label: "Hard", gravity: 1380, jump: 470, speed: 285, lives: 2, enemyMult: 1.25, rewardMult: 1.4 }
};

const state = {
  screen: "menu",
  money: Number(localStorage.getItem("platformerMoney") || 0),
  bestTime: Number(localStorage.getItem("platformerBest") || 0),
  selectedDifficulty: "normal",
  selectedLevelId: 1,
  elapsed: 0,
  levelCoins: 0,
  lives: 3,
  level: null,
  player: null,
  keys: {},
  raf: null,
  runStart: 0
};

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const difficultyButtons = document.getElementById("difficulty-buttons");
const levelButtons = document.getElementById("level-buttons");
const moneyValue = document.getElementById("money-value");
const bestTimeValue = document.getElementById("best-time");
const hudLevel = document.getElementById("hud-level");
const hudDifficulty = document.getElementById("hud-difficulty");
const hudCoins = document.getElementById("hud-coins");
const hudTime = document.getElementById("hud-time");
const hudLives = document.getElementById("hud-lives");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function initMenu() {
  difficultyButtons.innerHTML = "";
  Object.entries(DIFFICULTIES).forEach(([key, d]) => {
    const button = document.createElement("button");
    button.textContent = d.label;
    if (state.selectedDifficulty === key) button.classList.add("selected");
    button.addEventListener("click", () => {
      state.selectedDifficulty = key;
      initMenu();
    });
    difficultyButtons.appendChild(button);
  });

  levelButtons.innerHTML = "";
  LEVELS.forEach((level) => {
    const button = document.createElement("button");
    button.textContent = `Level ${level.id}: ${level.name}`;
    if (state.selectedLevelId === level.id) button.classList.add("selected");
    button.addEventListener("click", () => {
      state.selectedLevelId = level.id;
      initMenu();
      startLevel(level.id);
    });
    levelButtons.appendChild(button);
  });

  moneyValue.textContent = state.money.toFixed(0);
  bestTimeValue.textContent = state.bestTime ? `${state.bestTime.toFixed(1)}s` : "--";
}

function showModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("open-help").addEventListener("click", () => {
  showModal(
    "How to Play",
    "Move: A/D or Left/Right. Jump: Space, W, or Up. Reach the green portal. Pick up coins for extra rewards and avoid red hazards / orange enemies."
  );
});

document.getElementById("back-menu").addEventListener("click", backToMenu);
document.getElementById("restart-level").addEventListener("click", () => startLevel(state.selectedLevelId));

function backToMenu() {
  state.screen = "menu";
  if (state.raf) cancelAnimationFrame(state.raf);
  menuScreen.classList.add("active");
  gameScreen.classList.remove("active");
  initMenu();
}

function resetPlayer(start) {
  state.player = {
    x: start.x,
    y: start.y,
    w: 28,
    h: 36,
    vx: 0,
    vy: 0,
    onGround: false
  };
}

function startLevel(levelId) {
  closeModal();
  const difficulty = DIFFICULTIES[state.selectedDifficulty];
  state.level = JSON.parse(JSON.stringify(LEVELS.find((l) => l.id === levelId)));
  state.selectedLevelId = levelId;
  state.elapsed = 0;
  state.levelCoins = 0;
  state.lives = difficulty.lives;
  state.runStart = performance.now();
  resetPlayer(state.level.start);

  state.level.enemies.forEach((enemy) => {
    enemy.dir = 1;
  });

  hudLevel.textContent = `${state.level.id} - ${state.level.name}`;
  hudDifficulty.textContent = difficulty.label;
  hudCoins.textContent = "0";
  hudTime.textContent = "0.0";
  hudLives.textContent = String(state.lives);

  state.screen = "game";
  menuScreen.classList.remove("active");
  gameScreen.classList.add("active");

  if (state.raf) cancelAnimationFrame(state.raf);
  let last = performance.now();
  const loop = (now) => {
    const dt = Math.min((now - last) / 1000, 0.04);
    last = now;
    update(dt);
    draw();
    if (state.screen === "game") state.raf = requestAnimationFrame(loop);
  };
  state.raf = requestAnimationFrame(loop);
}

function rectsCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function loseLife(reason) {
  state.lives -= 1;
  hudLives.textContent = String(state.lives);
  if (state.lives <= 0) {
    showModal("Game Over", `You lost all lives (${reason}). Try again!`);
    backToMenu();
    return;
  }
  resetPlayer(state.level.start);
}

function finishLevel() {
  const runTime = (performance.now() - state.runStart) / 1000;
  const baseReward = 100 + state.level.id * 70;
  const coinReward = state.levelCoins * 25;
  const speedBonus = Math.max(0, Math.round((150 - runTime) * 1.5));
  const total = Math.round((baseReward + coinReward + speedBonus) * DIFFICULTIES[state.selectedDifficulty].rewardMult);

  state.money += total;
  localStorage.setItem("platformerMoney", String(state.money));

  if (!state.bestTime || runTime < state.bestTime) {
    state.bestTime = runTime;
    localStorage.setItem("platformerBest", String(state.bestTime));
  }

  showModal("Level Complete!", `You earned $${total}. Coins: ${state.levelCoins}. Time: ${runTime.toFixed(1)}s.`);
  backToMenu();
}

function update(dt) {
  const difficulty = DIFFICULTIES[state.selectedDifficulty];
  state.elapsed += dt;
  hudTime.textContent = state.elapsed.toFixed(1);

  const player = state.player;
  const speed = difficulty.speed;
  player.vx = 0;
  if (state.keys.ArrowLeft || state.keys.KeyA) player.vx = -speed;
  if (state.keys.ArrowRight || state.keys.KeyD) player.vx = speed;

  if ((state.keys.Space || state.keys.ArrowUp || state.keys.KeyW) && player.onGround) {
    player.vy = -difficulty.jump;
    player.onGround = false;
  }

  player.vy += difficulty.gravity * dt;

  player.x += player.vx * dt;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;

  player.y += player.vy * dt;
  player.onGround = false;

  for (const p of state.level.platforms) {
    if (rectsCollide(player, p)) {
      if (player.vy > 0 && player.y + player.h - p.y < 22) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = p.y + p.h;
        player.vy = 10;
      }
    }
  }

  if (player.y > canvas.height + 20) {
    loseLife("falling");
    return;
  }

  state.level.coins = state.level.coins.filter((coin) => {
    const box = { x: coin.x - 8, y: coin.y - 8, w: 16, h: 16 };
    if (rectsCollide(player, box)) {
      state.levelCoins += 1;
      hudCoins.textContent = String(state.levelCoins);
      return false;
    }
    return true;
  });

  for (const hz of state.level.hazards) {
    if (rectsCollide(player, hz)) {
      loseLife("hazards");
      return;
    }
  }

  for (const e of state.level.enemies) {
    e.x += e.speed * difficulty.enemyMult * e.dir * dt;
    if (e.x < e.min) { e.x = e.min; e.dir = 1; }
    if (e.x > e.max) { e.x = e.max; e.dir = -1; }
    const eBox = { x: e.x, y: e.y || 0, w: 22, h: 22 };
    if (!e.y) {
      const support = state.level.platforms.find((p) => e.x + 20 >= p.x && e.x <= p.x + p.w);
      e.y = support ? support.y - 22 : 478;
      eBox.y = e.y;
    }
    if (rectsCollide(player, eBox)) {
      loseLife("enemies");
      return;
    }
  }

  if (rectsCollide(player, state.level.goal)) {
    finishLevel();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#7bc477";
  state.level.platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));

  ctx.fillStyle = "#d94b5a";
  state.level.hazards.forEach((h) => ctx.fillRect(h.x, h.y, h.w, h.h));

  ctx.fillStyle = "#f7d046";
  state.level.coins.forEach((coin) => {
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#f48b45";
  state.level.enemies.forEach((e) => {
    const y = e.y || 478;
    ctx.fillRect(e.x, y, 22, 22);
  });

  ctx.fillStyle = "#63f58f";
  const g = state.level.goal;
  ctx.fillRect(g.x, g.y, g.w, g.h);

  const p = state.player;
  ctx.fillStyle = "#2f335b";
  ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.fillStyle = "#c7e2ff";
  ctx.fillRect(p.x + 6, p.y + 8, 5, 5);
  ctx.fillRect(p.x + 17, p.y + 8, 5, 5);
}

window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
  state.keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  state.keys[e.code] = false;
});

initMenu();
