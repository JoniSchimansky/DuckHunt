import { MaxScore } from "../model/MaxScore.interface";
import { ScoreStorage } from "./ScoreStorage";
import duckQuackSoundAsset from '../public/sounds/duck-quack.mp3';
import gameStartSoundAsset from '../public/sounds/game-start.mp3';

//show max score
const maxScore: MaxScore | null = ScoreStorage.read();

if (null !== maxScore) {
    const maxScoreElement = document.querySelector('.max-score-info');
    const wave = maxScoreElement.querySelector('.wave');
    const score = maxScoreElement.querySelector('.score');

    wave.innerHTML = String(maxScore.wave);
    score.innerHTML = String(maxScore.score);

    maxScoreElement.classList.remove('hide');
}

// Show landing duck
const playButton: HTMLElement = document.querySelector('.play-button');
const landingDuck: HTMLElement = document.querySelector('.landing-duck');

playButton.addEventListener('mouseenter', () => {
    landingDuck.classList.add('show-duck')
});

playButton.addEventListener('mouseleave', () => {
    landingDuck.classList.remove('show-duck')
});

// Start sounds
const startGameButton: HTMLElement = document.getElementById('start-game-button');
const duckQuackSound: HTMLAudioElement = new Audio(duckQuackSoundAsset);
const gameStartSound: HTMLAudioElement = new Audio(gameStartSoundAsset);

duckQuackSound.preload = 'auto';
gameStartSound.preload = 'auto';

function startSoundsEvent(): void {
    duckQuackSound.currentTime = 0; 
    gameStartSound.currentTime = 0; 
    duckQuackSound.play();
    gameStartSound.play();

    // Call game page after a litle delay
    setTimeout(() => {
        window.location.href = 'game.html';
    }, 1600);
}

startGameButton.addEventListener('click', startSoundsEvent);

