// Duck movement
const duck: HTMLElement | null = document.querySelector('.duck');
const gameContainer: HTMLElement | null = document.querySelector('.game-container');

let posX: number = Math.random() * (gameContainer.offsetWidth - duck.offsetWidth);
let posY: number = Math.random() * (gameContainer.offsetHeight - duck.offsetHeight);

let velocityX: number = 4;
let velocityY: number = 4;

let isDuckAlive: boolean = true; // Initial state
let isDuckFlying: boolean = true; // Initial state
let isDuck1: boolean = true; // Initial image state
let frameCount: number = 0; // Counter for frames
const frameChangeInterval: number = 10; // Change image every 10 frames

// Score
let score: number = 0;
const ducks: NodeList = document.querySelectorAll('.duck');
const scoreElement: HTMLElement = document.querySelector('#score');

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
    posX = Math.random() * (gameContainer.offsetWidth - duck.offsetWidth);
    posY = Math.random() * (gameContainer.offsetHeight - duck.offsetHeight);
    isDuckAlive = true;
    isDuckFlying = true;
    isDuck1 = true;
    // frameCount = 0;

    // Reset duck's image and position
    duck.querySelector('img').src = '../../public/images/duck1.png';
    duck.style.display = 'block';
    duck.style.left = posX + 'px';
    duck.style.top = posY + 'px';
}

function moveDuck() {
    if (isDuckFlying) {
        // Change duck direction
        duck.style.transform = velocityX < 0 ? 'scaleX(-1)' : 'scaleX(1)'; // Flip the duck horizontally

        //Limit the duck inside the container
        if (posX < 0 || posX > gameContainer.clientWidth - duck.clientWidth) {
            velocityX *= -1; // Change X direction when reaches the container border
        }
        if (posY < 0 || posY > gameContainer.clientHeight - duck.clientHeight) {
            velocityY *= -1; // Change Y direction when reaches the container border
        }

        posX += velocityX;
        posY += velocityY;


        // Update duck positioning
        duck.style.left = posX + 'px';
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

moveDuck(); // Starts animation

let mouseX: number = 0;
let mouseY: number = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Shotgun sound
const shotgunSound: HTMLAudioElement = new Audio('../../public/sounds/shotgun.mp3');
shotgunSound.preload = 'auto';


function shotgunFiredEvent() {
    shotgunSound.currentTime = 0; 
    shotgunSound.volume = 0.1;
    shotgunSound.play();
}

gameContainer.addEventListener('click', shotgunFiredEvent);

function duckClickedEvent(event: Event) {
    const duck = event.currentTarget as HTMLElement;
    const duckImage = duck.querySelector('img');
    const duckPoints = Number(duckImage.getAttribute('data-score'));

    // Increase the global score
    score += duckPoints;

    scoreElement.textContent = score.toString();

    // TODO: Change isDuck alive from variable to an object property. 
    if (isDuckAlive) {
        duckImage.src = '../../public/images/dead_duck.png';

        isDuckAlive = false;
        stopDuck();
        setTimeout(respawnDuck, 1000); // Respawn the duck after a delay (1 second)
    }
}

function addListenerToDucks() {    
    ducks.forEach((duck) => {
        duck.addEventListener('click', duckClickedEvent);
    });
}

addListenerToDucks(); // Add interaction to duck elements

function removeListenerToDucks() {
    ducks.forEach((duck) => {
        duck.removeEventListener('click', duckClickedEvent);
    });
}

const pause = document.querySelector("#pause");
const play = document.querySelector("#play");

pause.addEventListener('click', pauseGame);

play.addEventListener('click', playGame);

function playGame() {
    pause.classList.remove('hide');
    play.classList.add('hide');

    isDuckAlive = true;
    velocityX = 4;
    velocityY = 4;

    gameContainer.addEventListener('click', shotgunFiredEvent);

    addListenerToDucks();
}

function pauseGame() {
    pause.classList.add('hide');
    play.classList.remove('hide');

    isDuckAlive = false;
    velocityX = 0;
    velocityY = 0;

    gameContainer.removeEventListener('click', shotgunFiredEvent);
    removeListenerToDucks();
}




