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

let numberFirst, numberSecond, operator;

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

const buttons = document.querySelectorAll(`button`)
buttons.forEach((button) => {
    button.addEventListener(`click`, (e) => console.log(e.target.textContent));
})