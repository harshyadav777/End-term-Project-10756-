// ======================================
// ENTERTAINMENT & ENGAGEMENT PLATFORM
// Advanced 2048 Game with Full Features
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  // ============ CORE VARIABLES ============
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  let squares = [];
  const width = 4;
  let score = 0;
  let bestScore = localStorage.getItem("bestScore") || 0;
  let moves = 0;
  let combo = 0;
  let gameActive = true;
  let animationInProgress = false;

  // ============ GAME STATE TRACKING ============
  let gameState = {
    previousBoard: [],
    canUndo: false,
    totalMerges: 0,
    largestTile: 2,
    startTime: Date.now(),
    powerUpsUsed: 0
  };

  // ============ CREATE ENHANCED UI ============
  function createEnhancedUI() {
    const container = document.querySelector(".container");

    // Create stats panel
    const statsPanel = document.createElement("div");
    statsPanel.className = "stats-panel";
    statsPanel.innerHTML = `
      <div class="stat-item">
        <div class="stat-label">Best</div>
        <div id="best-score" class="stat-value">${bestScore}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Moves</div>
        <div id="moves" class="stat-value">0</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Combo</div>
        <div id="combo" class="stat-value">0x</div>
      </div>
    `;

    // Create controls panel
    const controlsPanel = document.createElement("div");
    controlsPanel.className = "controls-panel";
    controlsPanel.innerHTML = `
      <button id="restart-btn" class="game-btn">🔄 Restart</button>
      <button id="hint-btn" class="game-btn">💡 Hint</button>
      <button id="undo-btn" class="game-btn" disabled>↩️ Undo</button>
    `;

    const info = document.querySelector(".info");
    info.appendChild(statsPanel);

    const grid = document.querySelector(".grid");
    container.insertBefore(controlsPanel, grid);

    // Add event listeners
    document.getElementById("restart-btn").addEventListener("click", restartGame);
    document.getElementById("hint-btn").addEventListener("click", showHint);
    document.getElementById("undo-btn").addEventListener("click", undoMove);
  }

  // ============ CREATE GAME BOARD ============
  function createBoard() {
    gridDisplay.innerHTML = "";
    squares = [];

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      square.className = "tile";
      square.dataset.index = i;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generate();
    generate();
    updateDisplay();
  }

  // ============ TILE GENERATION WITH ANIMATION ============
  function generate() {
    const availableSpots = [];

    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        availableSpots.push(i);
      }
    }

    if (availableSpots.length > 0) {
      const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      const newValue = Math.random() > 0.9 ? 4 : 2;

      squares[randomSpot].innerHTML = newValue;
      squares[randomSpot].classList.add("tile-new");

      // Create spawn animation
      createParticles(squares[randomSpot], "spawn");

      setTimeout(() => {
        squares[randomSpot].classList.remove("tile-new");
      }, 200);

      checkForGameOver();
    }
  }

  // ============ PARTICLE EFFECTS SYSTEM ============
  function createParticles(element, type) {
    const rect = element.getBoundingClientRect();
    const gridRect = gridDisplay.getBoundingClientRect();

    const particleCount = type === "merge" ? 8 : 4;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = `particle particle-${type}`;

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = type === "merge" ? 50 : 30;

      particle.style.left = (rect.left - gridRect.left + rect.width / 2) + "px";
      particle.style.top = (rect.top - gridRect.top + rect.height / 2) + "px";
      particle.style.setProperty("--tx", Math.cos(angle) * velocity + "px");
      particle.style.setProperty("--ty", Math.sin(angle) * velocity + "px");

      gridDisplay.appendChild(particle);

      setTimeout(() => particle.remove(), 600);
    }
  }

  // ============ MOVEMENT FUNCTIONS ============
  function moveRight() {
    let moved = false;
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = getRow(i);
        let newRow = slideAndMerge(row, "right");
        moved = setRow(i, newRow) || moved;
      }
    }
    return moved;
  }

  function moveLeft() {
    let moved = false;
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = getRow(i);
        let newRow = slideAndMerge(row, "left");
        moved = setRow(i, newRow) || moved;
      }
    }
    return moved;
  }

  function moveUp() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = slideAndMerge(column, "up");
      moved = setColumn(i, newColumn) || moved;
    }
    return moved;
  }

  function moveDown() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = slideAndMerge(column, "down");
      moved = setColumn(i, newColumn) || moved;
    }
    return moved;
  }

  // ============ HELPER FUNCTIONS ============
  function getRow(startIndex) {
    return [
      parseInt(squares[startIndex].innerHTML),
      parseInt(squares[startIndex + 1].innerHTML),
      parseInt(squares[startIndex + 2].innerHTML),
      parseInt(squares[startIndex + 3].innerHTML)
    ];
  }

  function setRow(startIndex, row) {
    let changed = false;
    for (let i = 0; i < 4; i++) {
      if (squares[startIndex + i].innerHTML != row[i]) {
        changed = true;
      }
      squares[startIndex + i].innerHTML = row[i];
    }
    return changed;
  }

  function getColumn(startIndex) {
    return [
      parseInt(squares[startIndex].innerHTML),
      parseInt(squares[startIndex + width].innerHTML),
      parseInt(squares[startIndex + width * 2].innerHTML),
      parseInt(squares[startIndex + width * 3].innerHTML)
    ];
  }

  function setColumn(startIndex, column) {
    let changed = false;
    for (let i = 0; i < 4; i++) {
      if (squares[startIndex + width * i].innerHTML != column[i]) {
        changed = true;
      }
      squares[startIndex + width * i].innerHTML = column[i];
    }
    return changed;
  }

  // ============ ADVANCED MERGE WITH COMBO SYSTEM ============
  function slideAndMerge(arr, direction) {
    let filtered = arr.filter(num => num);
    let merged = [];
    let skip = false;
    let mergeHappened = false;

    for (let i = 0; i < filtered.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }

      if (filtered[i] === filtered[i + 1]) {
        const mergedValue = filtered[i] * 2;
        merged.push(mergedValue);

        // Update score with combo multiplier
        const comboMultiplier = 1 + (combo * 0.1);
        const scoreGain = Math.floor(mergedValue * comboMultiplier);
        score += scoreGain;

        // Update combo
        combo++;
        gameState.totalMerges++;

        // Track largest tile
        if (mergedValue > gameState.largestTile) {
          gameState.largestTile = mergedValue;
        }

        // Show score popup
        showScorePopup(scoreGain, combo);

        skip = true;
        mergeHappened = true;
      } else {
        merged.push(filtered[i]);
      }
    }

    if (!mergeHappened && combo > 0) {
      combo = 0; // Reset combo if no merge
    }

    let missing = 4 - merged.length;
    let zeros = Array(missing).fill(0);

    if (direction === "right" || direction === "down") {
      return zeros.concat(merged);
    } else {
      return merged.concat(zeros);
    }
  }

  // ============ SCORE POPUP ANIMATION ============
  function showScorePopup(points, comboCount) {
    const popup = document.createElement("div");
    popup.className = "score-popup";
    popup.innerHTML = comboCount > 1 ?
      `+${points} <span class="combo-text">x${comboCount}</span>` :
      `+${points}`;

    const scoreContainer = document.querySelector(".score-container");
    scoreContainer.appendChild(popup);

    setTimeout(() => popup.remove(), 1000);
  }

  // ============ KEYBOARD CONTROLS ============
  function control(e) {
    if (!gameActive || animationInProgress) return;

    e.preventDefault();

    const keyActions = {
      37: keyLeft,   // Left arrow
      38: keyUp,     // Up arrow
      39: keyRight,  // Right arrow
      40: keyDown,   // Down arrow
      65: keyLeft,   // A
      87: keyUp,     // W
      68: keyRight,  // D
      83: keyDown    // S
    };

    if (keyActions[e.keyCode]) {
      saveState();
      keyActions[e.keyCode]();
    }
  }

  document.addEventListener("keydown", control);

  // ============ KEY ACTIONS ============
  function keyRight() {
    animationInProgress = true;
    if (moveRight()) {
      moves++;
      setTimeout(() => {
        generate();
        updateDisplay();
        animationInProgress = false;
      }, 150);
    } else {
      animationInProgress = false;
    }
  }

  function keyLeft() {
    animationInProgress = true;
    if (moveLeft()) {
      moves++;
      setTimeout(() => {
        generate();
        updateDisplay();
        animationInProgress = false;
      }, 150);
    } else {
      animationInProgress = false;
    }
  }

  function keyUp() {
    animationInProgress = true;
    if (moveUp()) {
      moves++;
      setTimeout(() => {
        generate();
        updateDisplay();
        animationInProgress = false;
      }, 150);
    } else {
      animationInProgress = false;
    }
  }

  function keyDown() {
    animationInProgress = true;
    if (moveDown()) {
      moves++;
      setTimeout(() => {
        generate();
        updateDisplay();
        animationInProgress = false;
      }, 150);
    } else {
      animationInProgress = false;
    }
  }

  // ============ SAVE/UNDO SYSTEM ============
  function saveState() {
    gameState.previousBoard = squares.map(sq => sq.innerHTML);
    gameState.canUndo = true;
    document.getElementById("undo-btn").disabled = false;
  }

  function undoMove() {
    if (gameState.canUndo && gameState.previousBoard.length > 0) {
      gameState.previousBoard.forEach((value, index) => {
        squares[index].innerHTML = value;
      });

      moves = Math.max(0, moves - 1);
      gameState.canUndo = false;
      document.getElementById("undo-btn").disabled = true;
      updateDisplay();
    }
  }

  // ============ WIN/LOSE CHECKING ============
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        setTimeout(() => {
          showGameEnd("win");
        }, 500);
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }

    if (zeros === 0) {
      // Check if any moves are possible
      if (!canMove()) {
        setTimeout(() => {
          showGameEnd("lose");
        }, 500);
      }
    }
  }

  function canMove() {
    // Check horizontal moves
    for (let i = 0; i < 16; i++) {
      if (i % 4 !== 3) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
          return true;
        }
      }
    }

    // Check vertical moves
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + 4].innerHTML) {
        return true;
      }
    }

    return false;
  }

  // ============ GAME END SCREEN ============
  function showGameEnd(result) {
    gameActive = false;

    const overlay = document.createElement("div");
    overlay.className = "game-overlay";

    const endTime = Date.now();
    const playTime = Math.floor((endTime - gameState.startTime) / 1000);
    const minutes = Math.floor(playTime / 60);
    const seconds = playTime % 60;

    overlay.innerHTML = `
      <div class="end-screen ${result === 'win' ? 'win-screen' : 'lose-screen'}">
        <h2>${result === 'win' ? '🎉 YOU WIN! 🎉' : '😔 GAME OVER'}</h2>
        <div class="final-stats">
          <div class="stat">Score: <strong>${score}</strong></div>
          <div class="stat">Best: <strong>${bestScore}</strong></div>
          <div class="stat">Moves: <strong>${moves}</strong></div>
          <div class="stat">Time: <strong>${minutes}:${seconds.toString().padStart(2, '0')}</strong></div>
          <div class="stat">Merges: <strong>${gameState.totalMerges}</strong></div>
          <div class="stat">Largest Tile: <strong>${gameState.largestTile}</strong></div>
        </div>
        <button class="restart-big-btn" onclick="location.reload()">Play Again</button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Fireworks for win
    if (result === 'win') {
      createFireworks();
    }
  }

  // ============ FIREWORKS EFFECT ============
  function createFireworks() {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = Math.random() * 100 + "%";
        firework.style.top = Math.random() * 100 + "%";
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(firework);

        setTimeout(() => firework.remove(), 1000);
      }, i * 100);
    }
  }

  // ============ HINT SYSTEM ============
  function showHint() {
    const bestMove = calculateBestMove();

    if (bestMove) {
      const hintOverlay = document.createElement("div");
      hintOverlay.className = "hint-overlay";
      hintOverlay.innerHTML = `
        <div class="hint-message">
          💡 Try moving <strong>${bestMove}</strong>
        </div>
      `;

      document.body.appendChild(hintOverlay);

      setTimeout(() => hintOverlay.remove(), 2000);
    }
  }

  function calculateBestMove() {
    const moves = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    return moves[Math.floor(Math.random() * moves.length)];
  }

  // ============ RESTART GAME ============
  function restartGame() {
    score = 0;
    moves = 0;
    combo = 0;
    gameActive = true;
    gameState = {
      previousBoard: [],
      canUndo: false,
      totalMerges: 0,
      largestTile: 2,
      startTime: Date.now(),
      powerUpsUsed: 0
    };

    const overlay = document.querySelector(".game-overlay");
    if (overlay) overlay.remove();

    createBoard();
  }

  // ============ COLOR SCHEME ============
  function addColours() {
    const colorMap = {
      0: { bg: "#cdc1b4", color: "#776e65", fontSize: "0px" },
      2: { bg: "#eee4da", color: "#776e65", fontSize: "55px" },
      4: { bg: "#ede0c8", color: "#776e65", fontSize: "55px" },
      8: { bg: "#f2b179", color: "#f9f6f2", fontSize: "55px" },
      16: { bg: "#f59563", color: "#f9f6f2", fontSize: "50px" },
      32: { bg: "#f67c5f", color: "#f9f6f2", fontSize: "50px" },
      64: { bg: "#f65e3b", color: "#f9f6f2", fontSize: "50px" },
      128: { bg: "#edcf72", color: "#f9f6f2", fontSize: "45px" },
      256: { bg: "#edcc61", color: "#f9f6f2", fontSize: "45px" },
      512: { bg: "#edc850", color: "#f9f6f2", fontSize: "45px" },
      1024: { bg: "#edc53f", color: "#f9f6f2", fontSize: "35px" },
      2048: { bg: "#edc22e", color: "#f9f6f2", fontSize: "35px" }
    };

    squares.forEach(square => {
      const value = parseInt(square.innerHTML);
      const colors = colorMap[value] || { bg: "#3c3a32", color: "#f9f6f2", fontSize: "30px" };

      square.style.backgroundColor = colors.bg;
      square.style.color = colors.color;
      square.style.fontSize = colors.fontSize;

      if (value === 0) {
        square.classList.add("empty-tile");
      } else {
        square.classList.remove("empty-tile");
      }
    });
  }

  // ============ UPDATE DISPLAY ============
  function updateDisplay() {
    scoreDisplay.innerHTML = score;
    document.getElementById("moves").innerHTML = moves;
    document.getElementById("combo").innerHTML = combo > 0 ? `${combo}x` : "0x";

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore);
      document.getElementById("best-score").innerHTML = bestScore;

      // Celebrate new high score
      if (score > 0) {
        scoreDisplay.parentElement.classList.add("new-record");
        setTimeout(() => {
          scoreDisplay.parentElement.classList.remove("new-record");
        }, 1000);
      }
    }

    addColours();
    checkForWin();
  }

  // ============ INITIALIZE GAME ============
  createEnhancedUI();
  createBoard();

  // ============ ANIMATION LOOP ============
  setInterval(() => {
    addColours();
  }, 50);
});