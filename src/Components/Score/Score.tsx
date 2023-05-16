import './Score.css';

type Props = {
    healthPoints: number;
    moves: number;
    wins: number;
    loses: number;
    gamesPlayed: number;
};

export default function Score(props: Props) {
    const { healthPoints, moves, wins, loses, gamesPlayed } = props; //define props

    return (
        <>
            {/* displays all the score and game data */}
            <div className='relative'>
                <h1 className='text-xl font-cp-bold'>SCORE</h1>
                <h3 className='text-sm'>Health: {healthPoints}</h3>
                <h3 className='text-sm'>Moves: {moves}</h3>
                <div className='border-t border-zinc-900 rounded-full mb-[3%] mt-[2%]'></div>
                <h3 className='text-sm'>Games Played: {gamesPlayed}</h3>
                <h3 className='text-sm'>Loses: {loses}</h3>
                <h3 className='text-sm'>Wins: {wins}</h3>
            </div>
        </>
    );
};