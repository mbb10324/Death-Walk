import { mediumHealth, mediumMoves } from './Helpers/Globals'
import { buildGameArray, findIndex, makeTwoD, updateScore, updateGameArray, isGameOver, difficulyReset } from './Helpers/Utils'

test('[buildGameArray] returns a 2d array of the correct size', () => {
    const width = 50
    const result = buildGameArray(width)
    expect(result.length && result[0].length).toEqual(50)
})

test('[maketwoD] given array returns 2d array', () => {
    const shuffledArray = ['player', 'blank', 'speeder', 'mud']
    const width = 2
    const twoDarray = makeTwoD(shuffledArray, width)
    const result = [['player', 'blank', ],['speeder', 'mud']];
    expect(twoDarray).toEqual(result)
})

test('[findIndex] pressed arrow down', () => {
    const gameArray = [['player', 'blank' ],['speeder', 'mud']];
    let testIndex: [number, number] = [0, 0]
    const direction = 'ArrowDown';
    const expectedIndex = [ 1, 0 ];
    let newIndex = findIndex(gameArray, testIndex, direction);
    expect(newIndex).toEqual(expectedIndex);
})

test('[findIndex] edge of game board', () => {
    const gameArray = [['player', 'blank' ],['speeder', 'mud']];
    let testIndex: [number, number] = [0, 0]
    const direction = 'ArrowLeft';
    const expectedIndex = [ 0, 0 ];
    let newIndex = findIndex(gameArray, testIndex, direction);
    expect(newIndex).toEqual(expectedIndex);
})

test('[updateGameArray] moves player in game array', () => {
    const grid = [['player', 'blank' ],['speeder', 'mud']];
    const oldIndex = [0, 0]
    const newIndex = [0, 1]
    const updateArray = updateGameArray(grid, oldIndex, newIndex)
    const result = [['visited', 'player', ],['speeder', 'mud']]
    expect(updateArray).toEqual(result)
})

test('[updateScore] update score parameters', () => {
    const currHealth = 50
    const currMoves = 10
    const newIndex = [0, 1]
    const gameArray = [['player', 'lava' ],['speeder', 'mud']];
    const newScoreParams = updateScore(currHealth, currMoves, newIndex, gameArray)
    const result = { 'remainingHealth': 0, 'remainingMoves': 0, 'newSquare': 'lava' };
    expect(newScoreParams).toEqual(result)
})

test('[isGameOver] test if loser', () => {
    const moves = 50
    const health = -5
    const newSquare = 'lava'
    const playerLost = isGameOver(moves, health, newSquare)
    const result = 'loser'
    expect(playerLost).toEqual(result)
})

test('[isGameOver] test if winner', () => {
    const moves = 50
    const health = 5
    const newSquare = 'end'
    const playerLost = isGameOver(moves, health, newSquare)
    const result = 'winner'
    expect(playerLost).toEqual(result)
})

test('[difficulyReset] change difficulty', () => {
    const difficulty = 'medium'
    const difficultyChange = difficulyReset(difficulty)
    const result = { healthDiff: mediumHealth, movesDiff: mediumMoves };
    expect(difficultyChange).toEqual(result)
})





