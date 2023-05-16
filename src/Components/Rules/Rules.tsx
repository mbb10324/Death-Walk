import './Rules.css';

export default function Rules() {
    return (
        <div className='w-full'>
            <h1 className='text-xl font-cp-bold'>RULES</h1>
            <ul className='break-words ml-3'>
                <li className='text-xs'>Get from point A (top left)</li> 
                <li className='text-xs'>to point B (bottom right)</li>
                <li className='text-xs flex flex-row'><div className='blankSquare' >{/*CUSTOM CSS*/}</div>Blank: health = 0, moves = -1</li>
                <li className='text-xs flex flex-row'><div className='pinkSquare'>{/*CUSTOM CSS*/}</div>Speeder: health = -5, moves = 0</li>
                <li className='text-xs flex flex-row'><div className='orangeSquare'>{/*CUSTOM CSS*/}</div>Mud: health = -10, moves = -5</li>
                <li className='text-xs flex flex-row'><div className='redSquare'>{/*CUSTOM CSS*/}</div>Lava: health = -50, moves = -10</li>
            </ul>
        </div>
    );
};