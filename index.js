/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let MoveX = null;
let MoveY = null;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] === 0) {
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        checkGame(1) ? declareWinner(1) : (checkGame(2) ? declareWinner(2) : playMove())
    }
}

function playMove() {
    let tempGrid = [];
    let stepToWin = null;
    let stepToLoose = null;
    let winningX, winningY;
    for(let x=0; x<GRID_LENGTH; x++) {
        tempGrid[x] = [...grid[x]]
    }
    stepToWin = checkMinStepsToWin(tempGrid, 2, 0);
    if(stepToWin === 1) {
        grid[MoveX][MoveY] = 2;

    } else {
        winningX = MoveX;
        winningY = MoveY;
        stepToLoose = checkMinStepsToWin(tempGrid, 1, 0);
        if(stepToLoose === 1) {
            grid[MoveX][MoveY] = 2;
        } else if(stepToLoose < stepToWin) {
            grid[MoveX][MoveY] = 2;
        } else {
            grid[winningX][winningY] = 2;
        }

    }
    renderMainGrid();
    addClickHandlers();
    if(stepToWin === 1) {
        declareWinner(2);
    }
}

function checkMinStepsToWin(testGrid, player, steps) {
    let tempGrid = []
    let minSteps = GRID_LENGTH*GRID_LENGTH;;
    let tempMinSteps = null;
    for(let x=0; x<GRID_LENGTH; x++) {
        tempGrid[x] = [...testGrid[x]]
    }
    if(checkGame(player,tempGrid)) {
        return 0
    }
    for(let x=0; x<3; x++) {
        for(let y=0; y<3; y++) {
            if(tempGrid[x][y] === 0) {
                tempGrid[x][y] = player;
                tempMinSteps = checkMinStepsToWin(tempGrid, player, steps);
                if(tempMinSteps < minSteps) {
                    minSteps = tempMinSteps;
                    MoveX = x;
                    MoveY = y;
                }
                tempGrid[x][y] = 0;
            }
            if(minSteps === 0) {
                break;
            }
        }
        if(minSteps === 0) {
            break;
        }
    }
    return steps + minSteps + 1
}


function declareWinner(player) {
    if(player === 1) {
        alert('Congratulations you won!!');
    } else {
        alert('You lost!');
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkGame(player, gridToCheck = grid) {
    let won = false;
    for(let x=0; x<GRID_LENGTH; x++) {  // check horizontal
        if(won) {
            break;
        }
        won = true
        for(let y=0; y<GRID_LENGTH; y++) {
            if( gridToCheck[x][y] !== player ) {
                won = false
                break;
            }
        }
    }
    if(won) {
        return true;
    }
    for(let x=0; x<GRID_LENGTH; x++) { // check vertical
        if(won) {
            break;
        }
        won = true
        for(let y=0; y<GRID_LENGTH; y++) {
            if( gridToCheck[y][x] !== player ) {
                won = false
                break;
            }
        }
    }
    if(won) {
        return true;
    }
    won = true
    for(let x=0; x<GRID_LENGTH; x++) { // check diagonal 1 top left to bottom right
        if( gridToCheck[x][x] !== player ) {
            won = false
            break;
        }
    }
    if(won) {
        return true;
    }
    won = true
    for(let x=0; x<GRID_LENGTH; x++) { // check diagonal 2 top right to bottom left
        if( gridToCheck[x][GRID_LENGTH-x-1] !== player ) {
            won = false
            break;
        }
    }
    return won;
}

initializeGrid();
renderMainGrid();
addClickHandlers();
