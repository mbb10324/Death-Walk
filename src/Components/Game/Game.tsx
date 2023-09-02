import ResultModals from "../ResultModals/ResultModals";
import { useGame, useScore } from "../../Helpers/Hooks";
import { debounceResize } from "../../Helpers/Utils";
import { useEffect, KeyboardEvent } from "react";
import Difficulty from "../Difficulty/Difficulty";
import laugh from "../../images/laugh.png";
import skull from "../../images/skull.png";
import Score from "../Score/Score";
import Rules from "../Rules/Rules";
import Grid from "../Grid/Grid";
import "./Game.css";

export default function Game() {
	const game = useGame(); //Reducer to manage game state
	const score = useScore(); //custom hook to handle score states

	useEffect(() => {
		game.startGame();
		window.addEventListener("keydown", keyPress);
		return () => {
			window.removeEventListener("keydown", keyPress);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleResizeDebounce = debounceResize(1000, handleResize);
		function handleResize() {
			game.changeDifficulty(game.difficulty);
		}
		window.addEventListener("resize", handleResizeDebounce);
		return () => window.removeEventListener("resize", handleResizeDebounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.difficulty, game.changeDifficulty]);

	//fires every time the game condition changes to check for a winner or loser
	/**********************************************************************************************/
	useEffect(() => {
		if (game.gameCondition === "winner") {
			score.winner();
		} else if (game.gameCondition === "loser") {
			score.loser();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game.gameCondition]);

	//called after each arrow key is pressed
	/**********************************************************************************************/
	function keyPress(event: KeyboardEvent<HTMLInputElement>) {
		//case to only run on arrow key press
		switch (event.key) {
			case "ArrowUp":
			case "ArrowDown":
			case "ArrowRight":
			case "ArrowLeft":
				event.preventDefault();
				game.pressKey(event.key);
		}
	}

	let startX = 0; // Declare startX
	let startY = 0; // Declare startY

	// Function to handle the start of a touch
	function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
		event.preventDefault();
		const appElement = document.querySelector(".App");
		appElement?.classList.add("no-scroll");
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
	}

	// Function to handle the end of a touch
	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const appElement = document.querySelector(".App");
		appElement?.classList.remove("no-scroll");
		const diffX = event.changedTouches[0].clientX - startX; // Changed order here
		const diffY = event.changedTouches[0].clientY - startY; // Changed order here

		if (Math.abs(diffX) > Math.abs(diffY)) {
			if (diffX > 0) {
				game.pressKey("ArrowRight");
			} else {
				game.pressKey("ArrowLeft");
			}
		} else {
			if (diffY > 0) {
				game.pressKey("ArrowDown");
			} else {
				game.pressKey("ArrowUp");
			}
		}
	};

	/**********************************************************************************************/
	return (
		<>
			<h1 className="sm:text-xl text-2xl font-cp-bold text-center">Death Walk</h1>
			<div className="w-full h-fit flex justify-items-center sm:flex-row flex-col">
				{/* contains the title and call to rules component */}
				<div className="sm:w-1/4 w-full h-fit text-center items-center justify-center flex sm:flex-col sm:!order-1 !order-2 sm:mt-0 mt-10 scale-150 sm:scale-100">
					<img className="w-[30vw] h-auto" src={skull} alt="" />
					<Rules />
				</div>
				{/* calls the component that builds the squares */}
				<Grid gameArray={game.grid} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} />
				{/* contains the call to score and bug report components; and license/contact info */}
				<div className="sm:w-1/4 w-full sm:mt-0 mt-16 h-fit text-center items-center flex flex-col order-3">
					<Score
						healthPoints={game.health}
						moves={game.moves}
						wins={score.wins}
						loses={score.loses}
						gamesPlayed={score.gamesPlayed}
					/>
					<Difficulty
						gameInProgress={game.gameCondition === "running"}
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
					<h3 className="sm:text-xs text-xl mb-2 overflow-hidden mt-16">Good Luck!</h3>
					<img className="rotate-12 rounded-full brightness-50 w-9/12 mb-3" src={laugh} alt="" />
					<p className="sm:text-xs text-base mb-2 overflow-hidden">Copyright (c) 2023 Death Walk</p>
					<p className="sm:text-xs text-base mb-2 overflow-hidden">&larr; Escape death on the pink square</p>
				</div>
			</div>
		</>
	);
}
