const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const millisecondsEl = document.querySelector("#milliseconds");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");
const roundsEl = document.querySelector("#rounds");

let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;
let rounds = 0;

startBtn.addEventListener("click", processar);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  
  interval = setInterval(() => {
    if (!isPaused) {
      milliseconds += 10;
      if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
       
      }
      if (seconds === 50) {
        playSound('sounds/countdown.mp3')
      }
      if (seconds === 59) {
        minutes++;
        seconds = 0;
        playSound('sounds/BoxingBell.mp3')
      }
      if (minutes === 1) {
        rounds++;
        
        minutes = 0;
      }
      minutesEl.innerHTML = formatTime(minutes);
      secondsEl.innerHTML = formatTime(seconds);
      millisecondsEl.innerHTML = formatMilliseconds(milliseconds);
      roundsEl.innerHTML = rounds
    }
  }, 10);
  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function playSound(soundfile) {
  document.getElementById("dummy").innerHTML = 
    "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}
function pauseTimer() {
  isPaused = true;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function resumeTimer() {
  isPaused = false;
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function resetTimer() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  isPaused = false;
  minutesEl.innerHTML = "00";
  secondsEl.innerHTML = "00";
  millisecondsEl.innerHTML = "000";
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function formatMilliseconds(time) {
  return time < 100 ? `0${time}`.padStart(3, "0") : time;
}

function processar() {
  startTimer()
  playSound('sounds/AirHorn.mp3')
}