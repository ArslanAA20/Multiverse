const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-btn');

let currentPlayer = 'X';  // X starts
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', '']; // Board state

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle click on cells
function handleCellClick(e) {
  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute('data-cell');

  if (board[cellIndex] !== '' || !gameActive) return;

  // Mark the cell with the current player's symbol
  board[cellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer);
  clickedCell.textContent = currentPlayer;

  // Check if the game is won
  if (checkWin()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check for a draw
  if (!board.includes('')) {
    statusDisplay.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Set the initial status
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
