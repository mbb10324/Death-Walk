import { MutableRefObject, useState } from "react";
import { useRef, useEffect } from 'react';

//custom hook to check for first render
export function useMount() {
    const isMountRef = useRef(false);
    useEffect(() => {
        isMountRef.current = true;
    }, []);
    return isMountRef.current;
};

//custom hook to persist old and new versions of state
export function usePlayer(initialValue: number) {
    const [playerIndex, setPlayerIndex] = useState(initialValue);
    let current = playerIndex;
    const get = () => current;
    const set = (newValue: number) => {
        current = newValue;
        setPlayerIndex(newValue);
        return current;
    }
    return { get, set }
}

//custom hook to persist old and new versions of state
export function useGameArray(initialValue: string[]) {
    const [gameArray, setGameArray] = useState(initialValue);
    let current = gameArray;
    const get = () => current;
    const set = (newValue: string[]) => {
        current = newValue;
        setGameArray(newValue);
        return current;
    }
    return { get, set }
}

//custom hook to stucture shared state changes
export function useGame() {
    const [width, setWidth] = useState<number>(window.mediumWidth); //state to track width relative to difficulty
    const [healthPoints, setHealthPoints] = useState<number>(window.mediumHealth); //state to hold health points
    const [moves, setMoves] = useState<number>(window.mediumMoves); //state to hold moves
    const [difficulty, setDifficulty] = useState<string>('medium');
    const [showLose, setShowLose] = useState<boolean>(false); //bool state for showing loser modal
    const [showWin, setShowWin] = useState<boolean>(false); //bool state for showing winner modal
    const [gameEnded, setGameEnded] = useState<boolean>(false); //will trigger to true after game ends, and false while game is being played
    const scoreStuff = useRef({ remainingMoves: window.mediumMoves, remainingHealth: window.mediumHealth, newSquare: '' });
    const wins = useRef(0) as MutableRefObject<number>;
    const loses = useRef(0) as MutableRefObject<number>;
    const gamesPlayed = useRef(0) as MutableRefObject<number>;

    function winner() {
        if (gameEnded === false) {
            setShowWin(true);
            wins.current = wins.current + 1;
        };
    };

    function loser() {
        if (gameEnded === false) {
            setShowLose(true);
            loses.current = loses.current + 1;
        };
    };

    function resetGame() {
        if (gameEnded === false) {
            if (difficulty === 'easy') easyGame();
            if (difficulty === 'medium') mediumGame();
            if (difficulty === 'hard') hardGame();
            gamesPlayed.current = gamesPlayed.current + 1;
            setGameEnded(true);
        };
    };

    function easyGame() {
        setDifficulty('easy');
        setWidth(window.easyWidth);
        setHealthPoints(window.easyHealth);
        setMoves(window.easyMoves);
    };

    function mediumGame() {
        setDifficulty('medium');
        setWidth(window.mediumWidth);
        setHealthPoints(window.mediumHealth);
        setMoves(window.mediumMoves);
    };

    function hardGame() {
        setDifficulty('hard');
        setWidth(window.hardWidth);
        setHealthPoints(window.hardHealth);
        setMoves(window.hardMoves);
    };

    function resetCounters() {
        gamesPlayed.current = 0
        loses.current = 0
        wins.current = 0
    };

    return {
        setHealthPoints, setMoves, setShowLose, setShowWin, setGameEnded,
        winner, loser, resetGame, easyGame, mediumGame, hardGame, resetCounters,
        width, healthPoints, moves, showLose, showWin, gameEnded, scoreStuff, difficulty, gamesPlayed, wins, loses,
    };
};

export interface ScoreStuff {
    remainingMoves: number;
    remainingHealth: number;
    newSquare: string;
};