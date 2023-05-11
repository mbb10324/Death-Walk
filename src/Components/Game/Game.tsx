import './Game.css';
import { useEffect, KeyboardEvent } from 'react';
import { useGame, useScore } from '../../Helpers/Hooks';
import laugh from '../../images/laugh.png';
import skull from '../../images/skull.png';
import BugReporter from '../BugReportModal/BugReportModal';
import Grid from '../Grid/Grid';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';
import Difficulty from '../Difficulty/Difficulty';
import Modals from '../ResultModals/ResultModals';

export default function Game() {
    const game = useGame(); //Reducer to manage game state

    const score = useScore(); //custom hook to handle score states

    useEffect(() => {
        game.startGame();
        window.addEventListener('keydown', keyPress);
        return () => { window.removeEventListener('keydown', keyPress) };
    }, []);

    useEffect(() => {
        if (game.gameCondition === 'winner') {
            score.winner();
        } else if (game.gameCondition === 'loser') {
            score.loser();
        }
    }, [game.gameCondition]);

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
                    healthPoints={game.health}
                    moves={game.moves}
                    wins={score.wins}
                    loses={score.loses}
                    gamesPlayed={score.gamesPlayed}
                />
                <Difficulty
                    gameInProgress={game.gameCondition === 'running'}
                    changeDifficulty={game.changeDifficulty}
                    resetCounters={score.resetCounters}
                />
                <Modals
                    clickedRestart={() => game.startGame()}
                    setShowWin={score.setShowWin}
                    setShowLose={score.setShowLose}
                    showWin={score.showWin}
                    showLose={score.showLose}
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