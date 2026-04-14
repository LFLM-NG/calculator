let currentNum = ``;
let previousNum = ``;
let operator = ``;

const currentDisplayNumber = document.querySelector(`.current-number`);
const previousDisplayNumber = document.querySelector(`.previous-number`);

const equal = document.querySelector(`.equal`);

const decimal = document.querySelector(`.decimal`);

const clear = document.querySelector(`.clear`);

const backspace = document.querySelector(`.backspace`);

const numberButtons = document.querySelectorAll(`.number`);

const operators = document.querySelectorAll(`.operator`);

numberButtons.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    handleNumber(e.target.textContent);
  });
});

operators.forEach((btn) => {
  btn.addEventListener(`click`, (e) => {
    handleOperator(e.target.textContent);
  });
});

equal.addEventListener(`click`, () => {
  if (currentNum !== `` && previousNum !== ``) {
    calculate();
  }
});

clear.addEventListener(`click`, () => {
  clearCalculator();
});

decimal.addEventListener(`click`, () => {
  addDecimal();
});

backspace.addEventListener(`click`, () => {
  handleDelete();
});

window.addEventListener(`keyup`, (e) => {
  handleKeyPress(e);
});

function handleNumber(num) {
  if (previousNum !== `` && currentNum !== `` && operator === ``) {
    previousNum = ``;
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length < 10) {
    currentNum += num;
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleOperator(op) {
  if (previousNum === ``) {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === ``) {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    previousDisplayNumber.textContent = `${previousNum} ${operator}`;
    currentDisplayNumber.textContent = `0`;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = `${previousNum} ${operator}`;
  currentDisplayNumber.textContent = `0`;
  currentNum = ``;
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === `+`) {
    previousNum += currentNum;
  } else if (operator === `-`) {
    previousNum -= currentNum;
  } else if (operator === `*`) {
    previousNum *= currentNum;
  } else if (operator === `/`) {
    if (currentNum === 0) {
      previousNum = `Error`;
      displayResult();
      return;
    }
    previousNum /= currentNum;
  }

  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResult();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResult() {
  if (previousNum.length < 10) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = `${previousNum.slice(0, 9)}...`;
  }
  previousDisplayNumber.textContent = ``;
  operator = ``;
  currentNum = ``;
}

function clearCalculator() {
  currentNum = ``;
  previousNum = ``;
  operator = ``;
  previousDisplayNumber.textContent = ``;
  currentDisplayNumber.textContent = `0`;
}

function addDecimal() {
  if (!currentNum.includes(`.`)) {
    currentNum += `.`;
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleDelete() {
  if (currentNum !== ``) {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum === ``) {
    currentDisplayNumber.textContent = `0`;
  }
  if (currentNum === `` && previousNum !== `` && operator === ``) {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === `Enter` ||
    (e.key === `=` && currentNum !== `` && previousNum !== ``)
  ) {
    calculate();
  }
  if (e.key === `+` || e.key === `-` || e.key === `*` || e.key === `/`) {
    handleOperator(e.key);
  }
  if (e.key === `.`) {
    addDecimal();
  }
  if (e.key === `Backspace`) {
    handleDelete();
  }
}
