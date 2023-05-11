import './Game.css';
import { useEffect, KeyboardEvent, useState } from 'react';
import { useGame } from '../../Helpers/Hooks';
import laugh from '../../images/laugh.png';
import skull from '../../images/skull.png';
import BugReporter from '../BugReportModal/BugReportModal';
import Grid from '../Grid/Grid';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';

export default function Game() {
    const game = useGame(); //Reducer to manage game state

    const [gameEnded, setGameEnded] = useState(false); //bool to check when game ends

    //triggered after each game ends, and on mount
    useEffect(() => {
        if (!gameEnded) {
            game.startGame();
            window.addEventListener('keydown', keyPress);
            return () => { window.removeEventListener('keydown', keyPress) };
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameEnded, game.width]);

    //called after each arrow key is pressed
    function keyPress(event: KeyboardEvent<HTMLInputElement>) {
        //case to only run on arrow key press
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft':
                event.preventDefault();
                game.pressKey(event.key);
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
            <Grid gameArray={game.grid} />
            {/* contains the call to score and bug report components; and license/contact info */}
            <div className='right-container'>
                <Score
                    playerIndex={game.playerIndex}
                    healthPoints={game.health}
                    moves={game.moves}
                    newSquare={game.newSquare}
                    changeDifficulty={game.changeDifficulty}
                    determineGameOver={game.determineGameOver}
                    setGameEnded={setGameEnded}
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