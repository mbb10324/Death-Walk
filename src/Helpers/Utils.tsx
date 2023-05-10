import { squareDefinitions } from './Globals';

//builds the initial game array
export function buildGameArray(width: number) {
    const blankArray = Array(width * width / 4).fill('blank');
    const speederArray = Array(width * width / 4).fill('speeder');
    const lavaArray = Array(width * width / 4).fill('lava');
    const mudArray = Array(width * width / 4).fill('mud');
    const combinedArray = blankArray.concat(speederArray, lavaArray, mudArray);
    const shuffledArray = fisherYatesShuffle(combinedArray);
    shuffledArray[0] = 'player';
    shuffledArray[shuffledArray.length - 1] = 'end';
    return shuffledArray;
};

//fisher yates algorithm for shuffling an array 
function fisherYatesShuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

//handles determining next square and returning that index
export function findIndex(key: string, oldIndex: number, width: number) {
    if (key === 'ArrowUp' && oldIndex >= width) {
        oldIndex -= width
    } else if (key === 'ArrowDown' && oldIndex < width * (width - 1)) {
        oldIndex += width
    } else if (key === 'ArrowLeft' && oldIndex % width !== 0) {
        oldIndex -= 1
    } else if (key === 'ArrowRight' && (oldIndex + 1) % width !== 0) {
        oldIndex += 1
    };
    return oldIndex;
};

//updates the game score after key press
export function updateScore(currHealth: number, currMoves: number, newIndex: number, gameArray: string[]) {
    const newSquare = gameArray[newIndex];
    const thisSquare = squareDefinitions[newSquare];
    const health = currHealth + thisSquare.health;
    const moves = currMoves + thisSquare.moves;
    return { 'remainingHealth': health, 'remainingMoves': moves, 'newSquare': newSquare };
};

//updates the game array after key press
export function updateGameArray(gameArray: string[], newIndex: number) {
    const oldIndex = gameArray.indexOf('player');
    const tempArray = [...gameArray];
    tempArray[oldIndex] = 'visited';
    tempArray[newIndex] = 'player';
    return tempArray;
};

//determine if the game has ended 
export function isGameOver(moves: number, health: number, newSquare: string) {
    if (health <= 0 || moves <= 0) return { 'result': 'loser' };
    else if (newSquare === 'end') return { 'result': 'winner' };
    else return { 'result': 'none' };
};



