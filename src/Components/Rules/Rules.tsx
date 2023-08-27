import "./Rules.css";

export default function Rules() {
	return (
		<div className="sm:w-full sm:mt-16 sm:mr-0 mr-5">
			<h1 className="text-xl font-cp-bold">RULES</h1>
			<ul className="break-words ml-3">
				<li className="sm:text-xs text-sm">Get from point A (top left)</li>
				<li className="sm:text-xs text-sm">to point B (bottom right)</li>
				<li className="sm:text-xs text-sm flex flex-row items-center justify-left m-2">
					<div className="blankSquare">{/*CUSTOM CSS*/}</div>Blank: health = 0, moves = -1
				</li>
				<li className="sm:text-xs text-sm flex flex-row items-center justify-left m-2">
					<div className="pinkSquare">{/*CUSTOM CSS*/}</div>Speeder: health = -5, moves = 0
				</li>
				<li className="sm:text-xs text-sm flex flex-row items-center justify-left m-2">
					<div className="orangeSquare">{/*CUSTOM CSS*/}</div>Mud: health = -10, moves = -5
				</li>
				<li className="sm:text-xs text-sm flex flex-row items-center justify-left m-2">
					<div className="redSquare">{/*CUSTOM CSS*/}</div>Lava: health = -50, moves = -10
				</li>
			</ul>
		</div>
	);
}
