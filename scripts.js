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
  if (input == 'clear' || input == 'minus' || input == 'percent') {
    funcKeysHandler(input);
  } else if (input == '/' || input == '*' || input == '-' || input == '+') {
    operatorKeyHandler(input);
  } else if (input == '=') {
    equalsKeyHandler();
  } else numKeyHandler(input);

  textField.textContent = displayNum;
};

const numKeyHandler = function (input) {
  if (input == 'point') input = '.';

  if (displayNum == 0 && input == 0) return;

  if (!operator) {
    //then we must still be in the first num
    if (!firstNum) {
      displayNum = input;
      firstNum = displayNum;
      return;
    }
    displayNum += input;
    firstNum = displayNum;
    return;
  } // now we must be in the second num
  if (!secondNum) {
    displayNum = input;
    secondNum = displayNum;
    return;
  }
  displayNum += input;
  secondNum = displayNum;
};

const operatorKeyHandler = function (input) {
  if (!firstNum) {
    firstNum = displayNum;
  }
  operator = input;
};

const equalsKeyHandler = function () {
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

  // Want to modify, so that if user inputs "3" "x" then instead of a multiply it runs power over and over

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

const funcKeysHandler = function (key) {
  if (key == 'clear') {
    displayNum = 0;
    firstNum = null;
    operator = null;
    lastOperation.a = null;
    lastOperation.b = null;
    lastOperation.operator = null;
  }
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