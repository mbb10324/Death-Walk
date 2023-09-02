import "./Rules.css";

export default function Rules() {
	return (
		<div className="sm:w-full sm:mt-8 sm:mr-0 mr-5 w-[40vw]">
			<h1 className="text-xl font-cp-bold">RULES</h1>
			<div className="break-words ml-0 sm:ml-3">
				<p className="sm:text-xs text-sm text-left pr-2 mb-1">
					Use the arrow keys or swipe in the direction you would like to move to Get from point A (top left)
					to point B (bottom right).
				</p>
				<div className="sm:text-xs text-sm flex flex-row items-center justify-left mb-1">
					<div className="blankSquare">{/*CUSTOM CSS*/}</div>
					<p>Blank: health = 0, moves = -1</p>
				</div>
				<div className="sm:text-xs text-sm flex flex-row items-center justify-left mb-1">
					<div className="pinkSquare">{/*CUSTOM CSS*/}</div>
					<p>Speeder: health = -5, moves = 0</p>
				</div>
				<div className="sm:text-xs text-sm flex flex-row items-center justify-left mb-1">
					<div className="orangeSquare">{/*CUSTOM CSS*/}</div>
					<p>Mud: health = -10, moves = -5</p>
				</div>
				<div className="sm:text-xs text-sm flex flex-row items-center justify-left mb-1">
					<div className="redSquare">{/*CUSTOM CSS*/}</div>
					<p>Lava: health = -50, moves = -10</p>
				</div>
			</div>
		</div>
	);
}
