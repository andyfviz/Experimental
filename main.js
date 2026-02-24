
/**
 * RETO 1: CAMBIO DE TEMA 
 */
const toggleButton = document.getElementById("Theme");
const body = document.body;

const savedTheme =localStorage.getItem("Theme");

if (savedTheme==="Dark"){
    body.classList.add("dark-mode");
    toggleButton.textContent="Light";
    } else {
    toggleButton.textContent = "Dark";
}
/*Click*/ 
toggleButton.addEventListener ("click",() => {
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("Theme", "Dark");
        toggleButton.textContent ="Light";
    } else{
        localStorage.setItem("Theme","Light");
        toggleButton.textContent= "Dark";
    }
});
/**
 * RETO 2: Imagenes Carrusel 
 */
const carousel = document.querySelector(".Tarjetas");
const cards = document.querySelectorAll(".card");

// Activar la primera al inicio
cards[0].classList.add("active");

function updateActiveCard() {
    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < rect.width / 2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

carousel.addEventListener("scroll", updateActiveCard);

/**
 * RETO 3: Pomodoro
 */
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const modeLabel = document.getElementById("mode-label");
const alarm = document.getElementById("alarm");

let timer = null;
let timeLeft = 1500;
let isRunning = false;
let mode = "Working Time";
let sessionCount = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent = 
    `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0){
            clearInterval(timer);
            isRunning = false;
            alarm.onplay();
            switchMode();
        }
    },1000);
}
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}
function resetTimer(){
    clearInterval(timer);
    isRunning = false;
    setMode(mode);
}
function switchMode() {
    if (mode==="Working Time") {
        sessionCount++;

        if (sessionCount % 4===0) {
            setMode("long"); 
        } else{ 
            setMode("short");
        }
        } else {
            setMode ("Working Time")
        }
    }
function setMode(newMode) {
    mode = newMode;

    if (mode=== "Working Time") timeLeft = 1500; //25 min
    if (mode==="short") timeLeft = 300; // 5 min
    if (mode==="long") timeLeft = 900; // 15 min 

    modeLabel.textContent = mode.toUpperCase();
    updateDisplay();
}
document.body.classList.add("finished");

setTimeout(() => {
    document.body.classList.remove("finished");
}, 3000);
startBtn.addEventListener('click',() => {
    if(isRunning) {
        pauseTimer();
        startBtn.textContent = 'Start';
    }else{
        startTimer();
        startBtn.textContent ='Pause';
    }
});
resetBtn.addEventListener('click', resetTimer);
updateDisplay();