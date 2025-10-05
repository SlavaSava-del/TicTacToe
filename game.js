const cells = document.querySelectorAll('.cell')
const statusText = document.getElementById('status')
const restartBtn = document.getElementById('restart')

let currentPlayer = 'X'
let board = Array(9).fill('')
let isGameActive = true

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function handleCellClick(e) {
    const cell = e.target
    const index = cell.getAttribute('data-cell-index')

    if (board[index] !== '' || !isGameActive) return
    
    board[index] = currentPlayer
    cell.textContent = currentPlayer
    cell.classList.add('taken')

    checkWinner()
}

function checkWinner() {
    let roundWon = false

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true
            winnindCells = [a, b, c]
            break
        }
    }

    if (roundWon) {
        statusText.textContent = `Победитель: ${currentPlayer}!`
        isGameActive = false

        winnindCells.forEach((index) => {
            cells[index].classList.add('win')
        })

        return
    }

    if (!board.includes('')) {
        statusText.textContent = 'Ничья!'
        isGameActive = false
        return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusText.textContent = `Ход: ${currentPlayer}`
}

function restartGame() {
    board = Array(9).fill('')
    isGameActive = true
    currentPlayer = 'X'
    statusText.textContent = `Ход: ${currentPlayer}`
    cells.forEach((cell) => {
        cell.textContent = ''
        cell.classList.remove('taken', 'win')
    })
}

cells.forEach((cell) => cell.addEventListener('click', handleCellClick))
restartBtn.addEventListener('click', restartGame)