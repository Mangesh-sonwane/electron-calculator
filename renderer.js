const expressionDisplay = document.querySelector('.expression');
const resultDisplay = document.querySelector('.result');

let expression = '';
let currentValue = '0';

let firstNumber = null;
let operator = null;
let waitingForNumber = false;

// --------------------
// Display
// --------------------

function updateDisplay() {
  expressionDisplay.textContent = expression;
  resultDisplay.textContent = currentValue;
}

// --------------------
// Number
// --------------------

function inputNumber(number) {
  if (waitingForNumber) {
    currentValue = number;
    waitingForNumber = false;
  } else if (currentValue === '0') {
    currentValue = number;
  } else {
    currentValue += number;
  }

  // Add the number to the expression
  expression += number;

  updateDisplay();
}

// --------------------
// Operator
// --------------------

function inputOperator(symbol) {
  // Don't allow two operators in a row
  if (operator !== null && waitingForNumber) {
    return;
  }

  firstNumber = Number(currentValue);

  // Convert UI symbol to math operator
  const operatorMap = {
    '+': '+',
    '−': '-',
    '×': '*',
    '÷': '/',
  };

  operator = operatorMap[symbol];

  // Add operator to expression
  expression += ` ${symbol} `;

  waitingForNumber = true;

  updateDisplay();
}

// --------------------
// Calculate
// --------------------

function calculate() {
  if (operator === null || firstNumber === null) {
    return;
  }

  const secondNumber = Number(currentValue);

  let result;

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;

    case '-':
      result = firstNumber - secondNumber;
      break;

    case '*':
      result = firstNumber * secondNumber;
      break;

    case '/':
      if (secondNumber === 0) {
        expression = 'Error';
        currentValue = '0';

        updateDisplay();
        return;
      }

      result = firstNumber / secondNumber;
      break;
  }

  // Show complete expression
  expression += ' =';

  currentValue = String(result);

  firstNumber = null;
  operator = null;
  waitingForNumber = true;

  updateDisplay();
}

// --------------------
// Decimal
// --------------------

function inputDecimal() {
  if (waitingForNumber) {
    currentValue = '0';
    expression += '0';
    waitingForNumber = false;
  }

  if (!currentValue.includes('.')) {
    currentValue += '.';
    expression += '.';
  }

  updateDisplay();
}

// --------------------
// Clear
// --------------------

function clearCalculator() {
  expression = '';
  currentValue = '0';

  firstNumber = null;
  operator = null;
  waitingForNumber = false;

  updateDisplay();
}

// --------------------
// Button clicks
// --------------------

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value >= '0' && value <= '9') {
      inputNumber(value);
    } else if (['+', '−', '×', '÷'].includes(value)) {
      inputOperator(value);
    } else if (value === '.') {
      inputDecimal();
    } else if (value === '=') {
      calculate();
    } else if (value === 'AC') {
      clearCalculator();
    }
  });
});
