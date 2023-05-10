import './Score.css';
import { useEffect } from 'react';
import { isGameOver } from '../../Helpers/Utils';
import { ScoreStuff } from '../../Helpers/Hooks';
import Modals from '../ResultModals/ResultModals';
import Difficulty from '../Difficulty/Difficulty'

type Props = {
    difficulty: string;
    playerIndex: () => number;
    healthPoints: number;
    moves: number;
    gamesPlayed: number;
    loses: number;
    wins: number;
    showLose: boolean;
    showWin: boolean;
    scoreStuff: ScoreStuff;
    easyGame: () => void;
    mediumGame: () => void;
    hardGame: () => void;
    resetCounters: () => void;
    resetGame: () => void;
    winner: () => void;
    loser: () => void;
    setPlayerIndex: (num: number) => number;
    setHealthPoints: React.Dispatch<React.SetStateAction<number>>;
    setMoves: React.Dispatch<React.SetStateAction<number>>;
    setShowLose: React.Dispatch<React.SetStateAction<boolean>>;
    setShowWin: React.Dispatch<React.SetStateAction<boolean>>;
    setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

function Score(props: Props) {
    const { setHealthPoints, setGameEnded, setShowLose, setShowWin, setMoves, setPlayerIndex,
        easyGame, mediumGame, hardGame, resetCounters, resetGame, winner, loser,
        difficulty, scoreStuff, playerIndex, loses, wins, healthPoints, moves, gamesPlayed, showLose, showWin } = props; //define props

    const { remainingMoves, remainingHealth, newSquare } = scoreStuff;

    //triggered each time a player moves, but not on mount
    useEffect(() => {
        //checks to see if game has ended
        const gameOver = isGameOver(remainingMoves, remainingHealth, newSquare);

        if (gameOver.result === 'loser') {
            setPlayerIndex(0);
            resetGame();
            loser();
        } else if (gameOver.result === 'winner') {
            setPlayerIndex(0);
            resetGame();
            winner();
        } else {
            setHealthPoints(remainingHealth);
            setMoves(remainingMoves);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerIndex()]);

    return (
        <>
            {/* displays all the score and game data */}
            <div className='score'>
                <h1>SCORE</h1>
                <h3>Health: {healthPoints}</h3>
                <h3>Moves: {moves}</h3>
                <br></br>
                <h3>Games Played: {gamesPlayed}</h3>
                <h3>Loses: {loses}</h3>
                <h3>Wins: {wins}</h3>
                <br></br>
                {/* call to difficulty component */}
                <Difficulty
                    setPlayerIndex={setPlayerIndex}
                    easyGame={easyGame}
                    mediumGame={mediumGame}
                    hardGame={hardGame}
                    resetCounters={resetCounters}
                    difficulty={difficulty}
                    playerIndex={playerIndex}
                />
            </div>
            {/* call to modals component with passed in information to track result of the game */}
            <Modals
                setShowLose={setShowLose}
                setShowWin={setShowWin}
                setGameEnded={setGameEnded}
                showWin={showWin}
                showLose={showLose}
            />
        </>
    );
};

export default Score;