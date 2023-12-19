let operator = "";
let previousValue = "";
let currentValue = "";

let clear = document.querySelector(".clear");
let equals = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let previousScreen = document.querySelector(".upper");
let currentScreen = document.querySelector(".lower");

// Grab every number using forEach() and the event object
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentValue;
  });
});

// The same as above for the operators
operators.forEach((op) =>
  op.addEventListener("click", function (e) {
    handleOperator(e.target.textContent);
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;
  })
);

// Clearing the screen
clear.addEventListener("click", () => {
  operator = "";
  previousValue = "";
  currentValue = "";
  previousScreen.textContent = "";
  currentScreen.textContent = "";
});

// Adding decimal
decimal.addEventListener("click", () => {
  addDecimal();
});

// The equals listener checks if either value is empty, executes calculate(), clears the previous screen
// and sets the current screen to the current value, which is the result of calculate().
equals.addEventListener("click", () => {
  if (currentValue != "" && previousValue != "") {
    calculate();
    previousScreen.textContent = "";
    if (previousValue.length <= 8) {
      currentScreen.textContent = previousValue;
    } else {
      currentScreen.textContent = previousValue.slice(0, 8) + "...";
    }
  }
});

// Auxiliary functions.

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}

function handleNumber(num) {
  if (currentValue.length <= 6) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}
