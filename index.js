const turn = document.querySelector('#turn');
const gameResult = document.querySelector('#game-result');
const restartBtn = document.querySelector('#game-restart');
let playerX = 'X';
let playerO = 'O';
let playerTurn = true;
const arrayCells = [null,null,null,null,null,null,null,null,null];
/**
 * arrayCells[0],arrayCells[1],arrayCells[2]
 * arrayCells[3],arrayCells[4],arrayCells[5]
 * arrayCells[6],arrayCells[7],arrayCells[8]
 */

let cells = document.querySelectorAll('.game-cell');

function initGame(){
    cells.forEach(cell => {
        cell.addEventListener('click', selectField);
    })
}

function selectField(event){
    if(event.target.innerText !== '')
        return;

    let currentPlayer = switchPlayer();
    event.target.innerText = currentPlayer;
    let dataCellIndex = event.target.dataset.cell;
    arrayCells[dataCellIndex] = currentPlayer;
    checkForWinner();
    this.style.cursor = 'default';
    this.removeEventListener('click', selectField);
}

function switchPlayer() {
    if(playerTurn) {
        playerTurn = !playerTurn;
        turn.innerText = `Player: ${playerO}`;
        return playerX;
    } else {
        playerTurn = !playerTurn;
        turn.innerText = `Player: ${playerX}`;
        return playerO;
    }
}

function checkForWinner(){
    /**
     * cell1, cell2, cell3
     * cell4, cell5, cell6
     * cell7, cell8, cell9
     * 
     * cell1 cell2 cell3
     * cell4 cell5 cell6
     * cell7 cell8 cell9
     * 
     * cell1 cell4 cell7
     * cell2 cell5 cell8
     * cell3 cell6 cell9
     * 
     * cell1 cell5 cell9
     * cell3 cell5 cell7
     */
    const [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9] = arrayCells;
    const winningConditions = [
        [cell1, cell2, cell3],
        [cell4, cell5, cell6],
        [cell7, cell8, cell9],
        [cell1, cell2, cell3],
        [cell4, cell5, cell6],
        [cell7, cell8, cell9],
        [cell1, cell4, cell7],
        [cell2, cell5, cell8],
        [cell3, cell6, cell9],
        [cell1, cell5, cell9],
        [cell3, cell5, cell7],
    ]

    for(let condition of winningConditions) {
        let isWinner = checkWinningCondition(...condition)
        if(isWinner) {
            cells.forEach(cell => {
                cell.removeEventListener('click', selectField);
            })
            gameResult.innerText = `Winner is ${condition[0]}`;
            break;
        }
    }

    if(arrayCells.filter(cell => !cell).length === 0){
        gameResult.innerText = `The game ends in draw!`;
        return;
    }

}

function checkWinningCondition(cell1, cell2, cell3){
    if(cell1 === cell2 && cell2 === cell3 && cell1)
        return true;

    return false;
}

initGame();

restartBtn.addEventListener('click', function(event) {
    playerTurn = true;
    arrayCells.forEach((cell, index, array) => {
        array[index] = null;
    })
    cells.forEach(cell => {
        cell.innerText = '';
    })
    turn.innerText = `Player: ${playerX}`;
    gameResult.innerText = '';
    initGame();

})