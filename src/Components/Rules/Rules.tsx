import './Rules.css';

export default function Rules() {
    return (
        <div className='rules'>
            <h1>RULES</h1>
            <ul>
                <li>Get from point A (top left) to point B (bottom right)</li>
                <li>Your health points and moves are displayed in the top right</li>
                <li>Blank(grey square): health = 0, moves = -1</li>
                <li>Speeder(pink square): health = -5, moves = 0</li>
                <li>Lava(red square): health = -50, moves = -10</li>
                <li>Mud(orange sqaure): health = -10, moves = -5</li>
            </ul>
        </div>
    );
};