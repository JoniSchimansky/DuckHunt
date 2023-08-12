// Duck movement
const duck = document.querySelector('.duck');
const gameContainer = document.querySelector('.game-container');

let posX = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
let posY = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
let velocityX = (Math.random() - 0.5) * 7; // Velocity X random between -1 y 1
let velocityY = (Math.random() - 0.5) * 7; // Velocity Y random between -1 y 1

function moveDuck() {

    // Change duck direction
    duck.style.transform = velocityX < 0 ? 'rotateY(180deg)' : 'rotateY(0deg)';
    
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


// Crosshair on game-container
const crosshairImage = new Image();
crosshairImage.src = 'images/crosshair.png';
crosshairImage.style.position = 'absolute';
crosshairImage.style.pointerEvents = 'none';

document.body.appendChild(crosshairImage);

document.addEventListener('mousemove', (event) => {
    crosshairImage.style.left = (event.clientX - crosshairImage.width / 2) + 'px';
    crosshairImage.style.top = (event.clientY - crosshairImage.height / 2) + 'px';
});




