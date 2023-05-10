import './Grid.css';
import '../Square/Square.css'
import { useRef, useMemo } from 'react';
import Square from '../Square/Square'

type Props = { gameArray: string[] };

function Grid(props: Props) {
    //get numRows, and squareSize to build grid
    const { gameArray } = props;
    const getGridSizeRef = useRef<HTMLDivElement>(null);
    const numRows = Math.ceil(Math.sqrt(gameArray.length));

    const squareSize = useMemo(() => {
        const getGridSize = getGridSizeRef.current;
        if (getGridSize instanceof HTMLElement) {
            return `${Number(getGridSize.clientWidth) / numRows}px`;
        }
        return '';
    }, [getGridSizeRef, numRows]);

    //prevent react from re rendering entire grid with useMemo
    const memoizedSquares = useMemo(() => {
        return (
            <div
                ref={getGridSizeRef}
                className='grid-container'
                style={{
                    //using css grid repeat function to build squares dynamically
                    gridTemplateColumns: `repeat(${numRows}, ${squareSize})`,
                    gridTemplateRows: `repeat(${numRows}, ${squareSize})`,
                }}
            >
                {/* bool for placeholder if array isnt finished building */}
                {gameArray.length > 0 ? (
                    <>
                        {/* squares built here */}
                        {gameArray.map((square, index) => {
                            return (
                                <Square key={index} id={index.toString()} className={square} />
                            )
                        })}
                    </>
                ) : (
                    <h1 className='gamePlaceholder'>building new game...</h1>
                )}
            </div>
        );
    }, [numRows, squareSize, gameArray]);

    return memoizedSquares;
};

export default Grid;
