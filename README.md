# DEATH WALK

## Developed By

MILES BREMAN

## Quick Start

#### `npm i`
#### `npm start`

## Description

- This game was created for the purposes of learning and growing as a developer. I utilized React Typescript (more information below) to develop the logic behind the game to excercise/showcase my development capabilities with these technologies. 

- The game is called death crawl, and it is played on a 50 x 50 grid. Starting from the top left a player will attempt to traverse the grid, and if they make it to the bottom right they win the game. A player is given pre-define health and moves to attempt there journey to the other side of the game board. Throughout the grid; there is equal parts 'blank', 'lava', 'speeder', and 'mud' squares. There is varying reprecussions for landing on each square, and those reprecussions are defined as such: 

    * blank: health = 0 / moves = -1
    * speeder: health = -5 / moves = 0
    * lava: health = -50 / moves = -10
    * mud: health = -10 / moves = -5

## Stucture

- .env - Defines the port that the app will run on locally, the width used for (number of squares)^2, health, and moves 

- src/App.test.tsx - Tests for all functions used within the application (npm test).

- src/App.tsx - Parent component of the project.

- src/App.css - Parent stlyesheet of the project.

- src/Components/Game - Acts as the home/splash component of the project.

- src/Components/Rules - Responsible for displaying and defining the game rules.

- src/Components/Score - Responsible for displaing and deciphering the game score.

- src/Components/Grid - Responsible for building the grid.

- src/Components/Square - Responsible for building the squares.

- src/Components/BugReportModal - Displays the bug reporter

- src/Components/ResultModals - displays the win or lose modals

## License

MIT License

Copyright (c) 2023 Death Walk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Dependencies 

- create-react-app my-app --template typescript
- typescript @types/node @types/react @types/react-dom @types/jest
- react-router-dom
- react-bootstrap
- bootstrap

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
