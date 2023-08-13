// Call game page when play button is selected
const startGameButton: HTMLElement | null = document.getElementById('start-game-button');

startGameButton.addEventListener('click', () => {
    window.location.href = '../app/game.html'; 
});


// Show landing duck
const playButton: HTMLElement | null = document.querySelector('.play-button');
const landingDuck: HTMLElement | null = document.querySelector('.landing-duck');

playButton.addEventListener('mouseenter', () => {
    landingDuck.style.top = '250px';
    landingDuck.style.opacity = '1';
});

playButton.addEventListener('mouseleave', () => {
    landingDuck.style.top = '260px';
    landingDuck.style.opacity = '0';
});
