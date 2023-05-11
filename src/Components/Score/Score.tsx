import './Score.css';
import { useEffect } from 'react';
import { isGameOver } from '../../Helpers/Utils';
import { DifficultyTypes, useScore } from '../../Helpers/Hooks';
import Modals from '../ResultModals/ResultModals';
import Difficulty from '../Difficulty/Difficulty';

type Props = {
    playerIndex: number[];
    healthPoints: number;
    moves: number;
    newSquare: string;
    changeDifficulty: (difficulty: DifficultyTypes) => void;
    determineGameOver: (string: string) => void;
    setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Score(props: Props) {
    const { playerIndex, healthPoints, moves, newSquare,
        changeDifficulty, determineGameOver, setGameEnded } = props; //define props

    const score = useScore(); //custom hook to handle score states

    //triggered each time a player moves
    useEffect(() => {
        //checks to see if game has ended
        const gameOver = isGameOver(healthPoints, moves, newSquare);
        if (gameOver.result === 'loser') {
            determineGameOver('loser');
            setGameEnded(true);
            score.loser();
        } else if (gameOver.result === 'winner') {
            determineGameOver('winner');
            setGameEnded(true);
            score.winner();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerIndex]);

    return (
        <>
            {/* displays all the score and game data */}
            <div className='score'>
                <h1>SCORE</h1>
                <h3>Health: {healthPoints}</h3>
                <h3>Moves: {moves}</h3>
                <br></br>
                <h3>Games Played: {score.gamesPlayed}</h3>
                <h3>Loses: {score.loses}</h3>
                <h3>Wins: {score.wins}</h3>
                <br></br>
                {/* call to difficulty component */}
                <Difficulty
                    playerIndex={playerIndex}
                    changeDifficulty={changeDifficulty}
                    resetCounters={score.resetCounters}
                />
            </div>
            {/* call to modals component  */}
            <Modals
                setGameEnded={setGameEnded}
                setShowWin={score.setShowWin}
                setShowLose={score.setShowLose}
                showWin={score.showWin}
                showLose={score.showLose}
            />
        </>
    );
};