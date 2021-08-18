const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorNumbers = document.querySelectorAll(".calculator-number");
const calculatorOperators = document.querySelectorAll(".calculator-operator");
const calculatorEquals = document.querySelector("#calculator-equals");
const calculatorClear = document.querySelector("#calculator-clear");
const calculatorFloat = document.querySelector(".calculator-float");
const calculatorBack = document.querySelector("#calculator-back");

let num1 = "";
let num2 = "";
let operation = "";
let reset = false; //if reset is true, the display clears by typing a number

// Typing a number
calculatorNumbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if(reset) {
            clearAll();
            reset = false;
        }
        calculatorDisplay.textContent += e.target.textContent;
    })
})

// Typing a "."
calculatorFloat.addEventListener("click", () => {
    // Logic that prevents multiply "."
    let a = calculatorDisplay.textContent.split(".");
    let i = 2;
    if(num1.includes(".")) i = 3;

    if(calculatorDisplay.textContent.includes(".") && operation == "") {
        } 
    else if(a.length >= i) {
        }
    else {
        calculatorDisplay.textContent += "."
    }
})

//Typing "Back"
calculatorBack.addEventListener("click", (e) => {
    // Logic that sets operation = "" when u remove it by "Back"
    let a = calculatorDisplay.textContent.split("");
    if(a[a.length-1] == "+" || a[a.length-1] == "-" || a[a.length-1] == "/" || a[a.length-1] == "*") {
        operation = "";
    }
    a.pop();
    calculatorDisplay.textContent = a.join("");
})

//Function that returns an array with [num1, num2, operation]
function returnValues() {
    let temp = calculatorDisplay.textContent.split("");
    if(temp.includes("+")) {
        let pos = temp.indexOf("+");
        num1 = temp.slice(0, pos).join("");
        num2 = temp.slice(pos+1).join("");
        operation = add;
    } else if(temp.includes("-")) {
        let pos = temp.indexOf("-");
        num1 = temp.slice(0, pos).join("");
        num2 = temp.slice(pos+1).join("");
        operation = subtract;
    } else if(temp.includes("/")) {
        let pos = temp.indexOf("/");
        num1 = temp.slice(0, pos).join("");
        num2 = temp.slice(pos+1).join("");
        operation = divide;
    } else if(temp.includes("*")) {
        let pos = temp.indexOf("*");
        num1 = temp.slice(0, pos).join("");
        num2 = temp.slice(pos+1).join("");
        operation = multiply;
    }

    return [num1, num2, operation]
}

//Typing an operator
calculatorOperators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        //Calculates the numbers when its the secon operators
        if (operation != "") {
            let values = returnValues();
            calculatorDisplay.textContent = operate(values[2], +values[0], +values[1])
            num2 = 0;
            num1 = calculatorDisplay.textContent;
            calculatorDisplay.textContent += e.target.firstChild.textContent;
        } else {
            num1 = calculatorDisplay.textContent;
            operation = e.target.value;
            calculatorDisplay.textContent += e.target.firstChild.textContent;
        }
    })
})

//Typing equals and also clears num2, operation.
calculatorEquals.addEventListener("click", () => {
    let values = returnValues();
    calculatorDisplay.textContent = operate(values[2], +values[0], +values[1]);
    num2 = 0;
    operation = "";
    num1 = calculatorDisplay.textContent;

    reset = true;
})

// Typing "AC"
calculatorClear.addEventListener("click", clearAll);

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
    if(operator == divide && num2 == 0) {
        return "Error, you divided by 0"
    } else {
        return Math.round((operator(num1, num2)) * 1000) / 1000;
    }
}

function clearAll() {
    num1 = 0;
    num2 = 0;
    operation = "";
    calculatorDisplay.textContent = "";
}