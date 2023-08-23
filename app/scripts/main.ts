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
    
    duck.kill();

    deleteDuck(duck);
    if (ducks.length === 0) {
        startNewWave();
    }
}

function startNewWave(): void {
    wave++;
    console.log(wave)
    const waveNumberText = gameContainer.querySelector('.wave-number');
    waveNumberText.innerHTML = String(wave);

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

    ducks.forEach((duck) => {
        duck.stopFliying();
    });

    gameContainer.removeEventListener('click', shotgunFiredEvent);
}
