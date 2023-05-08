import { useRef, useEffect } from 'react';
import { squareDefinitions } from './Globals';

//custom hook to check for first render
export function useMount() {
    const isMountRef = useRef(false);
    useEffect(() => {
        isMountRef.current = true;
    }, []);
    return isMountRef.current;
};

//builds the initial game array
export function buildGameArray(width: number) {
    const blankArray = Array(width * width / 4).fill('blank')
    const speederArray = Array(width * width / 4).fill('speeder')
    const lavaArray = Array(width * width / 4).fill('lava')
    const mudArray = Array(width * width / 4).fill('mud')
    const combinedArray = blankArray.concat(speederArray, lavaArray, mudArray)
    const shuffledArray = fisherYatesShuffle(combinedArray)
    shuffledArray[0] = 'player'
    shuffledArray[shuffledArray.length - 1] = 'end'
    return shuffledArray
}

//fisher yates algorithm for shuffling an array 
function fisherYatesShuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// //builds the squares and parameters for grid 
// export function buildSquares(gameArray: string[]) {
//     const numRows = Math.ceil(Math.sqrt(gameArray.length));
//     // 900 value has to match the grid pixel size within the css
//     const squareSize = `${900 / numRows}px`;
//     const squaresArray = [];
//     for (let i = 0; i < gameArray.length; i++) {
//         squaresArray.push(createSquares(i, gameArray[i]));
//     }
//     return { numRows, squareSize, squaresArray }
// }

// //creates a div for each square with corresponding classname
// function createSquares(index: number, value: string): JSX.Element {
//     return (
//         <div key={index} id={index.toString()} className={value}></div>
//     );
// }

//handles determining next square and returning that index
export function findIndex(key: string, newIndex: number, width:number) {
    if (key === 'ArrowUp' && newIndex >= width) {
        newIndex -= width
    } else if (key === 'ArrowDown' && newIndex < width * (width - 1)) {
        newIndex += width
    } else if (key === 'ArrowLeft' && newIndex % width !== 0) {
        newIndex -= 1
    } else if (key === 'ArrowRight' && (newIndex + 1) % width !== 0) {
        newIndex += 1
    }
    return newIndex
}

//updates the game score after key press
export function updateScore(currHealth: number, currMoves: number, playerIndex: number, gameArray: string[]) {
    const newSquare = gameArray[playerIndex]
    const thisSquare = squareDefinitions[newSquare]
    const health = currHealth + thisSquare.health;
    const moves = currMoves + thisSquare.moves;
    return { 'remainingHealth': health, 'remainingMoves': moves, 'newSquare': newSquare };
}


//updates the class names after key press
export function updateClassNames(playerIndex: number) {
    const oldIndex = document.getElementsByClassName('player')[0];
    oldIndex.classList.replace('player', 'visited');
    const newIndex = document.getElementById(playerIndex.toString())!;
    newIndex.className = ''
    newIndex.classList.add('player');
}

//updates the game array after key press
export function updateGameArray(gameArray: string[], playerIndex: number) {
    const oldIndex = gameArray.indexOf('player')
    gameArray[oldIndex] = 'visited'
    gameArray[playerIndex] = 'player'
    return gameArray
}

//determine if the game has ended 
export function isGameOver(moves: number, health: number, newSquare: string) {
    if (health <= 0 || moves <= 0) return { 'result': 'loser' };
    else if (newSquare === 'end') return { 'result': 'winner' };
    else return {}
}



