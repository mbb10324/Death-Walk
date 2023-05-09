import './Game.css';
import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { findIndex, buildGameArray, updateGameArray, updateScore } from '../../Helpers/Utils';
import blueMan from '../../images/blueman.jpg';
import skull from '../../images/skull.png';
import BugReporter from '../BugReportModal/BugReportModal';
import Squares from '../Grid/Grid';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';

function Game() {
    const [width, setWidth] = useState<number>(window.mediumWidth); //state to track width relative to difficulty
    const [healthPoints, setHealthPoints] = useState<number>(window.mediumHealth); //state to hold health points
    const healthPointRef = useRef(0); //ref to remember previous health points
    healthPointRef.current = healthPoints; //link ref and state
    const [moves, setMoves] = useState<number>(window.mediumMoves); //state to hold moves
    const movesRef = useRef(0); //ref to remember previous moves
    movesRef.current = moves; //link ref and state
    const [gameArray, setGameArray] = useState<string[]>([]); //holds all classnames of the game in an array
    const [playerIndex, setPlayerIndex] = useState<number>(0); //players current index in the game array
    const [gameEnded, setGameEnded] = useState<boolean>(false); //will trigger to true after game ends, and false while game is being played
    const [scoreStuff, setScoreStuff] = useState({ remainingMoves: window.mediumMoves, remainingHealth: window.mediumHealth, newSquare: '' }); //constructs object to pass to score component

    //triggered after each game ends, and on mount
    useEffect(() => {
        if (!gameEnded) {
            //initial array with randomized classes to build/track the game ex: ['player', 'blank', 'lave', etc...]
            const shuffledArray = buildGameArray(width);
            setGameArray(shuffledArray);
            //event listener for arrow keys
            window.addEventListener('keydown', keyPress);
            return () => { window.removeEventListener('keydown', keyPress) };
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameEnded, width]);

    //called after each arrow key is pressed
    function keyPress(event: KeyboardEvent<HTMLInputElement>) {
        //only fire on arrow keys
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft':
                //start with player index
                setPlayerIndex(prevplayerIndex => {
                    const oldIndex = prevplayerIndex;
                    const newIndex = findIndex(event.key, oldIndex, width);
                    //update game array asynchronously with playerIndex
                    setGameArray(prevGameArray => {
                        const newScore = updateScore(healthPointRef.current, movesRef.current, newIndex, prevGameArray);
                        //update score asynchornously with gameArray
                        setScoreStuff(newScore);
                        const updatedArray = updateGameArray(prevGameArray, newIndex);
                        return updatedArray;
                    });
                    return newIndex;
                });
        };
    };

    return (
        <div className='game-container'>
            {/* contains the title and call to rules component */}
            <div className='left-container'>
                <h1>Death Walk</h1>
                <img src={blueMan} alt='' />
                <Rules />
            </div>
            {/* calls the component that builds the squares */}
            <Squares gameArray={gameArray} />
            {/* contains the call to score and bug report components; and license/contact info */}
            <div className='right-container'>
                <Score
                    scoreStuff={scoreStuff}
                    healthPoints={healthPoints}
                    moves={moves}
                    playerIndex={playerIndex}
                    setHealthPoints={setHealthPoints}
                    setMoves={setMoves}
                    setGameArray={setGameArray}
                    setPlayerIndex={setPlayerIndex}
                    setGameEnded={setGameEnded}
                    setWidth={setWidth}
                />
                <img src={skull} alt='' />
                <h3>Good Luck!</h3>
                <BugReporter />
                <p>Copyright (c) 2023 Death Walk</p>
                <p>&larr; Escape death here on the pink square</p>
            </div>
        </div>
    );
};

export default Game;