// DOM ELEMENTS & LISTENERS
const buttons = document.getElementsByClassName('btn');

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', () => {
    handleClick(button.id);
  });
});

const textField = document.querySelector('.interface-text');

// VALUE STORE
let displayNum = 0;
let firstNum = null;
let secondNum = null;

let operator = null;

let lastOperation = {
  a: '',
  b: '',
  operator: '',
};

// HANDLE LOGIC
const handleClick = function (input) {
  if (input == 'clear') {
    clearHandler();
  } else if (input == '%') {
    percentHandler();
  } else if (input == '±') {
    negPosHandler();
  } else if (input == '=') {
    equalsHandler();
  } else if (input == '/' || input == '*' || input == '-' || input == '+') {
    operatorHandler(input);
  } else {
    numKeyHandler(input);
  }

  textField.textContent = displayNum;
};

const operatorHandler = function (input) {
  if (!operator) firstNum = displayNum;
  operator = input;
};

const numKeyHandler = function (input) {
  if (displayNum == 0 && input == 0) return;

  if (input == 'point') {
    if (displayNum && displayNum.includes('.')) return;
    displayNum += '.';
  } else if (secondNum || (!operator && firstNum)) {
    if (displayNum.toString().length >= 10) return;
    displayNum += input;
  } else {
    displayNum = input;
  }

  // Write the display value to the appropriate num variable
  !operator ? (firstNum = displayNum) : (secondNum = displayNum);
};

const equalsHandler = function () {
  // Early returns for cases where we don't want the equals key to invoke anything
  if (operator == '/' && secondNum == 0) {
    return alert("Don't do that!");
  }
  if (displayNum == 0) return;
  if (!operator && !lastOperation.operator) return;

  // Declare some temp variables
  let argFirst, argSecond, argOperator;

  // If theres no secondNum and none saved from the prior operation, use the current display
  if (!secondNum && !lastOperation.b) {
    argFirst = displayNum;
    argSecond = displayNum;
  } else {
    argFirst = firstNum ? firstNum : displayNum;
    argSecond = secondNum ? secondNum : lastOperation.b;
  }
  argOperator = operator ? operator : lastOperation.operator;

  result = calculate(parseFloat(argFirst), parseFloat(argSecond), argOperator);

  lastOperation.a = argFirst;
  lastOperation.b = argSecond;
  lastOperation.operator = argOperator;

  firstNum = null;
  secondNum = null;
  operator = null;

  // Sets the dsplay to the result with a precision and regex to remove trailing zeros and decimal point
  displayNum = result.toPrecision(9).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
};

const percentHandler = function () {
  if (displayNum == 0) return;
  displayNum = displayNum / 100;
};

const negPosHandler = function () {
  if (displayNum == 0) return;
  if (displayNum < 0) {
    displayNum = Math.abs(displayNum);
  } else {
    displayNum = -Math.abs(displayNum);
  }
};

const clearHandler = function () {
  displayNum = 0;
  firstNum = null;
  operator = null;
  lastOperation.a = null;
  lastOperation.b = null;
  lastOperation.operator = null;
};

// CALCULATION
const calculate = function (a, b, operator) {
  let result;

  switch (operator) {
    case '+':
      result = Number(a) + Number(b);
      break;
    case '-':
      result = Number(a) - Number(b);
      break;
    case '*':
      result = Number(a) * Number(b);
      break;
    default:
      result = Number(a) / Number(b);
  }

  return result;
};
