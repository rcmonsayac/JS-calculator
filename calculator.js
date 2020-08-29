
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const displayedNum = display.textContent;

        const displayString = createDisplayString(key, displayedNum, calculator.dataset);

        

        updateCalculatorState(key, calculator, displayString, displayedNum);
        display.textContent = displayString;
        //display.textContent = format(displayString);

        // const key = e.target;
        // const action = key.dataset.action;
        // const keyContent = key.textContent;
        // const displayedNum = display.textContent;
        // const previousKeyType = calculator.dataset.previousKeyType

        // Array.from(key.parentNode.children)
        //     .forEach(k => k.classList.remove('is-depressed'));

        // if (!action) {
        //     if (
        //         displayedNum === '0' ||
        //         previousKeyType === 'operator' ||
        //         previousKeyType === 'calculate'
        //     ) {
        //         display.textContent = keyContent;
        //     } else {
        //         display.textContent = displayedNum + keyContent;
        //     }
        //     calculator.dataset.previousKeyType = 'number';
        // }

        // if (action === 'decimal') {
        //     if (!displayedNum.includes('.')) {
        //         display.textContent = displayedNum + '.'
        //     } else if (
        //         previousKeyType === 'operator' ||
        //         previousKeyType === 'calculate'
        //     ) {
        //         display.textContent = '0.'
        //     }

        //     calculator.dataset.previousKeyType = 'decimal'
        // }

        // if (
        //     action === 'add' ||
        //     action === 'subtract' ||
        //     action === 'multiply' ||
        //     action === 'divide'
        // ) {
        //     const firstValue = calculator.dataset.firstValue
        //     const operator = calculator.dataset.operator
        //     const secondValue = displayedNum


        //     if (
        //         firstValue &&
        //         operator &&
        //         previousKeyType !== 'operator' &&
        //         previousKeyType !== 'calculate'
        //     ) {
        //         const calcValue = calculate(firstValue, operator, secondValue);
        //         display.textContent = calcValue;
        //         calculator.dataset.firstValue = calcValue;
        //     } else {

        //         calculator.dataset.firstValue = displayedNum;
        //     }


        //     key.classList.add('is-depressed')
        //     calculator.dataset.operator = action;
        //     calculator.dataset.previousKeyType = 'operator';
        // }

        // if (action === 'calculate') {
        //     let firstValue = calculator.dataset.firstValue;
        //     const operator = calculator.dataset.operator;
        //     let secondValue = displayedNum;

        //     if (firstValue) {
        //         if (previousKeyType === 'calculate') {
        //             firstValue = displayedNum;
        //             secondValue = calculator.dataset.modValue;
        //         }

        //         display.textContent = calculate(firstValue, operator, secondValue);
        //     }

        //     // Set modValue attribute
        //     calculator.dataset.modValue = secondValue;
        //     calculator.dataset.previousKeyType = 'calculate'
        // }

        // if (action !== 'clear') {
        //     const clearButton = calculator.querySelector('[data-action=clear]')
        //     clearButton.textContent = 'CE'
        // }

        // if (action === 'clear') {
        //     if (key.textContent === 'AC') {
        //         calculator.dataset.firstValue = ''
        //         calculator.dataset.modValue = ''
        //         calculator.dataset.operator = ''
        //         calculator.dataset.previousKeyType = ''
        //     } else {
        //         key.textContent = 'AC'
        //     }

        //     display.textContent = 0;
        //     calculator.dataset.previousKeyType = 'clear';
        // }
    }
});


const createDisplayString = (key, displayedNum, state) => {
    const keyType = getKeyType(key);
    const keyContent = key.textContent;
    const {
        previousKeyType,
        firstValue,
        modValue,
        operator
    } = state;

    if (keyType === 'number') {
        return (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') ?
            keyContent : displayedNum + keyContent;
    }

    if (keyType === 'decimal') {
        return (previousKeyType === 'operator' || previousKeyType === 'calculate') ? '0.' :
            (!displayedNum.includes('.') ? displayedNum + '.' : displayedNum );
    }

    if (keyType === 'operator') {
        return (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) ? calcValue = calculate(firstValue, operator, displayedNum) : displayedNum;
    }

    if (keyType === 'calculate') {
        if (firstValue) {
            return (previousKeyType === 'calculate') ?
                calculate(displayedNum, operator, modValue) : calculate(firstValue, operator, displayedNum);
        }
    }

    if (keyType === 'clear') {
        return 0;
    }
}

const updateCalculatorState = (key, calculator, calcValue, displayedNum) => {
    const keyType = getKeyType(key);

    const {
        previousKeyType,
        firstValue,
        operator,
        modValue
    } = calculator.dataset;

    const clearButton = calculator.querySelector('[data-action=clear]');

    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'));

    if (keyType === 'number') {
        clearButton.textContent = 'CE'
        if (previousKeyType === 'calculate') {
            initializeCalculatorState(calculator);
        }
        
    }

    if (keyType === 'decimal') {
        clearButton.textContent = 'CE'
        if (previousKeyType === 'calculate') {
            initializeCalculatorState(calculator);
        }
    }


    if (keyType === 'operator') {
        clearButton.textContent = 'AC'
        calculator.dataset.firstValue = 
        (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) ? calcValue : displayedNum;

        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action;
    }

    if (keyType === 'calculate') {
        clearButton.textContent = 'AC'
        calculator.dataset.modValue = (firstValue && previousKeyType === 'calculate') ? modValue : displayedNum;
    }

    if (keyType === 'clear') {
        if (key.textContent === 'AC') {
            initializeCalculatorState(calculator);
        } else {
            key.textContent = 'AC'
        }
    }

    calculator.dataset.previousKeyType = keyType;

}

const calculate = (firstValue, operator, secondValue) => {

    let result = 0;
    let op1 = parseFloat(firstValue);
    let op2 = parseFloat(secondValue);

    switch (operator) {
        case 'add':
            result = op1 + op2;
            break;
        case 'subtract':
            result = op1 - op2;
            break;

        case 'multiply':
            result = op1 * op2;
            break;
        case 'divide':
            result = op1 / op2;
            break;
        default:
            result = null;
    }

    return result;
}

const getKeyType = (key) => {
    const { action } = key.dataset;
    if (!action) return 'number';
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator';

    return action;
}

const initializeCalculatorState = (calculator) => {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
}

// const format = (displayString) = {


//     return
// }


