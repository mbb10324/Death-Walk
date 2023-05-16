import { ADD_EASY, ADD_HARD, ADD_MEDIUM, DELETE_TOKEN } from '../../Api/Mutations';
import LifetimeScores from '../LifetimeScores/LifetimeScores';
import ResultModals from '../ResultModals/ResultModals';
import BugReporter from '../BugReportModal/BugReportModal';
import { useGame, useScore } from '../../Helpers/Hooks';
import { useEffect, KeyboardEvent, useState } from 'react';
import Difficulty from '../Difficulty/Difficulty';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { TOKEN } from '../../Api/Quieries';
import laugh from '../../images/laugh.png';
import skull from '../../images/skull.png';
import Score from '../Score/Score';
import Rules from '../Rules/Rules';
import Grid from '../Grid/Grid';
import './Game.css';
import { debounceResize } from '../../Helpers/Utils';

export default function Game() {
    const navigate = useNavigate(); //navigate var
    const game = useGame(); //Reducer to manage game state
    const score = useScore(); //custom hook to handle score states

    const storedID = localStorage.getItem('user_id')
    const storedToken = localStorage.getItem('token')

    const [deleteToken] = useMutation(DELETE_TOKEN)
    const [addEasy] = useMutation(ADD_EASY);
    const [addMedium] = useMutation(ADD_MEDIUM);
    const [addHard] = useMutation(ADD_HARD);
    const [dataReady, setDataReady] = useState(false)
    const [resize, setResize] = useState(false)

    //on mount, sets up the initial game, and checks for user token
    /**********************************************************************************************/
    const { data: tokenData, loading, error } = useQuery(TOKEN, {
        fetchPolicy: 'no-cache',
        variables: { value: storedToken || '' },
        onCompleted: (tokenData) => {
            setDataReady(true)
            if (tokenData.token === null) {
                navigate('/Login')
            }
        }
    });

    useEffect(() => {
        game.startGame();
        window.addEventListener('keydown', keyPress);
        window.addEventListener('resize', handleResizeDebounce);
        return () => { window.removeEventListener('keydown', keyPress); window.removeEventListener('resize', handleResize) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataReady, resize]);

    const handleResizeDebounce = debounceResize(1000, handleResize)
    function handleResize() {
        const difficulty: any = game.difficulty
        game.changeDifficulty(difficulty)
    }

    //called when a user presses the logout button
    /**********************************************************************************************/
    function logout() {
        deleteToken({ variables: { value: storedToken } });
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user')
        localStorage.removeItem('email')
        navigate('/Login');
    }

    //fires every time the game condition changes to check for a winner or loser
    /**********************************************************************************************/
    useEffect(() => {
        if (game.gameCondition === 'winner') {
            score.winner();
            if (game.difficulty === 'easy') {
                addEasy({ variables: { user_id: Number(storedID), games: 1, wins: 1, loses: 0 } })
            } else if (game.difficulty === 'medium') {
                addMedium({ variables: { user_id: Number(storedID), games: 1, wins: 1, loses: 0 } })
            } else if (game.difficulty === 'hard') {
                addHard({ variables: { user_id: Number(storedID), games: 1, wins: 1, loses: 0 } })
            }
        } else if (game.gameCondition === 'loser') {
            score.loser();
            if (game.difficulty === 'easy') {
                addEasy({ variables: { user_id: Number(storedID), games: 1, wins: 0, loses: 1 } })
            } else if (game.difficulty === 'medium') {
                addMedium({ variables: { user_id: Number(storedID), games: 1, wins: 0, loses: 1 } })
            } else if (game.difficulty === 'hard') {
                addHard({ variables: { user_id: Number(storedID), games: 1, wins: 0, loses: 1 } })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.gameCondition]);

    //called after each arrow key is pressed
    /**********************************************************************************************/
    function keyPress(event: KeyboardEvent<HTMLInputElement>) {
        //case to only run on arrow key press
        switch (event.key) {
            case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft':
                event.preventDefault();
                game.pressKey(event.key);
        };
    };

    if (loading) {
        return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
    }

    /**********************************************************************************************/
    return (
        <>
            <h1 className='text-xl font-cp-bold text-center -mt-1 -mb-2'>Death Walk</h1>
            <div className='w-full h-fit flex justify-items-center'>
                {/* contains the title and call to rules component */}
                <div className='w-1/4 h-fit text-center items-center flex flex-col'>
                    <h2 className='text-base font-cp-bold'>Welcome @{localStorage.getItem('user')}</h2>
                    <button className='logoutBtn' onClick={logout}>Logout</button> {/*CUSTOM CSS*/}
                    <img className='w-full h-auto' src={skull} alt='' />
                    <Rules />
                </div>
                {/* calls the component that builds the squares */}
                <Grid gameArray={game.grid} />
                {/* contains the call to score and bug report components; and license/contact info */}
                <div className='w-1/4  h-fit text-center items-center flex flex-col'>
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
                    <ResultModals
                        clickedRestart={() => game.startGame()}
                        setShowWin={score.setShowWin}
                        setShowLose={score.setShowLose}
                        showWin={score.showWin}
                        showLose={score.showLose}
                    />
                    <h3 className='text-xs mb-2 overflow-hidden'>Good Luck!</h3>
                    <img className='rotate-12 rounded-full brightness-50 w-9/12 mb-3' src={laugh} alt='' />
                    <BugReporter />
                    <p className='text-xs mb-2 overflow-hidden'>Copyright (c) 2023 Death Walk</p>
                    <p className='text-xs mb-2 overflow-hidden'>&larr; Escape death on the pink square</p>
                </div>
            </div>
            <LifetimeScores gameCondition={game.gameCondition} />
        </>
    );
};