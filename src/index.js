function main() {
    //Declare and initialize necessary variables
    //values using in calculation
    let num1 = 0;
    let num2 = 0;
    let operator = '';
    let currentNumber = 0;

    //values using in displaying
    let formulaValue = [];
    let result = 0;

    //Get formuala and result tag
    const formulaDisplay = document.querySelector(".formula-display");
    const resultDisplay = document.querySelector(".result-display");

    //Get digit buttons and add event handler into them
    const digitsBtns = document.querySelectorAll("button.digit");
    digitsBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            //Everytime you click a number
            //currentValue has 1 more 0s at the end
            //new number will be added into that 0s of the currentValue
            currentNumber = currentNumber * 10 + Number(e.currentTarget.textContent);

            //Handle the display
            formulaValue.push(e.currentTarget.textContent);
            renewTag(formulaDisplay, formulaValue.join(""));
        });
    });

    //Get operator buttons and add event handler into them
    const operatorBtns = document.querySelectorAll("button.operator");
    operatorBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // CASE 1: a +
            //If last value is already an operator, 
            //replace that operator with the new one
            const lastValue = formulaValue[formulaValue.length - 1];
            if (isOperator(lastValue)) {
                operator = e.currentTarget.textContent;
                formulaValue[formulaValue.length - 1] = ` ${e.currentTarget.textContent} `;
                renewTag(formulaDisplay, formulaValue.join(""));
                return;
            }
            // CASE 2: a + b +
            //If there was an operator
            //and last value is not an operator => a number
            //Get the result and add the "operator" right after it
            //When typying: 1 + 3 - 
            // it became 4 - 
            if (operator) {
                num2 = currentNumber;
                result = operate(operator, num1, num2);

                operator = e.currentTarget.textContent;
                formulaValue = [result, ` ${e.currentTarget.textContent} `];
                renewTag(formulaDisplay, formulaValue.join(""));
                renewTag(resultDisplay, result);

                num1 = result;
                currentNumber = 0;
                return;
            }
            // CASE 3: a
            //Assign value of currentNumber to num1
            //Assign the operator
            //Display it out
            //Reset currentNumber to 0
            num1 = currentNumber;
            operator = e.currentTarget.textContent;
            formulaValue.push(` ${e.currentTarget.textContent} `);
            renewTag(formulaDisplay, formulaValue.join(""));

            currentNumber = 0;
        });
    });

    //Get equal button and add event handler into it
    const equalBtn = document.querySelector("button.equal");
    equalBtn.addEventListener("click", (e) => {
        // CASE: a+ | a | +
        // CASE: (empty)
        if (!operator || currentNumber == 0) {
            return;
        }

        //Calculate the result
        num2 = currentNumber;
        result = operate(operator, num1, num2);
        renewTag(resultDisplay, result);

        //Set currentNumber to result 
        //in case you click an operator right after that
        currentNumber = result
        formulaValue = [`${result}`];

        operator = '';

    });

    //Get clear button and add event handler into it
    const clearBtn = document.querySelector("button.clear");
    clearBtn.addEventListener("click", (e) => {
        num1 = 0;
        num2 = 0;
        currentNumber = 0;
        operator = '';
        formulaValue = [];
        result = [];
        renewTag(formulaDisplay, "a + b");
        renewTag(resultDisplay, "C");

    });
}

//Helper functions
function isOperator(data) {
    const ops = ['+', '-', '*', '/'];
    data = data.trim();
    for (let i = 0; i < ops.length; ++i) {
        if (ops[i] == data) {
            return true;
        }
    }
    return false;
}

function renewTag(htmlTag, value) {
    htmlTag.textContent = value;
}

function operate(operator, n1, n2) {
    operator = operator.trim();
    switch (operator) {
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);
        default:
            return "OOPS"
    }
}

function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1, n2) {
    return n1 - n2;
}
function multiply(n1, n2) {
    return n1 * n2;
}
function divide(n1, n2) {
    return n1 / n2;
}

main();