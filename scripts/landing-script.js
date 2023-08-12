// Call game page when play button is selected
const startGameButton = document.getElementById('start-game-button');

startGameButton.addEventListener('click', () => {
    window.location.href = 'game.html'; 
});


// Show landing duck
const playButton = document.querySelector('.play-button');
const landingDuck = document.querySelector('.landing-duck');

playButton.addEventListener('mouseenter', () => {
        const landingDuck = document.querySelector('.landing-duck');
        landingDuck.style.top = '250px';
        landingDuck.style.opacity = '1';
});

playButton.addEventListener('mouseleave', () => {
        const landingDuck = document.querySelector('.landing-duck');
        landingDuck.style.top = '260px';
        landingDuck.style.opacity = '0';
});



