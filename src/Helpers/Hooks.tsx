import { useReducer, useState, useRef, useEffect, Reducer } from "react";
import { buildGameArray, difficulyReset, findIndex, isGameOver, updateGameArray, updateScore } from "./Utils";
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
    playerIndex: [number, number];
    gameArray: string[][];
    width: number;
    healthPoints: number;
    moves: number;
    newSquare: string;
    difficulty: string;
    gameCondition: 'new' | 'running' | 'winner' | 'loser';
}

const initialGameState: GameState = {
    playerIndex: [0, 0],
    gameArray: [[]],
    width: mediumWidth,
    healthPoints: mediumHealth,
    moves: mediumMoves,
    newSquare: '',
    difficulty: 'medium',
    gameCondition: 'new',
};

//REDUCER STARTS HERE ******************************
const gameReducer: Reducer<GameState, GameAction> = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        //fired each time the game starts/startsover
        case 'GameStarted':
            const thisDifficuly = difficulyReset(state.difficulty);
            const newArray = buildGameArray(state.width);
            return {
                ...state,
                healthPoints: thisDifficuly.healthDiff,
                moves: thisDifficuly.movesDiff,
                playerIndex: [0, 0],
                gameArray: newArray,
                gameCondition: 'new',
            };
        //fired on every arrow key press
        case 'KeyPressed':
                if (state.gameCondition !== 'loser' && state.gameCondition !== 'winner') {
                    const newIndex = findIndex(state.gameArray, state.playerIndex, action.key);
                    const newScore = updateScore(state.healthPoints, state.moves, newIndex, state.gameArray);
                    const updatedArray: string[][] = updateGameArray(state.gameArray, state.playerIndex, newIndex);
                    const nextGameState = isGameOver(newScore.remainingHealth, newScore.remainingMoves, newScore.newSquare);
                    
                    return {
                        ...state,
                        playerIndex: newIndex,
                        gameArray: updatedArray,
                        healthPoints: newScore.remainingHealth,
                        moves: newScore.remainingMoves,
                        newSquare: newScore.newSquare,
                        gameCondition: nextGameState,
                    };
                } else {
                    return state
                }
        default:
            return state
        
        //fired after changing difficulties
        case 'DifficultyChanged':
            switch (action.difficulty) {
                case 'easy':
                    return {
                        ...state,
                        difficulty: 'easy',
                        width: easyWidth,
                        healthPoints: easyHealth,
                        moves: easyMoves,
                        playerIndex: [0, 0],
                        gameArray: buildGameArray(easyWidth),
                        gameCondition: 'new',
                    };
                case 'medium':
                    return {
                        ...state,
                        difficulty: 'medium',
                        width: mediumWidth,
                        healthPoints: mediumHealth,
                        moves: mediumMoves,
                        playerIndex: [0, 0],
                        gameArray: buildGameArray(mediumWidth),
                        gameCondition: 'new',
                    };
                case 'hard':
                    return {
                        ...state,
                        difficulty: 'hard',
                        width: hardWidth,
                        healthPoints: hardHealth,
                        moves: hardMoves,
                        playerIndex: [0, 0],
                        gameArray: buildGameArray(hardWidth),
                        gameCondition: 'new',
                    };
                default:
                    return state;
            };
    };
};

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

    return {
        startGame,
        pressKey,
        changeDifficulty,
        grid: state.gameArray,
        width: state.width,
        health: state.healthPoints,
        moves: state.moves,
        gameCondition: state.gameCondition,
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