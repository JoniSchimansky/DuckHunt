export const DEFAULT_X_VELOCITY:number = 2;
export const DEFAULT_Y_VELOCITY:number = 2;
export const DEFAULT_WIDTH: number = 100;
export const DEFAULT_HEIGHT: number = 70;
export const DEFAULT_SCORE: number = 1;
export const FRAME_INTERVAL: number = 10;
export const VERTICAL_FALL: number = 7;

export interface DuckInterface {
    id: string;
    xPosition: number;
    yPosition: number;
    xVelocity: number;
    yVelocity: number;
    isAlive: boolean;
    isFlying: boolean;
    isScared: boolean;
    defaultScore: number;
}