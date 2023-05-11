import { useReducer, useState, useRef, useEffect } from "react";
import { buildGameArray, difficulyReset, findIndex, updateGameArray, updateScore } from "./Utils";
import { easyHealth, easyMoves, easyWidth, hardHealth, hardMoves, hardWidth, mediumHealth, mediumMoves, mediumWidth } from "./Globals";

export type ArrowKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'

export type Result = 'loser' | 'winner' | 'continue'

type GameAction
    = { type: 'GameStarted' }
    | { type: 'KeyPressed', key: ArrowKey }
    | { type: 'DifficultyChanged', difficulty: DifficultyTypes }
    | { type: 'DetermineGameOver', result: string }

export enum DifficultyTypes {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
};

interface GameState {
    playerIndex: any; //number[]
    gameArray: any; //string[][]
    width: number;
    healthPoints: number;
    moves: number;
    newSquare: string;
    difficulty: string;
}

const initialGameState: GameState = {
    playerIndex: [0, 0],
    gameArray: [[]],
    width: mediumWidth,
    healthPoints: mediumHealth,
    moves: mediumMoves,
    newSquare: '',
    difficulty: 'medium',
};

//REDUCER STARTS HERE ******************************
const gameReducer = (state: GameState, action: GameAction) => {
    switch (action.type) {
        //fired each time the game starts/startsover
        case 'GameStarted':
            return {
                ...state,
                playerIndex: [0, 0],
                gameArray: buildGameArray(state.width),
            };
        //fired on every arrow key press
        case 'KeyPressed':
            const newIndex = findIndex(state.gameArray, state.playerIndex, action.key);
            let updatedArray: string[][] = []
            let newScore = { remainingHealth: 0, remainingMoves: 0, newSquare: '' }
            if (newIndex) {
                newScore = updateScore(state.healthPoints, state.moves, newIndex, state.gameArray);
                updatedArray = updateGameArray(state.gameArray, state.playerIndex, newIndex);
            }
            return {
                ...state,
                playerIndex: newIndex,
                gameArray: updatedArray,
                healthPoints: newScore.remainingHealth,
                moves: newScore.remainingMoves,
                newSquare: newScore.newSquare
            };
        //fired after changing difficulties
        case 'DifficultyChanged':
            switch (action.difficulty) {
                case 'easy':
                    return {
                        ...state,
                        difficulty: 'easy',
                        width: easyWidth,
                        healthPoints: easyHealth,
                        moves: easyMoves
                    };
                case 'medium':
                    return {
                        ...state,
                        difficulty: 'medium',
                        width: mediumWidth,
                        healthPoints: mediumHealth,
                        moves: mediumMoves
                    };
                case 'hard':
                    return {
                        ...state,
                        difficulty: 'hard',
                        width: hardWidth,
                        healthPoints: hardHealth,
                        moves: hardMoves
                    };
                default:
                    return state;
            };
        //fired every time the score is updated
        case 'DetermineGameOver':
            const thisDifficuly = difficulyReset(state.difficulty)
            switch (action.result) {
                case 'loser':
                    return {
                        ...state,
                        playerIndex: [0, 0],
                        healthPoints: thisDifficuly.healthDiff,
                        moves: thisDifficuly.movesDiff
                    };
                case 'winner':
                    return {
                        ...state,
                        playerIndex: [0, 0],
                        healthPoints: thisDifficuly.healthDiff,
                        moves: thisDifficuly.movesDiff
                    };
                default:
                    return state;
            };
        default:
            return state;
    }
}

export function useGame() {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    function startGame() {
        dispatch({ type: 'GameStarted' });
    };

    function pressKey(key: ArrowKey) {
        dispatch({ type: 'KeyPressed', key });
    };

    function changeDifficulty(difficulty: DifficultyTypes) {
        dispatch({ type: 'DifficultyChanged', difficulty });
    };

    function determineGameOver(result: string) {
        dispatch({ type: 'DetermineGameOver', result });
    };

    return {
        startGame,
        pressKey,
        changeDifficulty,
        determineGameOver,
        grid: state.gameArray,
        playerIndex: state.playerIndex,
        width: state.width,
        health: state.healthPoints,
        moves: state.moves,
        newSquare: state.newSquare
    };
};

//custom hook to stucture shared state changes
export function useScore() {
    const [showLose, setShowLose] = useState<boolean>(false); //bool state for showing loser modal
    const [showWin, setShowWin] = useState<boolean>(false); //bool state for showing winner modal
    const [wins, setWins] = useState<number>(0); //win counter
    const [loses, setLoses] = useState<number>(0); //lose counter
    const [gamesPlayed, setGamesPlayed] = useState<number>(0); //total games played counter

    function winner() {
        setShowWin(true);
        setWins(wins + 1);
        setGamesPlayed(gamesPlayed + 1);
    };

    function loser() {
        setShowLose(true);
        setLoses(loses + 1);
        setGamesPlayed(gamesPlayed + 1);
    };

    function resetCounters() {
        setWins(0);
        setLoses(0);
        setGamesPlayed(0);
    };

    return {
        setShowLose, setShowWin,
        winner, loser, resetCounters,
        showLose, showWin, gamesPlayed, wins, loses,
    };
};

//custom hook to check for first render
export function useMount() {
    const isMountRef = useRef(false);
    useEffect(() => {
        isMountRef.current = true;
    }, []);
    return isMountRef.current;
};