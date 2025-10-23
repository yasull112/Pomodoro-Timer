
// Refactored code with improved readability and structure

// DOM Elements
const timeElement = document.querySelector(".timer");
const controlButton = document.querySelector(".timer-control");
const resetButton = document.querySelector(".reset-button");
const workTimeElement = document.querySelector("#work-time-options");
const turnElement = document.querySelector(".turns");
const totalTurnsElement = document.querySelector("#total-turns-options");
const timeModeElement = document.querySelector(".time-mode");
const configButton = document.getElementById("toggle-config");
const configDiv = document.getElementById("drop-content");

// Event Listeners
controlButton.addEventListener("click", toggleStartPause);
resetButton.addEventListener("click", reset);
configButton.addEventListener("click", toggleConfig);

// Timer Variables
let timeRemaining = 0;
let timer = null;
let isRunning = false;
let isBreakTime = false;
let workTime = 0;
let breakTime = 0;
let longBreakTime = 0;
let totalTurns = 0;
let currentTurn = 1; // Corrected variable name
let totalTime = 0;

// Configuration Visibility
function toggleConfig() {
  configDiv.style.display = configDiv.style.display === "none" ? "flex" : "none";
}

// Timer Control Functions
function toggleStartPause() {
  isRunning ? pause() : start();
}

function start() {
  isRunning = true;
  controlButton.innerText = "Pause";
  timer = setInterval(updateTimer, 1000);
}

function pause() {
  isRunning = false;
  controlButton.innerText = "Start";
  clearInterval(timer);
}

function reset() {
  pause();
  initTimerSettings();
  updateUI(); // Ensure UI is updated after reset
}

// Timer Settings Initialization
function initTimerSettings() {
  const workValue = parseInt(workTimeElement.value);
  const turnsValue = parseInt(totalTurnsElement.value);

  workTime = workValue * 60;
  breakTime = (workValue / 5) * 60;
  longBreakTime = (workValue - 10) * 60; // Adjusted long break time

  totalTurns = turnsValue;
  currentTurn = 1;
  totalTime = workTime;
  timeRemaining = totalTime;
  isBreakTime = false;
  isRunning = false;
  updateUI(); // Update UI after settings are initialized
}

// Timer Update Logic
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimeDisplay();
  } else {
    finishTurn();
  }
}

function finishTurn() {
  nextTurn();
  updateUI();
}

function nextTurn() {
  isBreakTime = !isBreakTime;
  if (isBreakTime) {
    currentTurn++;
  }

  if (currentTurn <= totalTurns) {
    if (isBreakTime) {
      totalTime = currentTurn < totalTurns ? breakTime : longBreakTime;
    } else {
      totalTime = workTime;
    }
    timeRemaining = totalTime;
  } else {
    reset();
  }
}

// UI Update Functions
function updateTimeDisplay() {
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  timeElement.innerText = `${minutes}:${seconds}`;
}

function updateTurnDisplay() {
  let mode = isBreakTime ? (currentTurn < totalTurns ? "BREAK" : "LONG BREAK") : "WORK"; // Corrected ternary operator usage
  turnElement.innerText = `${currentTurn}/${totalTurns}`;
  timeModeElement.innerText = mode;
}

function updateUI() {
  updateTimeDisplay();
  updateTurnDisplay();
}

// Initial Setup
initTimerSettings();
updateUI();