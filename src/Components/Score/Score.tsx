import './Score.css';
import { useEffect, useState } from 'react';
import { updateScore, useMount, isGameOver } from '../../Helpers/Utils';
import Modals from '../ResultModals/ResultModals'

type Props = {
    gameArray: string[];
    playerIndex: number;
    setPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
    setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
}

function Score(props: Props) {
    const { gameArray, playerIndex, setPlayerIndex, setGameEnded, setWidth } = props; //define props
    const mounted = useMount(); //custom hook to check for initial mount
    const [healthPoints, setHealthPoints] = useState<number>(window.mediumHealth); //state to hold health points
    const [moves, setMoves] = useState<number>(window.mediumMoves); //state to hold moves
    const [gamesPlayed, setGamesPlayed] = useState<number>(0); //state to hold number of game played
    const [loses, setLoses] = useState<number>(0); //state to hold number of loses
    const [wins, setWins] = useState<number>(0); //state to hold number of wins
    const [showLose, setShowLose] = useState<boolean>(false); //bool state for showing loser modal
    const [showWin, setShowWin] = useState<boolean>(false); //bool state for showing winner modal
    const [difficulty, setDifficulty] = useState<string>('medium')

    //triggered each time a player moves, but not on mount
    useEffect(() => {
        if (mounted) {
            //returns new scores and square
            const newScore = updateScore(healthPoints, moves, playerIndex, gameArray);
            //checks to see if game has ended
            const gameOver = isGameOver(newScore.remainingMoves, newScore.remainingHealth, newScore.newSquare)
            if (gameOver.result === 'loser') { resetGame(); setLoses(loses + 1); setShowLose(true) }
            else if (gameOver.result === 'winner') { resetGame(); setWins(wins + 1); setShowWin(true) }
            else { setHealthPoints(newScore.remainingHealth); setMoves(newScore.remainingMoves) }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerIndex]);

    function resetGame() {
        if (difficulty === 'easy') easyGame()
        if (difficulty === 'medium') mediumGame()
        if (difficulty === 'hard') hardGame()
        setGamesPlayed(gamesPlayed + 1);
        setPlayerIndex(0);
        setGameEnded(true);
    }

    function selectDifficulty(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === 'easy') { easyGame(); resetZeros() } 
        else if (event.target.value === 'medium') { mediumGame(); resetZeros() } 
        else if (event.target.value === 'hard') { hardGame(); resetZeros() }
        else { alert("umm this is awkward, lets reset the game"); window.location.reload() }
    }

    function easyGame() {
        setDifficulty('easy')
        setWidth(window.easyWidth)
        setHealthPoints(window.easyHealth)
        setMoves(window.easyMoves)
    }

    function mediumGame() {
        setDifficulty('medium')
        setWidth(window.mediumWidth)
        setHealthPoints(window.mediumHealth)
        setMoves(window.mediumMoves)
    }

    function hardGame() {
        setDifficulty('hard')
        setWidth(window.hardWidth)
        setHealthPoints(window.hardHealth)
        setMoves(window.hardMoves)
    }

    function resetZeros() {
        setGamesPlayed(0)
        setWins(0)
        setLoses(0)
        setPlayerIndex(0)
    }

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
                <h1>DIFFICULTY</h1>
                <select onChange={selectDifficulty} defaultValue={difficulty} disabled={playerIndex !== 0}>
                    <option value={'easy'}>EASY</option>
                    <option value={'medium'}>MEDIUM</option>
                    <option value={'hard'}>HARD</option>
                </select>
                {playerIndex !== 0 ? <p>you can change difficulty after the round ends.</p> : ''}
            </div>
            {/* call to modals component with passed in information to track result of the game */}
            <Modals showLose={showLose} setShowLose={setShowLose} showWin={showWin} setShowWin={setShowWin} setGameEnded={setGameEnded} />
        </>
    );
};

export default Score;