import { easyHealth, easyMoves, hardHealth, hardMoves, mediumHealth, mediumMoves, squareDefinitions } from './Globals';

//builds the initial game array
export function buildGameArray(width: number): string[][] {
    const squareTypes = ['blank', 'speeder', 'lava', 'mud']
    const blankArray = Array(width * width / 4).fill('blank');
    const speederArray = Array(width * width / 4).fill('speeder');
    const lavaArray = Array(width * width / 4).fill('lava');
    const mudArray = Array(width * width / 4).fill('mud');
    const combinedArray = blankArray.concat(speederArray, lavaArray, mudArray);
    const shuffledArray = fisherYatesShuffle(combinedArray);
    shuffledArray[0] = 'player';
    shuffledArray[shuffledArray.length - 1] = 'end';
    const twoD = makeTwoD(shuffledArray, width)
    return twoD;
};

//converts initial array into 2d
function makeTwoD(shuffledArray: string[], width: number) {
    const board = [];
    for (let i = 0; i < width; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const squareIndex = i * width + j;
            row.push(shuffledArray[squareIndex]);
        }
        board.push(row);
    }
    return board;
}

//fisher yates algorithm for shuffling an array 
function fisherYatesShuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

//finds the next index the player is moving to
export function findIndex( gameArray: string[][], oldIndex: [number, number], direction: string ): [number, number] {
    const [oldRow, oldCol] = oldIndex;
    let newRow = oldRow;
    let newCol = oldCol;
    if (direction === "ArrowUp" && oldRow > 0) {
        newRow = oldRow - 1;
    } else if (direction === "ArrowDown" && oldRow < gameArray.length - 1) {
        newRow = oldRow + 1;
    } else if (direction === "ArrowLeft" && oldCol > 0) {
        newCol = oldCol - 1;
    } else if (direction === "ArrowRight" && oldCol < gameArray[0].length - 1) {
        newCol = oldCol + 1;
    }
    for (let i = 0; i < gameArray.length; i++) {
        const row = gameArray[i];
        for (let j = 0; j < row.length; j++) {
            return [newRow, newCol];
        }
    }
    return [newRow, newCol];
}

export function updateGameArray( grid: string[][], oldIndex: number[], newIndex: number[]) {
    const updatedGrid = [...grid];
    updatedGrid[oldIndex[0]][oldIndex[1]] = "visited";
    updatedGrid[newIndex[0]][newIndex[1]] = "player";
    return updatedGrid;
}

//updates the game score after key press
export function updateScore(currHealth: number, currMoves: number, newIndex: number[], gameArray: string[][]) {
    const newSquare = gameArray[newIndex[0]][newIndex[1]];
    const thisSquare = squareDefinitions[newSquare];
    const health = currHealth + thisSquare.health;
    const moves = currMoves + thisSquare.moves;
    return { 'remainingHealth': health, 'remainingMoves': moves, 'newSquare': newSquare };
};

//determine if the game has ended 
export function isGameOver(moves: number, health: number, newSquare: string): 'loser' | 'winner' | 'running' {
    if (health <= 0 || moves <= 0) return 'loser';
    else if (newSquare === 'end') return 'winner';
    else return 'running'
};

export function difficulyReset(difficulty: string) {
    if (difficulty === 'easy') {
        return { healthDiff: easyHealth, movesDiff: easyMoves };
    } else if (difficulty === 'medium') {
        return { healthDiff: mediumHealth, movesDiff: mediumMoves };
    } else if (difficulty === 'hard') {
        return { healthDiff: hardHealth, movesDiff: hardMoves };
    } else {
        return { healthDiff: 0, movesDiff: 0 };
    }
}



