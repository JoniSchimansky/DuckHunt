
const duck = document.querySelector('.duck');
const gameContainer = document.querySelector('.game-container');

let posX = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
let posY = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
let velocityX = (Math.random() - 0.5) * 7; // Velocity X random between -1 y 1
let velocityY = (Math.random() - 0.5) * 7; // Velocity Y random between -1 y 1

function moveDuck() {
    posX += velocityX;
    posY += velocityY;

    // Limit the duck inside the container
    if (posX < 0 || posX > gameContainer.clientWidth - duck.clientWidth) {
        velocityX *= -1; // Change X direction when reaches the container border
    }
    if (posY < 0 || posY > gameContainer.clientHeight - duck.clientHeight) {
        velocityY *= -1; // Change Y direction when reaches the container border
    }

    // Update duck positioning
    duck.style.left = posX + 'px';
    duck.style.top = posY + 'px';

    requestAnimationFrame(moveDuck);
}

moveDuck(); // Starts animation
