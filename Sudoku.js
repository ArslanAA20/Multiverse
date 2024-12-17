// script.js

let sudokuBoard;
let solutionBoard;
let currentDifficulty;

// Sudoku-Startbrett für einfache, mittlere und schwierige Schwierigkeitsgrade
const puzzles = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  medium: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  hard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};

// Funktion zum Starten des Spiels
function startGame() {
  currentDifficulty = document.getElementById('difficulty').value;
  sudokuBoard = JSON.parse(JSON.stringify(puzzles[currentDifficulty]));
  solutionBoard = generateSolution(sudokuBoard);

  displayBoard(sudokuBoard);
}

// Lösung des Sudokus generieren (einfache Platzhalterlogik)
function generateSolution(board) {
  // Hier könnte eine echte Sudoku-Generator-Logik integriert werden
  return JSON.parse(JSON.stringify(board));
}

// Das Sudoku-Board im HTML anzeigen
function displayBoard(board) {
  const boardElement = document.getElementById('sudoku-board');
  boardElement.innerHTML = '';
  
  boardElement.style.gridTemplateColumns = 'repeat(9, 40px)';
  boardElement.style.gridTemplateRows = 'repeat(9, 40px)';
  
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      input.value = value !== 0 ? value : '';
      input.disabled = value !== 0;
      input.addEventListener('input', (event) => handleInput(event, rowIndex, colIndex));
      boardElement.appendChild(input);
    });
  });
}

// Eingabe in eine Zelle behandeln
function handleInput(event, row, col) {
  sudokuBoard[row][col] = parseInt(event.target.value) || 0;
}

// Lösung überprüfen
function checkSolution() {
  const isValid = validateSolution();
  const statusElement = document.getElementById('status');
  
  if (isValid) {
    statusElement.textContent = 'Glückwunsch, Sie haben das Sudoku korrekt gelöst!';
    statusElement.style.color = 'green';
  } else {
    statusElement.textContent = 'Das Sudoku ist noch nicht korrekt. Versuchen Sie es erneut!';
    statusElement.style.color = 'red';
  }
}

// Sudoku-Lösung validieren
function validateSolution() {
  // Überprüfen Sie alle Zeilen, Spalten und Subgitter
  return checkRows() && checkCols() && checkSubgrids();
}

// Validierung der Zeilen
function checkRows() {
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const num = sudokuBoard[row][col];
      if (num === 0 || seen.has(num)) return false;
      seen.add(num);
    }
  }
  return true;
}

// Validierung der Spalten
function checkCols() {
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const num = sudokuBoard[row][col];
      if (num === 0 || seen.has(num)) return false;
      seen.add(num);
    }
  }
  return true;
}

// Validierung der 3x3 Subgitter
function checkSubgrids() {
  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = sudokuBoard[row + i][col + j];
          if (num === 0 || seen.has(num)) return false;
          seen.add(num);
        }
      }
    }
  }
  return true;
}

// Spiel zurücksetzen
function resetGame() {
  startGame();
  document.getElementById('status').textContent = '';
}
