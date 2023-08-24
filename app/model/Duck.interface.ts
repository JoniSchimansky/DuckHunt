export const FRAME_INTERVAL: number = 10;
export const VERTICAL_FALL: number = 7;

import normalDuckUp from '../public/images/normal_duck1.png';
import normalDuckDown from '../public/images/normal_duck2.png';
import normalDuckDead from '../public/images/normal_duck_dead.png';
import tankDuckUp from '../public/images/tank_duck1.png';
import tankDuckDown from '../public/images/tank_duck2.png';
import tankDuckDead from '../public/images/tank_duck_dead.png';
import fastDuckUp from '../public/images/fast_duck1.png';
import fastDuckDown from '../public/images/fast_duck2.png';
import fastDuckDead from '../public/images/fast_duck_dead.png';

export const DUCKS_PROPERTIES = {
    normal : {
        xVelocity: 2,
        yVelocity: 2,
        width: 100,
        height: 70,
        score: 5,
        shotsToDie: 1,
        upAsset: normalDuckUp,
        downAsset: normalDuckDown,
        deadAsset: normalDuckDead,
    },
    tank: {
        xVelocity: 1,
        yVelocity: 1,
        width: 140,
        height: 80,
        score: 10,
        shotsToDie: 2,
        upAsset: tankDuckUp,
        downAsset: tankDuckDown,
        deadAsset: tankDuckDead,
    },
    fast: {
        xVelocity: 3,
        yVelocity: 3,
        width: 70,
        height: 60,
        score: 15,
        shotsToDie: 1,
        upAsset: fastDuckUp,
        downAsset: fastDuckDown,
        deadAsset: fastDuckDead,
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
    shotsToDie: number;
}

export enum DuckType {
    normal = 'normal',
    tank = 'tank',
    fast = 'fast',
}