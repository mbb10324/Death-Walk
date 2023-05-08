import './Squares.css';
import { useRef, useEffect, useState } from 'react';

type Props = { gameArray: string[] };

function Squares(props: Props) {
    const { gameArray } = props;
    const getGridSizeRef = useRef<HTMLDivElement>(null);
    const numRows = Math.ceil(Math.sqrt(gameArray.length));
    const [squareSize, setSquareSize] = useState<string>('');

    useEffect(() => {
        const getGridSize = getGridSizeRef.current;
        if (getGridSize instanceof HTMLElement) {
            const squareSize = `${Number(getGridSize.clientWidth) / numRows}px`;
            setSquareSize(squareSize);
        }
    }, [getGridSizeRef, numRows]);

    return (
        <div
            ref={getGridSizeRef}
            className='grid-container'
            style={{
                gridTemplateColumns: `repeat(${numRows}, ${squareSize})`,
                gridTemplateRows: `repeat(${numRows}, ${squareSize})`,
            }}
        >
            {gameArray.map((square, index) => {
                return <div key={index} id={index.toString()} className={square} />;
            })}
        </div>
    );
}

export default Squares;

// import './Squares.css';
// import { buildSquares } from '../../Helpers/Utils';

// type Props = { gameArray: string[] };

// function Squares({ gameArray }: Props) {
//     //create our squares and grid properties
//     let squares = buildSquares(gameArray);

//     return (
//         <div className='grid-container' style={{
//             //dynamically set the square sizes
//             gridTemplateColumns: `repeat(${squares.numRows}, ${squares.squareSize})`,
//             gridTemplateRows: `repeat(${squares.numRows}, ${squares.squareSize})`
//         }}>
//             {/* this is where our squares are actually placed */}
//             {squares.squaresArray}
//         </div>
//     );
// };

// export default Squares;