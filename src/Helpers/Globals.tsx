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

export const easyWidth = Number(process.env.REACT_APP_EASY_WIDTH)
export const mediumWidth = Number(process.env.REACT_APP_MEDIUM_WIDTH)
export const hardWidth = Number(process.env.REACT_APP_HARD_WIDTH)
export const easyHealth = Number(process.env.REACT_APP_EASY_HEALTH)
export const mediumHealth = Number(process.env.REACT_APP_MEDIUM_HEALTH)
export const hardHealth = Number(process.env.REACT_APP_HARD_HEALTH)
export const easyMoves = Number(process.env.REACT_APP_EASY_MOVES)
export const mediumMoves = Number(process.env.REACT_APP_MEDIUM_MOVES)
export const hardMoves = Number(process.env.REACT_APP_HARD_MOVES)

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



