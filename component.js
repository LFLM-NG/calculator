function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operateSign, num1, num2) {
    switch (operateSign) {
        case `+`:
            return add(num1, num2);
        case `-`:
            return subtract(num1, num2);
        case `*`:
            return multiply(num1, num2);
        case `/`:
            return divide(num1, num2);
    }
}

const numText = `0123456789`;
const operateSign = `+-*/`;
let numberFirst = `0`,
numberSecond = `0`,
operator = ``;

const displayText = document.querySelector(`.display-text`)
const buttons = document.querySelectorAll(`button`)
buttons.forEach((button) => {    
    button.addEventListener(`click`, (e) => {
        let buttonContent = e.target.textContent;
        if (e.target.className === `clear`) {
            numberFirst = `0`;
            numberSecond = `0`;
            operator = ``;
            displayText.textContent = numberSecond;
        } else if (operateSign.includes(buttonContent)){
            operator = buttonContent;
            numberFirst = numberSecond;
            numberSecond = `0`;
        } else if (numText.includes(buttonContent)) {
            numberSecond += buttonContent;
            displayText.textContent = numberSecond;
        } else if (e.target.className === `equal`) {
            if (!operator) displayText.textContent = numberSecond;
            numberSecond = operate(operator, +numberFirst, +numberSecond);
            displayText.textContent = numberSecond;
        }
    });
})
