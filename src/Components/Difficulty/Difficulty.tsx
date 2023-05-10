import './Difficulty.css';

type Props = {
    difficulty: string;
    playerIndex: () => number;
    easyGame: () => void;
    mediumGame: () => void;
    hardGame: () => void;
    resetCounters: () => void;
    setPlayerIndex: (num: number) => number;
}

function Difficuly(props: Props) {
    const { difficulty, playerIndex, easyGame, mediumGame, hardGame, resetCounters, setPlayerIndex } = props;

    //called after select field changed
    function selectDifficulty(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === 'easy') {
            easyGame();
            resetCounters();
            setPlayerIndex(0);
        } else if (event.target.value === 'medium') {
            mediumGame();
            resetCounters();
            setPlayerIndex(0);
        } else if (event.target.value === 'hard') {
            hardGame();
            resetCounters();
            setPlayerIndex(0);
        } else {
            alert("ummm this is awkward, lets reset the game"); window.location.reload();
        }
    };

    return (
        <>
            <h1>DIFFICULTY</h1>
            <select onChange={selectDifficulty} defaultValue={difficulty} disabled={playerIndex() !== 0}>
                <option value={'easy'}>EASY</option>
                <option value={'medium'}>MEDIUM</option>
                <option value={'hard'}>HARD</option>
            </select>
            {/* make player wait till game ends to change difficulty */}
            {playerIndex() !== 0 ? <p>you can change difficulty after the round ends.</p> : ''}
        </>
    )
}

export default Difficuly;