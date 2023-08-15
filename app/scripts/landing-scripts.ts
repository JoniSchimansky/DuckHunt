// Call game page when play button is selected
const startGameButton: HTMLElement | null = document.getElementById('start-game-button');

function newGame() {
    window.location.href = '../app/game.html'; 
}

startGameButton.addEventListener('click', newGame);

// Show landing duck
const playButton: HTMLElement | null = document.querySelector('.play-button');
const landingDuck: HTMLElement | null = document.querySelector('.landing-duck');

playButton.addEventListener('mouseenter', () => {
    landingDuck.classList.add('show-duck')
});

playButton.addEventListener('mouseleave', () => {
    landingDuck.classList.remove('show-duck')
});