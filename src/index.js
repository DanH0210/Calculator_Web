function main() {
    const a = 5;
    const b = 7;
    const operator = '+';
}

function operate(operator, n1, n2) {
    switch (operate) {
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