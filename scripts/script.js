// Duck movement
const duck = document.querySelector('.duck');
const gameContainer = document.querySelector('.game-container');

let posX = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
let posY = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
let velocityX = (Math.random() - 0.5) * 7; // Velocity X random between -1 y 1
let velocityY = (Math.random() - 0.5) * 7; // Velocity Y random between -1 y 1

let isDuck1 = true; // Initial image state
let frameCount = 0; // Counter for frames
const frameChangeInterval = 10; // Change image every 10 frames
const duckHalfWidth = 120 / 2; // Half of the duck width in pixels

function alternateDuckImage() {
    isDuck1 = !isDuck1;
    duck.querySelector('img').src = isDuck1 ? 'images/duck1.png' : 'images/duck2.png';
}

function moveDuck() {
    

    // Change duck direction
    duck.style.transform = velocityX < 0 ? 'scaleX(-1)' : 'scaleX(1)'; // Flip the duck horizontally
    
    posX += velocityX;
    posY += velocityY;

    // Limit the duck inside the container
    if (posX - duckHalfWidth < duckHalfWidth || posX + duckHalfWidth > gameContainer.clientWidth) {
        velocityX *= -1; // Change X direction when reaches the container border
    }
    if (posY < 0 || posY > gameContainer.clientHeight - duck.clientHeight) {
        velocityY *= -1; // Change Y direction when reaches the container border
    }

    // Update duck positioning
    duck.style.left = (posX - duckHalfWidth) + 'px';
    duck.style.top = posY + 'px';

    frameCount++;

    if (frameCount >= frameChangeInterval) {
        alternateDuckImage();
        frameCount = 0; // Reset frame counter
    }
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
const ducks = document.querySelectorAll('.duck');
const scoreElement = document.querySelector('#score');
let score = 0;

ducks.forEach(duck => {
    duck.addEventListener('click', (event) => {
        const points = parseInt(event.target.getAttribute('data-score'));
        score += points;
        scoreElement.textContent = score;
    });
});


// Dead duck






