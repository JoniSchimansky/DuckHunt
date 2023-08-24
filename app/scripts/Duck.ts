import { v4 as uuidv4 } from 'uuid';
import { DUCKS_PROPERTIES, DuckInterface, DuckType, FRAME_INTERVAL, VERTICAL_FALL } from '../model/Duck.interface';
export class Duck implements DuckInterface{
    id: string;

    xPosition: number;
    yPosition: number;
    xVelocity: number;
    yVelocity: number;

    isAlive: boolean = true;
    isFlying: boolean = true;
    isScared: boolean = false;
    defaultScore: number;
    type: DuckType;
    shotsToDie: number;

    private width: number;
    private height: number;
    private gameContainer: HTMLDivElement = document.querySelector('.game-container');

    private flyingImages: string[];
    private deathImage: string;
    private flyingImagesToogle: boolean = true;

    private frameCount: number = 0; // Counter for frames
    private frameChangeInterval: number = FRAME_INTERVAL; // Change image every 10 frames

    constructor(type: DuckType) {
        this.id = uuidv4();
        this.type = type;
        this.setPropertiesByType();
        this.setProportionalVelocity();
        this.xPosition = Math.random() * (this.gameContainer.offsetWidth - this.width);
        this.yPosition = Math.random() * (this.gameContainer.offsetHeight - this.height);
    }

    setPropertiesByType() {
        this.flyingImages = [`../public/images/${this.type}_duck1.png`, `../public/images/${this.type}_duck2.png`];
        this.deathImage = `../../public/images/${this.type}_duck_dead.png`;

        this.width = DUCKS_PROPERTIES[this.type].width;
        this.height = DUCKS_PROPERTIES[this.type].height;
        this.defaultScore = DUCKS_PROPERTIES[this.type].score;
        this.shotsToDie = DUCKS_PROPERTIES[this.type].shotsToDie;
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
        } else if  (this.isScared && duckElement !== null) {
            this.flyAway(duckElement);
            this.alternateDuckImage(duckElement);
        }

        requestAnimationFrame(this.fly.bind(this));
    }
    
    flyAway(duckElement: HTMLDivElement) {
        duckElement.style.transform = 'rotate(330deg)';
        
        this.yPosition += -VERTICAL_FALL;
        duckElement.style.top = this.yPosition + 'px';

        if (this.yPosition <= 0) {
            duckElement.style.display = 'none'; // Hide the duck
            duckElement.remove();
        }
    }

    reverseFly() {
        const duckElement: HTMLDivElement = this.findDuckElementById();
        this.xVelocity *= -1;
        this.yVelocity *= -1;
        this.xPosition += this.xVelocity;
        this.yPosition += this.yVelocity;

        duckElement.style.left = this.xPosition + 'px';
        duckElement.style.top = this.yPosition + 'px';
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
        this.xVelocity =  DUCKS_PROPERTIES[this.type].xVelocity * (this.gameContainer.offsetWidth / this.gameContainer.offsetHeight);
        this.yVelocity = DUCKS_PROPERTIES[this.type].yVelocity * (this.gameContainer.offsetHeight / this.gameContainer.offsetWidth);         
    }
}