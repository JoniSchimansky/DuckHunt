import { Duck } from "./Duck";

const gameContainer: HTMLDivElement | null = document.querySelector('.game-container');
let wave: number = 0;

// Score
let score: number = 0;
const ducks: Duck[] = [];
const scoreElement: HTMLElement = document.querySelector('#score');

// Waves code
startNewWave();

function createDuckElement(): void {
    const duck = new Duck();
    const duckElement = duck.render();
    gameContainer.appendChild(duckElement);

    ducks.push(duck);
}

function startDucksActions(): void {
    ducks.forEach((duck: Duck) => {
        duck.fly();
    })

    addListenerToDucks();
}

// Shotgun sound
const shotgunSound: HTMLAudioElement = new Audio('../../public/sounds/shotgun.mp3');
shotgunSound.preload = 'auto';


function shotgunFiredEvent(): void {
    shotgunSound.currentTime = 0; 
    shotgunSound.volume = 0.1;
    shotgunSound.play();
}

gameContainer.addEventListener('click', shotgunFiredEvent);


function duckReached(event: Event, duck: Duck): void {
    const duckElement = event.currentTarget as HTMLElement;
    
    // Increase the global score
    const duckPoints = Number(duckElement.getAttribute('data-score'));
    score += duckPoints;
    scoreElement.textContent = score.toString();
    
    // Add score on dead
    const deadScoreElement: HTMLSpanElement  = document.createElement('span');
    deadScoreElement.classList.add('dead-score');
    deadScoreElement.textContent = `+${duck.defaultScore}`;
    gameContainer.append(deadScoreElement);
    
    deadScoreElement.style.top = duck.yPosition + 'px';
    deadScoreElement.style.left = duck.xPosition + 'px';

    deadScoreElement.classList.add('show-score');

    duck.kill();
    
    deleteDuck(duck);
    if (ducks.length === 0) {
        startNewWave();
    }

    // hide score after delay
    setTimeout(() => {
        deadScoreElement.classList.remove('show-score');
        deadScoreElement.classList.add('hide-score');
        setTimeout(() => {
            deadScoreElement.remove();
        }, 500);
    }, 500);
}

function startNewWave(): void {
    wave++;
    console.log(wave)
    const waveNumberText = gameContainer.querySelector('.wave-number');
    waveNumberText.innerHTML = String(wave);

    const waveSound = new Audio('../../public/sounds/duck-flying.mp3');
    waveSound.preload = 'auto';
    waveSound.currentTime = 0;
    waveSound.play();

    setTimeout(() => {
        waveSound.pause();
    }, 1500);

    setTimeout(() => {
        for (let numberOfDucks = 0; numberOfDucks < wave; numberOfDucks++) {
            createDuckElement();
        }
    
        startDucksActions();
    }, 1000)
}

function deleteDuck(duck: Duck): void {
    // Delete from array to control waves
    ducks.splice(ducks.findIndex(d => d.id === duck.id), 1);
}

function addListenerToDucks(): void {    
    ducks.forEach((duck) => {
        const duckElement: HTMLElement = duck.findDuckElementById();
        duckElement.addEventListener('click', (event: Event) => {
            duckReached(event, duck);
        });
    });
}

const pause: HTMLElement = document.querySelector("#pause");
const play: HTMLElement = document.querySelector("#play");
const pauseLayout: HTMLElement = document.querySelector('.pause-layout');
const pauseSound: HTMLAudioElement = new Audio('../../public/sounds/pause.mp3');
const resumeSound: HTMLAudioElement = new Audio('../../public/sounds/unpause.mp3');
pauseSound.preload = 'auto';
resumeSound.preload = 'auto';

pause.addEventListener('click', pauseGame);

play.addEventListener('click', playGame);

function playGame(): void {
    pauseLayout.classList.add('hide');
    pause.classList.remove('hide');
    play.classList.add('hide');

    resumeSound.currentTime = 0; 
    resumeSound.play();
    backgroundMusic.play();

    ducks.forEach((duck) => {
        duck.continueFliying();
    });

    gameContainer.addEventListener('click', shotgunFiredEvent);
}

function pauseGame(): void {
    pauseLayout.classList.remove('hide');
    pause.classList.add('hide');
    play.classList.remove('hide');

    pauseSound.currentTime = 0; 
    pauseSound.play();
    backgroundMusic.pause();

    ducks.forEach((duck) => {
        duck.stopFliying();
    });

    gameContainer.removeEventListener('click', shotgunFiredEvent);
}


// Background music
const backgroundMusic = new Audio('../../public/sounds/game-music.mp3');
backgroundMusic.preload = 'auto';
backgroundMusic.currentTime = 0;
window.addEventListener('load', () => {
    backgroundMusic.volume = 0.05;
    backgroundMusic.play();
});