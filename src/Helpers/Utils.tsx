import { easyHealth, easyMoves, hardHealth, hardMoves, mediumHealth, mediumMoves, squareDefinitions } from './Globals';

//builds the initial game array
export function buildGameArray(width: number): string[][] {
    if (!((width % 2) === 1)) {
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
    } else {
        alert('ERROR: The number of rows/width of the game needs to be an EVEN number.')
        throw new Error('The number of rows/width of the game needs to be an EVEN number.')
    }
};

//converts initial array into 2d
export function makeTwoD(shuffledArray: string[], width: number) {
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
export function findIndex(gameArray: string[][], oldIndex: [number, number], direction: string): [number, number] {
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
    return [newRow, newCol];
}

//forms the trail that the player has traveled in
export function updateGameArray(grid: string[][], oldIndex: number[], newIndex: number[]) {
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

//defines health and moves based off difficulty
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

//function to test inputs after x amount of ms
let timeoutId: any;
export function debounce(ms: number, action: any) {
    return (...args: any) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            action(...args);
        }, ms);
    };
}

//function to test inputs after x amount of ms
let timeoutIdResize: any;
export function debounceResize(ms: number, action: any) {
    return (...args: any) => {
        if (timeoutIdResize) clearTimeout(timeoutIdResize);
        timeoutIdResize = setTimeout(() => {
            action(...args);
        }, ms);
    };
}

//function to check for an empty or null object
export function isEmpty(errors: any) {
    for (var key in errors) {
        if (errors.hasOwnProperty(key) && errors[key] === null) {
            return true
        }
    }
    if (Object.keys(errors).length === 0) {
        return true
    } else {
        return false
    }
}

//function to find errors when a user tries to create an account
export function findFormErrors(form: any, errors: any) {
    let { email, username, password, confirm } = form;
    let strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    let newErrors = { ...errors };
    if (!email || email === "") newErrors.email = "This is a required field.";
    else if (!email.includes("@")) newErrors.email = "Please provide a valid E-mail address.";
    else if (email.length > 80) newErrors.email = "We do not support E-mails this long.";
    if (!username || username === "") newErrors.username = "This is a required field.";
    if (!password || password === "") newErrors.password = "This is a required field.";
    else if (!password.match(strongPassword)) newErrors.password = "Must be at least 8 characters, contain at least one uppercase, one lowercase, one digit, and one special character.";
    if (!confirm || confirm === "") newErrors.confirm = "This is a required field.";
    else if (confirm !== password) newErrors.confirm = "Please ensure your password and password confirmation match"
    return newErrors;
}



