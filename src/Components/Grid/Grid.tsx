import './Grid.css';
import { useRef, useMemo, useCallback } from 'react';
import Square from '../Square/Square';

type Props = { gameArray: string[] };

function Squares(props: Props) {
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

    const renderSquare = useCallback((index: number, square: string) => (
        <Square key={index} id={index.toString()} className={square} />
    ), []);

    const squares = (
        <div
            ref={getGridSizeRef}
            className='grid-container'
            style={{
                gridTemplateColumns: `repeat(${numRows}, ${squareSize})`,
                gridTemplateRows: `repeat(${numRows}, ${squareSize})`,
            }}
        >
            {gameArray.length > 0 ? (
                <>{gameArray.map((square, index) => renderSquare(index, square))}</>
            ) : (
                <h1 className='gamePlaceholder'>building new game...</h1>
            )}
        </div>
    );

    return squares;
};

export default Squares;
