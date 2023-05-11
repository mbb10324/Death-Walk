import './Difficulty.css';
import { DifficultyTypes } from '../../Helpers/Hooks';

type Props = {
    playerIndex: number[];
    changeDifficulty: (difficulty: DifficultyTypes) => void;
    resetCounters: () => void;
}

export default function Difficulty(props: Props) {
    const { playerIndex, changeDifficulty, resetCounters } = props; //define props

    //called after select field changed
    function selectDifficulty(event: React.ChangeEvent<HTMLSelectElement>) {
        changeDifficulty(event.target.value as DifficultyTypes);
        resetCounters();
    };

    return (
        <>
            <h1>DIFFICULTY</h1>
            {/* map over Difficulty type to ensure no type mismatches */}
            <select onChange={selectDifficulty} defaultValue='medium' disabled={playerIndex[0] !== 0}>
                {Object.entries(DifficultyTypes).map(([key, value]) => (
                    <option key={key} value={value}>{key.toUpperCase()}</option>
                ))}
            </select>
            {/* make player wait till game ends to change difficulty */}
            {playerIndex[0] !== 0 ? <p>you can change difficulty after the round ends.</p> : ''}
        </>
    );
};
