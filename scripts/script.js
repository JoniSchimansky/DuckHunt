
const duck = document.querySelector('.duck');
const gameContainer = document.querySelector('.game-container');

function moveDuck() {
    const randomX = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
    const randomY = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
    duck.style.left = randomX + 'px';
    duck.style.top = randomY + 'px';
}

setInterval(moveDuck, 2000); // Cambiar la posición cada 2 segundos
