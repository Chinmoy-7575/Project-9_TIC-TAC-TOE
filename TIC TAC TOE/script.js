let currentPlayer = "X";
let roundWon = false;
let gameActive = true;
const statusPanel = document.getElementById('game-status');

function printCurrentPlayerTurn() {
    return `Turn: Player "${currentPlayer}"`;
}

function printWinningPlayer() {
    return `Game Won By Player "${currentPlayer}"`;
}

statusPanel.innerHTML = printCurrentPlayerTurn();
document.getElementById('game-restart').addEventListener('click', handleRestartClick)

function handleRestartClick() {
    gameActive = true;
    currentPlayer = "X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
    Array.prototype.forEach.call(document.getElementsByClassName('cell'),
        (item) => item.innerHTML = "");
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

let cellButtons = document.getElementsByClassName("cell");
for (cellButtons of cellButtons) {
    cellButtons.addEventListener('click', handleCellClick);
}

function handelPlayerChange() {
    if (gameActive == false)
        return; 
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
}

function handleGameWinnerCheck() {
    for (let i = 0; i < 8; ++i) {
        const winningCondition = winningConditions[i];
        let cell1 = document.getElementById(winningCondition[0].toString()).innerHTML;
        let cell2 = document.getElementById(winningCondition[1].toString()).innerHTML;
        let cell3 = document.getElementById(winningCondition[2].toString()).innerHTML;
        if (cell1 === '' || cell2 === '' || cell3 === '' ){
            continue;
        }
        if (cell1 === cell2 && cell2 === cell3) {
            statusPanel.innerHTML = printWinningPlayer();
            gameActive = false;
            return;
        }
    }
    let roundDraw = Array.prototype.filter.call(document.getElementsByClassName('cell'),
        (item) => item.innerHTML === '').length === 0;
    if (roundDraw) {
        statusPanel.innerHTML = "Game is Draw";
        gameActive = false;
    }    
}

function handleCellClick(event) {
    let clickedCell = event.target;

    if ((clickedCell.innerHTML !== "") || (gameActive == false)) {
        return;
    }

    clickedCell.innerHTML = currentPlayer;
    handleGameWinnerCheck();
    handelPlayerChange();
}

