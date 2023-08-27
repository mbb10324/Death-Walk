import "./Score.css";

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
			<div className="relative">
				<h1 className="sm:text-xl text-2xl font-cp-bold">SCORE</h1>
				<h3 className="sm:text-sm text-md">Health: {healthPoints}</h3>
				<h3 className="sm:text-sm text-md">Moves: {moves}</h3>
				<div className="border-t border-zinc-900 rounded-full mb-[3%] mt-[2%]"></div>
				<h3 className="sm:text-sm text-md">Games Played: {gamesPlayed}</h3>
				<h3 className="sm:text-sm text-md">Loses: {loses}</h3>
				<h3 className="sm:text-sm text-md">Wins: {wins}</h3>
			</div>
		</>
	);
}
