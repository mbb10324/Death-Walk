import './Game.css';
import { useEffect, useState, KeyboardEvent } from 'react';
import { useMount, findIndex, buildGameArray, updateGameArray, updateClassNames } from '../../Helpers/Utils';
import blueMan from '../../images/blueman.jpg';
import skull from '../../images/skull.png';
import BugReporter from '../BugReportModal/BugReportModal'
import Squares from '../Squares/Squares';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';

function Game() {
    const mounted = useMount(); //custom hook to check for initial mount
    const [width, setWidth] = useState<number>(window.mediumWidth); //state to track width relative to difficulty
    const [gameArray, setGameArray] = useState<string[]>([]); //holds all classnames of the game in an array
    const [playerIndex, setPlayerIndex] = useState<number>(0); //players current index in the game array
    const [gameEnded, setGameEnded] = useState<boolean>(false); //will trigger to true after game ends, and false while game is being played
    const [showBugReport, setShowBugReport] = useState(false); //bool state to toggle bug report modal

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

    function keyPress(event: KeyboardEvent<HTMLInputElement>) {
        setPlayerIndex(prevplayerIndex => {
            const newIndex = prevplayerIndex
            //determines the index that the player is traveling to
            return findIndex(event.key, newIndex, width);
        });
    };

    //triggered each time a player moves, but not on mount
    useEffect(() => {
        if (mounted) {
            //update class names and game array after keypress
            updateClassNames(playerIndex);
            const updatedArray = updateGameArray(gameArray, playerIndex);
            setGameArray(updatedArray);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerIndex]);

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
            {/* contains the call to score component and license/contact info */}
            <div className='right-container'>
                <Score gameArray={gameArray} playerIndex={playerIndex} setPlayerIndex={setPlayerIndex} setGameEnded={setGameEnded} setWidth={setWidth} />
                <img src={skull} alt='' />
                <h3>Good Luck!</h3>
                <button onClick={() => setShowBugReport(true)}>Report Bugs</button>
                <BugReporter showBugReport={showBugReport} setShowBugReport={setShowBugReport} />
                <p>Copyright (c) 2023 Death Walk</p>
                <p>&larr; Escape death here on the pink square</p>
            </div>
        </div>
    );
};

export default Game;