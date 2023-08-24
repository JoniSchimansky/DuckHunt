export const FRAME_INTERVAL: number = 10;
export const VERTICAL_FALL: number = 7;

export const DUCKS_PROPERTIES = {
    normal : {
        xVelocity: 2,
        yVelocity: 2,
        width: 100,
        height: 70,
        score: 5,
    },
    tank: {
        xVelocity: 1,
        yVelocity: 1,
        width: 140,
        height: 80,
        score: 10,
    },
    fast: {
        xVelocity: 3,
        yVelocity: 3,
        width: 70,
        height: 60,
        score: 15,
    },
}

// Generate special ducks each X normal
export const GROUP_OF_DUCKS: number = 4;

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
    type: DuckType;
}

export enum DuckType {
    normal = 'normal',
    tank = 'tank',
    fast = 'fast',
}