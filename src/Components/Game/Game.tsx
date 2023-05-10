import './Game.css';
import { useEffect, useRef, KeyboardEvent } from 'react';
import { findIndex, buildGameArray, updateGameArray, updateScore } from '../../Helpers/Utils';
import laugh from '../../images/laugh.png'
import blueMan from '../../images/blueman.jpg';
import skull from '../../images/skull.png';
import BugReporter from '../BugReportModal/BugReportModal';
import Grid from '../Grid/Grid';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';
import { useGame, useGameArray, usePlayer } from '../../Helpers/Hooks';

function Game() {
    const game = useGame(); //custom hook that manages the majority of state changes across the app
    const playerIndex = usePlayer(0); //holds the players index within the array
    const gameArray = useGameArray([]); //holds the array that builds the game board
    const healthPointRef = useRef(0); //ref to remember previous health points
    healthPointRef.current = game.healthPoints; //link ref and state
    const movesRef = useRef(0); //ref to remember previous moves
    movesRef.current = game.moves; //link ref and state

    //triggered after each game ends, and on mount
    useEffect(() => {
        if (!game.gameEnded) {
            //initial array with randomized classes to build/track the game ex: ['player', 'blank', 'lave', etc...]
            const shuffledArray = buildGameArray(game.width);
            gameArray.set(shuffledArray);
            //event listener for arrow keys
            window.addEventListener('keydown', keyPress);
            return () => { window.removeEventListener('keydown', keyPress) };
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.gameEnded, game.width]);

    //called after each arrow key is pressed
    function keyPress(event: KeyboardEvent<HTMLInputElement>) {
        //case to only run on arrow key press
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft':
                event.preventDefault();
                //square that we were on
                const oldIndex = playerIndex.get();
                //square that were going to
                const newIndex = findIndex(event.key, oldIndex, game.width);
                //new score based off new square
                const newScore = updateScore(healthPointRef.current, movesRef.current, newIndex, gameArray.get());
                //array with player position changed
                const updatedArray = updateGameArray(gameArray.get(), newIndex);
                //set states
                playerIndex.set(newIndex);
                gameArray.set(updatedArray);
                game.scoreStuff.current = newScore;
        };
    };

    return (
        <div className='game-container'>
            {/* contains the title and call to rules component */}
            <div className='left-container'>
                <h1>Death Walk</h1>
                <img src={skull} alt='' />
                <Rules />
            </div>
            {/* calls the component that builds the squares */}
            <Grid gameArray={gameArray.get()} />
            {/* contains the call to score and bug report components; and license/contact info */}
            <div className='right-container'>
                <Score
                    setHealthPoints={game.setHealthPoints}
                    setMoves={game.setMoves}
                    scoreStuff={game.scoreStuff.current}
                    easyGame={game.easyGame}
                    mediumGame={game.mediumGame}
                    hardGame={game.hardGame}
                    resetCounters={game.resetCounters}
                    resetGame={game.resetGame}
                    winner={game.winner}
                    loser={game.loser}
                    difficulty={game.difficulty}
                    playerIndex={playerIndex.get}
                    setPlayerIndex={playerIndex.set}
                    healthPoints={game.healthPoints}
                    moves={game.moves}
                    gamesPlayed={game.gamesPlayed.current}
                    loses={game.loses.current}
                    wins={game.wins.current}
                    showLose={game.showLose}
                    setShowLose={game.setShowLose}
                    showWin={game.showWin}
                    setShowWin={game.setShowWin}
                    setGameEnded={game.setGameEnded}
                />
                <h3>Good Luck!</h3>
                <img src={laugh} alt='' />
                <BugReporter />
                <p>Copyright (c) 2023 Death Walk</p>
                <p>&larr; Escape death on the pink square</p>
            </div>
        </div>
    );
};

export default Game;