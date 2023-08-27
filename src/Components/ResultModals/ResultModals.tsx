import "./ResultModals.css";
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import fine from "../../images/fine.gif";
import fire from "../../images/fire.gif";
import winner from "../../images/winner.gif";

type Props = {
	showWin: boolean;
	showLose: boolean;
	clickedRestart: React.Dispatch<React.SetStateAction<void>>;
	setShowWin: React.Dispatch<React.SetStateAction<boolean>>;
	setShowLose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ResultModals(props: Props) {
	const { showWin, showLose, setShowWin, setShowLose, clickedRestart } = props; //define props
	const modalShown = showLose || showWin;

	//listener for enter button
	useEffect(() => {
		window.addEventListener("keyup", enterKey);
		return () => {
			window.removeEventListener("keyup", enterKey);
		};
	});

	//close modal on button click
	function closeResultModal() {
		clickedRestart();
		setShowWin(false);
		setShowLose(false);
	}

	//close modal when enter pressed
	function enterKey(event: any) {
		if (event.key === "Enter" && modalShown === true) {
			clickedRestart();
			setShowWin(false);
			setShowLose(false);
		}
	}

	//pick a random gif to show the user
	function randomDeathGif() {
		if (showLose === true) {
			const options = Array(3).fill(fire);
			options.push(fine);
			const chooseOne = options[Math.floor(Math.random() * options.length)];
			return chooseOne;
		}
	}

	return (
		<div className="modals">
			{/* winner or loser modal */}
			<Modal className="custom-position" show={showLose || showWin} backdrop="static" keyboard={false}>
				<Modal.Header>
					<Modal.Title>{showWin ? "Congrats, You Win!!!" : "Sorry, You Died!!!"}</Modal.Title>
				</Modal.Header>
				<div className="restart">
					<button className="modalBtn" onClick={closeResultModal}>
						Restart
					</button>
					<p className="sm:block hidden">or press ENTER</p>
				</div>
				{modalShown ? (
					<img src={showWin ? winner : randomDeathGif()} alt="" />
				) : (
					<div className="imgPlaceholder"></div>
				)}
			</Modal>
		</div>
	);
}
