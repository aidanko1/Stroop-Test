const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const timerDisplay = document.getElementById("timer");
const game = document.getElementById("game");
const colorWord = document.getElementById("colorWord");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");

const colors = ["Red", "Green", "Blue", "Yellow"];
const colorCodes = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];

let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  game.style.display = "block";
  result.style.display = "none";
  score = 0;
  timeLeft = 30;
  updateTimer();
  startTimer();
  showNewColor();
}

function restartGame() {
  result.style.display = "none";
  restartBtn.style.display = "none";
  startGame();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function updateTimer() {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
}

function showNewColor() {
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const randomTextColorIndex = Math.floor(Math.random() * colorCodes.length);

  colorWord.textContent = colors[randomColorIndex];
  colorWord.style.color = colorCodes[randomTextColorIndex];
}

document.querySelectorAll(".colorBtn").forEach((button) => {
  button.addEventListener("click", () => {
    checkAnswer(button.textContent);
  });
});

function checkAnswer(selectedColor) {
  const correctColor = colorWord.style.color;

  if (getColorName(correctColor) === selectedColor) {
    score++;
  }
  showNewColor();
}

function getColorName(colorCode) {
  switch (colorCode) {
    case "rgb(255, 0, 0)":
      return "Red";
    case "rgb(0, 255, 0)":
      return "Green";
    case "rgb(0, 0, 255)":
      return "Blue";
    case "rgb(255, 255, 0)":
      return "Yellow";
    default:
      return "";
  }
}

function endGame() {
  clearInterval(timerInterval);
  game.style.display = "none";
  result.style.display = "block";
  scoreDisplay.textContent = score;
  restartBtn.style.display = "inline-block";
}
