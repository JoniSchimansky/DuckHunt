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
crosshairImage.style.transform = 'translate(-50%, -50%)'; 

document.body.appendChild(crosshairImage);

let mouseX = 0;
let mouseY = 0;
let isInsideContainer = false; 

gameContainer.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'none'; // Hide default cursor
    isInsideContainer = true;
    crosshairImage.style.display = 'block';
});

gameContainer.addEventListener('mouseleave', () => {
    document.body.style.cursor = 'default'; // Return to the default cursor
    isInsideContainer = false;
    crosshairImage.style.display = 'none';
});

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function updateCursor() {
    crosshairImage.style.left = mouseX + 'px';
    crosshairImage.style.top = mouseY + 'px';
    requestAnimationFrame(updateCursor);
}

function checkCursor() {
    if (isInsideContainer) {
        updateCursor();
    }
    requestAnimationFrame(checkCursor);
}

checkCursor();



// Shotgun sound
const shotgunSound = new Audio('sounds/shotgun.mp3');
shotgunSound.preload = 'auto';

document.addEventListener('click', () => {
    shotgunSound.currentTime = 0; 
    shotgunSound.play();
});


// Score
const patitos = document.querySelectorAll('.duck');
const scoreElement = document.querySelector('#score');
let score = 0;

patitos.forEach(patito => {
    patito.addEventListener('click', (event) => {
        const points = parseInt(event.target.getAttribute('data-score'));
        score += points;
        scoreElement.textContent = score;
    });
});


// Dead duck






