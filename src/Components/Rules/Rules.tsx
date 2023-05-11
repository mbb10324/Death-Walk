import './Rules.css';

export default function Rules() {
    return (
        <div className='rules'>
            <h1>RULES</h1>
            <ul>
                <li>Get from point A (top left)</li> <li>to point B (bottom right)</li>
                <li><div className='blankSquare'></div>Blank: health = 0, moves = -1</li>
                <li><div className='pinkSquare'></div>Speeder: health = -5, moves = 0</li>
                <li><div className='orangeSquare'></div>Mud: health = -10, moves = -5</li>
                <li><div className='redSquare'></div>Lava: health = -50, moves = -10</li>
            </ul>
        </div>
    );
};