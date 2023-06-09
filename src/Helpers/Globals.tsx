import { KeyboardEvent } from 'react';

declare global {
    interface WindowEventMap {
        keydown: KeyboardEvent<HTMLInputElement>
    }
    interface SquareDefinitions {
        [key: string]: { moves: number, health: number }
    }
    interface Window {
        easyWidth: number
        mediumWidth: number
        hardWidth: number
        easyHealth: number
        mediumHealth: number
        hardHealth: number
        easyMoves: number
        mediumMoves: number
        hardMoves: number
    }
};

export const easyWidth = 10
export const easyHealth = 100
export const easyMoves = 40

export const mediumWidth = 26
export const mediumHealth = 220
export const mediumMoves = 100

export const hardWidth = 50
export const hardHealth = 450
export const hardMoves = 200

//define types of squares
export const squareDefinitions: SquareDefinitions = {
    'player': { moves: 0, health: 0 },
    'end': { moves: 0, health: 0 },
    'visited': { moves: 0, health: 0 },
    'blank': { moves: -1, health: 0 },
    'speeder': { moves: 0, health: -5 },
    'lava': { moves: -10, health: -50 },
    'mud': { moves: -5, health: -10 }
};



