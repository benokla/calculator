const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorNumbers = document.querySelectorAll(".calculator-number");
const calculatorOperators = document.querySelectorAll(".calculator-operator");
const calculatorEquals = document.querySelector("#calculator-equals")

let num1, num2, operation; 

calculatorNumbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        calculatorDisplay.textContent += e.target.firstChild.textContent;
    })
})

calculatorOperators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        num1 = calculatorDisplay.textContent;
        operation = e.target.value;
        calculatorDisplay.textContent += e.target.firstChild.textContent;
    })
})

calculatorEquals.addEventListener("click", () => {
    let temp = calculatorDisplay.textContent.split("");
    let pos = num1.split("").length + 1;
    num2 = temp.slice(pos).join("");

    switch(operation) {
        case "add":
            operation = add;
            break;
        case "subtract":
            operation = subtract;
            break;c
        case "divide":
            operation = divide;
            break;
        case "multiply":
            operation = multiply;
            break;
    }

    calculatorDisplay.textContent = operate(operation, +num1, +num2)
})

function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function divide(a, b) {
    return a / b;
};
function multiply(a, b) {
    return a * b;
};

function operate(operator, num1, num2) {
    return operator(num1, num2);
}
