import './Squares.css';

type Props = { gameArray: string[] };

function Squares(props: Props) {

    //create grid properties
    const { gameArray } = props
    const numRows = Math.ceil(Math.sqrt(gameArray.length));
    const squareSize = `${900 / numRows}px`;

    return (
        <div className='grid-container' style={{
            //dynamically set the square sizes
            gridTemplateColumns: `repeat(${numRows}, ${squareSize})`,
            gridTemplateRows: `repeat(${numRows}, ${squareSize})`
        }}>
            {/* this is where our squares are actually placed */}
            {gameArray.map((square, index) => {
                return (
                    <div id={(index).toString()} className={square}></div>
                )
            })}
        </div>
    );
};

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