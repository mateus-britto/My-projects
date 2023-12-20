// Button Variables
let sizeBtn = document.querySelector(".size-btn");
let blackBtn = document.querySelector(".black-btn");
let randomBtn = document.querySelector(".random-btn");
let clearBtn = document.querySelector(".clear-btn");
let resetBtn = document.querySelector(".reset-btn");

// Auxiliary variables
let board = document.querySelector(".board");
let isClicking = false; // Flag to track mouse click state
let currentMode = "black"; // Color scheme

// Clear the board and generate a new board on click
sizeBtn.addEventListener("click", () => {
  resetBoard();
  generateBoard(userInput());
});

// Black event listener
blackBtn.addEventListener("click", () => {
  black();
});

// Random Colors event listener
randomBtn.addEventListener("click", () => {
  randomColor();
});

// Clears the board and allows to resume drawing
clearBtn.addEventListener("click", () => {
  clearBoard();
});
// Resets the baord
resetBtn.addEventListener("click", () => {
  resetBoard();
});

// Generate the board
function generateBoard(size) {
  // Clear existing grid items if any
  board.innerHTML = "";

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let div = document.createElement("div");
    attachTileEventListeners(div);
    div.classList.add("grid-item");
    board.appendChild(div);
  }
}

// Function to attach the event listeners according to the mouse position
function attachTileEventListeners(tile) {
  tile.addEventListener("mousedown", () => onMouseDown(tile));
  tile.addEventListener("mouseup", onMouseUp);
  tile.addEventListener("mouseenter", () => onMouseEnter(tile));
}

// Auxiliary functions to the mouse event listeners
function onMouseDown(tile) {
  isClicking = true;
  changeTileColor(tile);
}

function onMouseUp() {
  isClicking = false;
}

function onMouseEnter(tile) {
  if (isClicking) {
    changeTileColor(tile);
  }
}

// Function to change the tile colors
function changeTileColor(tile) {
  switch (currentMode) {
    case "black":
      tile.style.backgroundColor = "black";
      break;
    case "randomColor":
      tile.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      break;
  }
}

// Function to use black
function black() {
  currentMode = "black";
}

// Function yo use random colors
function randomColor() {
  currentMode = "randomColor";
}

// Collect the user input
function userInput(input) {
  input = prompt("Select the board size:");
  input = Number(input);

  let message = document.querySelector(".message");

  if (input < 0) {
    message.textContent = alert("Invalid input!");
  } else if (input > 100) {
    message.textContent = alert("Choose a number between 0 and 100");
  } else if (input === "" || null) {
    message.textContent = alert("Please provide a number");
  } else {
    return input;
  }
}

// Clears the board
function clearBoard() {
  let tiles = document.querySelectorAll(".grid-item");

  tiles.forEach((tile) => {
    tile.style.backgroundColor = "#fff";
  });
}

// Resets the board
function resetBoard() {
  board.innerHTML = "";
}
