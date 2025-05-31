const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6]  // Diagonals
];

function startGame() {
  isXTurn = true;
  messageElement.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw) {
  if (draw) {
    messageElement.textContent = "It's a Draw!";
  } else {
    messageElement.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

restartButton.addEventListener('click', startGame);

startGame();
