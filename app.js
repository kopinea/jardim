// ===== Variáveis de Estado =====
let timerDuration = 30 * 60; // tempo em segundos (30 min exemplo)
let timeLeft = timerDuration;
let timerInterval = null;
let currentStage = 1;
let ritualReady = false; // só começa o timer depois do ritual

// ===== Elementos =====
const timerDisplay = document.getElementById("timerDisplay");
const plantImg = document.getElementById("plant");
const plantarBtn = document.getElementById("plantarBtn");

const hoeBtn = document.querySelector('button[aria-label*="Enxada"]');
const waterBtn = document.querySelector('button[aria-label*="Regador"]');

// ===== Funções =====
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (timerInterval) return; // evita duplicar intervalos
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    updatePlantStage();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 0;
      updateDisplay();
      console.log("Pomodoro concluído!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = timerDuration;
  currentStage = 1;
  ritualReady = false;
  plantImg.src = "./assets/plants/stage1.png";
  updateDisplay();
}

// ===== Atualiza crescimento =====
function updatePlantStage() {
  let progress = 1 - (timeLeft / timerDuration);
  let stage = 1;

  if (progress >= 0.25) stage = 2;
  if (progress >= 0.5) stage = 3;
  if (progress >= 0.75) stage = 4;
  if (progress >= 1) stage = 5;

  if (stage !== currentStage) {
    currentStage = stage;
    plantImg.src = `./assets/plants/stage${stage}.png`;
  }
}

// ===== Ritual =====
hoeBtn.addEventListener("click", () => {
  plantImg.src = "./assets/icons/soil.png"; // imagem de terra vazia
  ritualReady = false;
