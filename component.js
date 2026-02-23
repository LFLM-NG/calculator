function add(x, y) {
    return Math.round((x + y) * 1000) / 1000;
}

function subtract(x, y) {
    return Math.round((x - y) * 1000) / 1000;
}

function multiply(x, y) {
    return Math.round((x * y) * 1000) / 1000;
}

function divide(x, y) {
    return (y === 0) ? `Error:DivByUserInt` : Math.round((x / y) * 1000) / 1000;
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
let operandFirst = ``,
operandSecond = ``,
operator = ``,
isReset = false,
isSecondOperand= false,
isMathReady = false,
isDecimalActive = false;

function reset() {
    operandFirst = ``;
    operandSecond = ``;
    operator = ``;
    isReset = false;
    isSecondOperand= false;
    isMathReady = false;
    isDecimalActive = false;
}

function display(text, result) {
    if (!result) text.textContent = `0`;
    else if (result.toString().at(0) === `.`) text.textContent = `0${result}`;
    else text.textContent = result ;
    return text.textContent;
}

const displayText = document.querySelector(`.display-text`)
const buttonDecimal = document.querySelector(`.decimal`)
const buttons = document.querySelectorAll(`button`)
buttons.forEach((button) => {    
    button.addEventListener(`click`, (e) => {
        let buttonContent = e.target.textContent;
        if (e.target.className === `clear`) {
            reset();
            display(displayText, operandFirst);
        } else if (numText.includes(buttonContent)) {
            if (isSecondOperand) {
                operandSecond += buttonContent;
                isMathReady = true;
                display(displayText, operandSecond);
            } else {
                if (isReset) {
                    operandFirst = ``;
                    isReset = false;
                }
                operandFirst += buttonContent;
                display(displayText, operandFirst);
            }
        } else if (button === buttonDecimal){
            if (!isDecimalActive) {
                if (isSecondOperand) {
                    operandSecond += buttonContent;
                    display(displayText, operandSecond);
                } else {
                    if (isReset) {
                        operandFirst = ``;
                        isReset = false;
                    }
                    operandFirst += buttonContent;
                    display(displayText, operandFirst);
                }
                isDecimalActive = true;
                button.disabled = true;
            }
        } else if (operateSign.includes(buttonContent)){
            if (isMathReady) {
                operandFirst = operate(operator, +operandFirst, +operandSecond);
                display(displayText, operandFirst);
                isMathReady = false;
            }
            operator = buttonContent;
            isSecondOperand = true;
            operandSecond = ``;
            isDecimalActive = false;
            buttonDecimal.disabled = false;
        } else if (e.target.className === `equal`) {
            if (isMathReady) {
                operandFirst = operate(operator, +operandFirst, +operandSecond);
                operandSecond = ``;
                isSecondOperand = false;
                isReset = true;
                isMathReady = false;
                isDecimalActive = false;
                buttonDecimal.disabled = false;
                display(displayText, operandFirst);
            }
        }
    });
})
