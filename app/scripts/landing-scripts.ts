
// Show landing duck
const playButton: HTMLElement | null = document.querySelector('.play-button');
const landingDuck: HTMLElement | null = document.querySelector('.landing-duck');

playButton.addEventListener('mouseenter', () => {
    landingDuck.classList.add('show-duck')
});

playButton.addEventListener('mouseleave', () => {
    landingDuck.classList.remove('show-duck')
});

// Start sounds
const startGameButton: HTMLElement | null = document.getElementById('start-game-button');
const duckQuackSound: HTMLAudioElement = new Audio('../../public/sounds/duck-quack.mp3');
const gameStartSound: HTMLAudioElement = new Audio('../../public/sounds/game-start.mp3');
duckQuackSound.preload = 'auto';
gameStartSound.preload = 'auto';

function startSoundsEvent(): void {
    duckQuackSound.currentTime = 0; 
    gameStartSound.currentTime = 0; 
    duckQuackSound.play();
    gameStartSound.play();

    // Call game page after a litle delay
    setTimeout(() => {
        window.location.href = '../app/game.html';
    }, 1600);
}
startGameButton.addEventListener('click', startSoundsEvent);

