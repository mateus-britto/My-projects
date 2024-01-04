//Variables
const squares = document.querySelectorAll(".square");
const winner = document.querySelector(".winning-message");
const message = document.querySelector(".message");
const restart = document.querySelector(".restart");
const playerScore = document.querySelector(".player-score");
const cpuScore = document.querySelector(".cpu-score");
const resetScoreBtn = document.querySelector(".score-reset");

let currentPlayer = "X";
let pScore = 0;
let cScore = 0;

// Game start function
function startGame() {
  squares.forEach((square) => {
    square.addEventListener(
      "click",
      () => {
        if (square.textContent === "") {
          square.textContent = currentPlayer;
          if (checkWinner(currentPlayer)) {
            message.textContent = `${currentPlayer} Wins!`;
            if (currentPlayer === "X") {
              pScore++;
              playerScore.textContent = pScore;
            } else {
              cScore++;
              cpuScore.textContent = cScore;
            }
            winner.classList.add("show");
          } else if (checkDraw()) {
            message.textContent = "Draw!";
            winner.classList.add("show");
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
          }
        }
      },
      { once: true } // Triggers the event only once.
    );
  });
  winner.classList.remove("show");
}
startGame();

// Check for draw
function checkDraw() {
  return [...squares].every((square) => {
    return square.textContent === "X" || square.textContent === "O";
  });
}

// Check for winner using an array of winning combinations
function checkWinner(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((combination) => {
    return combination.every((index) => {
      return squares[index].textContent === player;
    });
  });
}

// Board reset
function resetBoard() {
  squares.forEach((square) => {
    square.textContent = "";
  });
  currentPlayer = "X";
}

// Restart button event listener
restart.addEventListener("click", () => {
  startGame();
  resetBoard();
});

// Reset score event listener
resetScoreBtn.addEventListener("click", () => {
  pScore = 0;
  cScore = 0;
  playerScore.textContent = pScore;
  cpuScore.textContent = cScore;
});
