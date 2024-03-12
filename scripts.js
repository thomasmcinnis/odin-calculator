const buttons = document.getElementsByClassName('btn');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', () => {
        handleClick(button.id);
    });
});

const textField = document.querySelector('.interface-text');

function updateScreen(text) {
    textField.textContent = text;
}

// The left and right terms, and an index to toggle which is currently edited
let terms = [0, 0];
let i = 0;
let operator = null;

let previous = {
    left: null,
    right: null,
    operator: null,
    result: null,
};

function handleClick(input) {
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

    console.log(terms[0], operator, terms[1]);

    updateScreen(terms[i]);
}

function numKeyHandler(input) {
    // If there is no operator, input is left, otherwise input is for right
    if (!operator) {
        i = 0;
    } else {
        i = 1;
    }

    // If left and left equal to prev result, set to zero before proceeding
    if (i == 0 && terms[i] == previous.result) {
        terms[i] = 0;
    }

    // If current term exceeds max do nothing
    if (terms[i].toString().length >= 10) {
        return;
    }

    // If input a point and term contains a point return, otherwise append
    if (terms[i].toString().includes('.')) {
        if (input == '.') {
            return;
        }
        terms[i] += input;
        return;
    }

    // If current is not 0 just append input
    if (Number(terms[i]) !== 0) {
        terms[i] += input;
        return;
    }

    // Last we deal with actual 0, which we just overwrite
    if (input == '.') {
        terms[i] += input;
        return;
    }

    terms[i] = input;
}

function operatorHandler(input) {
    let [left, right] = terms;

    // if no operator set operator unless left zero
    if (!operator) {
        if (Number(left) !== 0) {
            operator = input;
        }
        return;
    }

    // if is operator, but right still zero just overwrite operator
    if (right === 0) {
        operator = input;
        return;
    }

    // if right term exists, invoke equals behaviour, and replace operator
    // input ready for new right term input
    equalsHandler();
    operator = input;
}

function equalsHandler() {
    let [left, right] = terms;

    // If there is no curr or prev operator then return else use prev
    if (!operator) {
        if (!previous.operator) {
            return;
        }
        operator = previous.operator;
    }

    // Guard agains dividing by zero
    if (operator == '/' && right == 0) {
        alert("Don't do that!");
        clearHandler();
        return;
    }

    // If the left term is zero then return
    if (left == 0) {
        return;
    }

    // If no right term, use prev. right or use left on both sides
    if (!right) {
        if (!previous.right) {
            right = left;
        } else {
            right = previous.right;
        }
    }

    const result = calculate(parseFloat(left), parseFloat(right), operator);

    // Update the previous with the values from the just completed operation
    previous.left = left;
    previous.right = right;
    previous.operator = operator;
    previous.result = result;

    // Set left to result limited by precision and remove trailing 0s
    terms[0] = result.toPrecision(8).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');

    // Null out right and operator
    terms[1] = 0;
    operator = null;

    // Ensure the current term is reset to left
    i = 0;
}

function percentHandler() {
    if (terms[i] == 0) {
        return;
    }
    terms[i] = terms[i] / 100;
}

function negPosHandler() {
    if (terms[i] == 0) {
        return;
    } else if (terms[i] < 0) {
        terms[i] = Math.abs(terms[i]);
    } else {
        terms[i] = -Math.abs(terms[i]);
    }
}

function clearHandler() {
    terms = [0, 0];
    operator = null;
    previous.left = null;
    previous.right = null;
    previous.operator = null;
}

function calculate(a, b, operator) {
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
}
