import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_HEIGHT, DEFAULT_SCORE, DEFAULT_WIDTH, DEFAULT_X_VELOCITY, DEFAULT_Y_VELOCITY, DuckInterface, FRAME_INTERVAL, VERTICAL_FALL } from '../model/Duck.interface';

export class Duck implements DuckInterface{
    id: string;

    xPosition: number;
    yPosition: number;
    xVelocity: number;
    yVelocity: number;

    isAlive: boolean = true;
    isFlying: boolean = true;
    defaultScore: number = DEFAULT_SCORE;

    private width: number = DEFAULT_WIDTH;
    private height: number = DEFAULT_HEIGHT;
    private gameContainer: HTMLDivElement = document.querySelector('.game-container');

    private flyingImages: string[] = ['../public/images/duck1.png', '../public/images/duck2.png'];
    private deathImage: string = '../../public/images/dead_duck.png';
    private flyingImagesToogle: boolean = true;

    private frameCount: number = 0; // Counter for frames
    private frameChangeInterval: number = FRAME_INTERVAL; // Change image every 10 frames

    constructor() {
        this.id = uuidv4();
        this.xPosition = Math.random() * (this.gameContainer.offsetWidth - this.width);
        this.yPosition = Math.random() * (this.gameContainer.offsetHeight - this.height);

        this.setProportionalVelocity();
    }

    fly(): void {
        const duckElement: HTMLDivElement = this.findDuckElementById();

        if (this.isFlying) {
            // Change duck direction
            duckElement.style.transform = this.xVelocity < 0 ? 'scaleX(-1)' : 'scaleX(1)';

            //Limit the duck inside the container
            if (this.xPosition < 0 || this.xPosition > this.gameContainer.clientWidth - this.width) {
                this.xVelocity *= -1; // Change X direction when reaches the container border
            }
            if (this.yPosition < 0 || this.yPosition > this.gameContainer.clientHeight - this.height) {
                this.yVelocity *= -1; // Change Y direction when reaches the container border
            }

            this.xPosition += this.xVelocity;
            this.yPosition += this.yVelocity;


            // Update duck positioning
            duckElement.style.left = this.xPosition + 'px';
            duckElement.style.top = this.yPosition + 'px';

            // wings movement  
            this.alternateDuckImage(duckElement);   
        } else if (!this.isAlive && duckElement !== null) {
            this.killAnimation(duckElement)
        }

        requestAnimationFrame(this.fly.bind(this));
    }

    render(): HTMLDivElement {
        const duckElement = document.createElement('div');
        duckElement.classList.add('duck');
        duckElement.dataset.id = this.id;
        duckElement.dataset.score = String(this.defaultScore);

        const duckImage = document.createElement('img');
        duckImage.src = this.flyingImages[0];
        duckImage.width = this.width;
        
        duckElement.appendChild(duckImage);

        return duckElement;
    }

    killAnimation(duckElement: HTMLDivElement): void {
        
        const duckImage = duckElement.querySelector('img');
        duckImage.src = this.deathImage;

        this.yPosition += VERTICAL_FALL; // Move duck vertically downwards
        duckElement.style.top = this.yPosition + 'px';

        // Check if the duck has reached the bottom of the container
        if (this.yPosition > this.gameContainer.clientHeight - this.height) {
            duckElement.style.display = 'none'; // Hide the duck
            duckElement.remove();
        }
    }

    kill(): void {
        this.isAlive = false;
        this.isFlying = false;
    }

    stopFliying(): void {
        this.isFlying = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    continueFliying(): void {
        this.isFlying = true;
        this.setProportionalVelocity();
    }

    findDuckElementById(): HTMLDivElement {
        return document.querySelector(`[data-id="${this.id}"]`);
    }

    private alternateDuckImage(duckElement: HTMLDivElement) {
        this.frameCount++;

        if (this.frameCount >= this.frameChangeInterval) {
            const duckImage: HTMLImageElement = duckElement.querySelector('img');
            this.flyingImagesToogle = !this.flyingImagesToogle;
            duckImage.src = this.flyingImagesToogle ? this.flyingImages[0] : this.flyingImages[1];
            
            this.frameCount = 0; // Reset frame counter
        }
    }

    private setProportionalVelocity() {
        this.xVelocity =  DEFAULT_X_VELOCITY * (this.gameContainer.offsetWidth / this.gameContainer.offsetHeight);
        this.yVelocity = DEFAULT_Y_VELOCITY * (this.gameContainer.offsetHeight / this.gameContainer.offsetWidth); 
    }
}