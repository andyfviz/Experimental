
/**
 * BACKGROUND
 */
const scene = document.getElementById('scene');
const mouse = { x: 0, y: 0 };
const current = { x: 0, y: 0 };

const layers = [
    { el: document.getElementById('l1'), depth: 0.015 }, // más lejano
    { el: document.getElementById('l2'), depth: 0.032 },
    { el: document.getElementById('l3'), depth: 0.058 },
    { el: document.getElementById('l4'), depth: 0.088 }, // más cercano
].filter((x) => x.el);

const getBase = (el) => {
    const bx = Number(el.dataset.baseX ?? 0);
    const by = Number(el.dataset.baseY ?? 0);
    return { bx: Number.isFinite(bx) ? bx : 0, by: Number.isFinite(by) ? by : 0 };
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - window.innerWidth / 2;
    mouse.y = e.clientY - window.innerHeight / 2;
});

window.addEventListener('load', () => {
    document.body.classList.add('bg-loaded');
});

function animate() {
    current.x += (mouse.x - current.x) * 0.07; // lerp → suavizado
    current.y += (mouse.y - current.y) * 0.07;

    layers.forEach(({ el, depth }) => {
        const { bx, by } = getBase(el);
        const x = bx + current.x * depth;
        const y = by + current.y * depth;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(animate);
}

if (scene && layers.length) animate();

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
const DURATIONS = {
    work: 25*60,
    short: 5*60, 
    long: 15*60
} 

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