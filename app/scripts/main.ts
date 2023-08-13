// Duck movement
const duck: HTMLElement | null = document.querySelector('.duck');
const gameContainer: HTMLElement | null = document.querySelector('.game-container');

let posX: number = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
let posY: number = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
let velocityX: number = (Math.random() - 0.5) * 4; // Velocity X random between -1 y 1
let velocityY: number = (Math.random() - 0.5) * 4; // Velocity Y random between -1 y 1

let isDuckAlive: boolean = true; // Initial state
let isDuckFlying: boolean = true; // Initial state
let isDuck1: boolean = true; // Initial image state
let frameCount: number = 0; // Counter for frames
const frameChangeInterval = 10; // Change image every 10 frames
const duckHalfWidth = 120 / 2; // Half of the duck width in pixels

function alternateDuckImage() {
    if (isDuckAlive) {
        isDuck1 = !isDuck1;
        duck.querySelector('img').src = isDuck1 ? '../../public/images/duck1.png' : '../../public/images/duck2.png';
    }
}

function stopDuck() {
    isDuckFlying = false;
}

function respawnDuck() {
    // Reset duck properties and variables
    posX = Math.random() * (gameContainer.clientWidth - duck.clientWidth);
    posY = Math.random() * (gameContainer.clientHeight - duck.clientHeight);
    isDuckAlive = true;
    isDuckFlying = true;
    isDuck1 = true;
    // frameCount = 0;

    // Reset duck's image and position
    duck.querySelector('img').src = '../../public/images/duck1.png';
    duck.style.display = 'block';
    duck.style.left = (posX - duckHalfWidth) + 'px';
    duck.style.top = posY + 'px';

    moveDuck(); // Start animation for the new duck
}

function moveDuck() {
    if (isDuckFlying) {
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
    } else {
        posY += 7; // Move duck vertically downwards
        duck.style.top = posY + 'px';

        // Check if the duck has reached the bottom of the container
        if (posY > gameContainer.clientHeight - duck.clientHeight) {
            duck.style.display = 'none'; // Hide the duck
            
        }
    }

    frameCount++;

    if (frameCount >= frameChangeInterval) {
        alternateDuckImage();
        frameCount = 0; // Reset frame counter
    }
    requestAnimationFrame(moveDuck);
}

duck.addEventListener('click', () => {
    if (isDuckAlive) {
        duck.querySelector('img').src = '../../public/images/dead_duck.png';
        isDuckAlive = false;
        stopDuck();
        setTimeout(respawnDuck, 1000); // Respawn the duck after a delay (1 second)
    }
});


moveDuck(); // Starts animation


// Crosshair on game-container
const crosshairImage: HTMLImageElement = new Image();
crosshairImage.src = '../../public/images/crosshair.png';
crosshairImage.style.position = 'absolute';
crosshairImage.style.pointerEvents = 'none'; 
crosshairImage.style.transform = 'translate(-50%, -50%)'; 

document.body.appendChild(crosshairImage);

let mouseX: number = 0;
let mouseY: number = 0;
let isInsideContainer: boolean = false; 

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
const shotgunSound: HTMLAudioElement = new Audio('../../public/sounds/shotgun.mp3');
shotgunSound.preload = 'auto';

document.addEventListener('click', () => {
    shotgunSound.currentTime = 0; 
    shotgunSound.play();
});


// Score
const ducks: NodeList = document.querySelectorAll('.duck');
const scoreElement: HTMLElement = document.querySelector('#score');
let score = 0;

ducks.forEach(duck => {
    duck.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLButtonElement;
        const points: number = parseInt(target.getAttribute('data-score'));
        score += points;
        scoreElement.textContent = score.toString();
    });
});







