import './Grid.css';
import React, { useRef, useMemo } from 'react';
import Square from '../Square/Square'

type Props = { gameArray: string[][] };

export default function Grid(props: Props) {
    //get numRows, and squareSize to build grid
    const { gameArray } = props;
    const getGridSizeRef = useRef<HTMLDivElement>(null);

    const numRows = gameArray[0].length

    function getSquareSize() {
        const getGridSize = getGridSizeRef.current;
        if (getGridSize instanceof HTMLElement) {
            return `${Number(getGridSize.clientWidth) / numRows}px`;
        }
        return '';
    };

    const squareSize = getSquareSize()

    //prevent react from re rendering entire grid with useMemo
    const memoizeSquares = useMemo(() => {
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
                <>
                    {/* map game array and call squares component */}
                    {gameArray.map((square, index) => {
                        return (
                            <React.Fragment key={`outer-${index}`}>
                                {square.map((x, i) => {
                                    const key = `${index}-${i}`;
                                    return (
                                        <Square key={key} className={x} />
                                    )
                                })}
                            </React.Fragment>
                        )
                    })}
                </>
            </div>
        );
    }, [gameArray, numRows, squareSize])
    return memoizeSquares;
};
