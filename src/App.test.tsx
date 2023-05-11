import { buildGameArray, findIndex, updateScore, updateGameArray } from './Helpers/Utils'

test('[buildGameArray] returns array of strings', () => {
    const width = 50
    const result = buildGameArray(width)
    expect(result.length).toEqual(2500)
})

// test('[findIndex] reached the border of the board', () => {
//     const key = 'ArrowUp';
//     let testIndex = 0;
//     const expectedIndex = 0;
//     const width = 50;
//     let newIndex = findIndex(key, testIndex, width);
//     expect(newIndex).toBe(expectedIndex);
// })

// test('[findIndex] arrow up', () => {
//     const key = 'ArrowUp';
//     let testIndex = 50;
//     const expectedIndex = 0;
//     const width = 50;
//     let newIndex = findIndex(key, testIndex, width);
//     expect(newIndex).toBe(expectedIndex);
// });

// test('[findIndex] arrow down', () => {
//     const key = 'ArrowDown';
//     let testIndex = 0;
//     const expectedIndex = 50;
//     const width = 50;
//     let newIndex = findIndex(key, testIndex, width);
//     expect(newIndex).toBe(expectedIndex);
// });

// test('[findIndex] arrow left', () => {
//     const key = 'ArrowLeft';
//     let testIndex = 2;
//     const expectedIndex = 1;
//     const width = 50;
//     let newIndex = findIndex(key, testIndex, width);
//     expect(newIndex).toBe(expectedIndex);
// });

// test('[findIndex] arrow right', () => {
//     const key = 'ArrowRight';
//     let testIndex = 1;
//     const expectedIndex = 2;
//     const width = 50;
//     let newIndex = findIndex(key, testIndex, width);
//     expect(newIndex).toBe(expectedIndex);
// });

// test('[updateScore] update the score correctly when lava', () => {
//     const currHealth = 200
//     const currMoves = 100
//     const playerIndex = 1
//     const gameArray = ['blank', 'lava', 'blank']
//     const { remainingHealth, remainingMoves } = updateScore(currHealth, currMoves, playerIndex, gameArray);
//     expect(remainingHealth).toBe(150);
//     expect(remainingMoves).toBe(90);
// })

// test('[updateGameArray] updates the game array correctly', () => {
//     const gameArray = ['player', 'blank', 'blank', 'lava'];
//     const playerIndex = 1;
//     const result = updateGameArray(gameArray, playerIndex);
//     expect(result).toEqual(['visited', 'player', 'blank', 'lava']);
// });




