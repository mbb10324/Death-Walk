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

window.easyWidth = Number(process.env.REACT_APP_EASY_WIDTH)
window.mediumWidth = Number(process.env.REACT_APP_MEDIUM_WIDTH)
window.hardWidth = Number(process.env.REACT_APP_HARD_WIDTH)
window.easyHealth = Number(process.env.REACT_APP_EASY_HEALTH)
window.mediumHealth = Number(process.env.REACT_APP_MEDIUM_HEALTH)
window.hardHealth = Number(process.env.REACT_APP_HARD_HEALTH)
window.easyMoves = Number(process.env.REACT_APP_EASY_MOVES)
window.mediumMoves = Number(process.env.REACT_APP_MEDIUM_MOVES)
window.hardMoves = Number(process.env.REACT_APP_HARD_MOVES)

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



