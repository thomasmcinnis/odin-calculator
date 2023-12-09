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
  } else if (input == 'percent') {
    percentHandler();
  } else if (input == 'minus') {
    negPosHandler();
  } else if (input == '=') {
    equalsHandler();
  } else if (input == '/' || input == '*' || input == '-' || input == '+') {
    operator = input;
  } else {
    console.log(input);
    numKeyHandler(input);
  }

  textField.textContent = displayNum;
  // TODO: limit length to 12 regardless of decimal position
};

const updateValues = function () {
  !operator ? (firstNum = displayNum) : (secondNum = displayNum);
};

const numKeyHandler = function (input) {
  if (displayNum == 0 && input == 0) return;

  if (input == 'point') input = '.';
  // TODO: prevent multiple points in a num
  // TODO: insert leading 0 if displayNum currently 0

  if (secondNum || (!operator && firstNum)) {
    displayNum += input;
  } else {
    displayNum = input;
  }

  updateValues();
};

const equalsHandler = function () {
  if (operator == '/' && secondNum == 0) {
    return alert("Don't do that!");
  }

  if (displayNum == 0) return (displayNum = 0);
  console.log(secondNum);
  let a;
  let b;
  let c;

  if (!operator && !lastOperation.operator) return;
  if (!secondNum && !lastOperation.b) {
    a = displayNum;
    b = displayNum;
  } else {
    a = firstNum ? firstNum : displayNum;
    b = secondNum ? secondNum : lastOperation.b;
  }
  c = operator ? operator : lastOperation.operator;

  result = calculate(parseFloat(a), parseFloat(b), c);

  lastOperation.a = a;
  lastOperation.b = b;
  lastOperation.operator = c;
  console.log(lastOperation);

  firstNum = null;
  secondNum = null;
  operator = null;

  displayNum = result;
};

const percentHandler = function () {
  if (displayNum == 0) return;
  displayNum = displayNum / 100;
  updateValues();
};

const negPosHandler = function () {
  if (displayNum == 0) return;
  if (displayNum < 0) {
    displayNum = Math.abs(displayNum);
  } else {
    displayNum = -Math.abs(displayNum);
  }
  updateValues();
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
