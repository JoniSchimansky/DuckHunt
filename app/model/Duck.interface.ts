// Default duck
export const DEFAULT_X_VELOCITY:number = 2;
export const DEFAULT_Y_VELOCITY:number = 2;
export const DEFAULT_WIDTH: number = 100;
export const DEFAULT_HEIGHT: number = 70;
export const DEFAULT_SCORE: number = 1;
export const FRAME_INTERVAL: number = 10;
export const VERTICAL_FALL: number = 7;

// Tank duck
export const DEFAULT_TANK_X_VELOCITY:number = 1;
export const DEFAULT_TANK_Y_VELOCITY:number = 1;
export const DEFAULT_TANK_WIDTH: number = 140;
export const DEFAULT_TANK_HEIGHT: number = 80;
export const DEFAULT_TANK_SCORE: number = 2;

// Fast duck
export const DEFAULT_FAST_X_VELOCITY:number = 3;
export const DEFAULT_FAST_Y_VELOCITY:number = 3;
export const DEFAULT_FAST_WIDTH: number = 70;
export const DEFAULT_FAST_HEIGHT: number = 60;
export const DEFAULT_FAST_SCORE: number = 3;

export interface DuckInterface {
    id: string;
    xPosition: number;
    yPosition: number;
    xVelocity: number;
    yVelocity: number;
    isAlive: boolean;
    isFlying: boolean;
    defaultScore: number;
}