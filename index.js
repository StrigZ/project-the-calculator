const buttonsDivEle = document.querySelector(".buttons");
const displayBottomEle = document.querySelector(".display .bottom");
const displayTopEle = document.querySelector(".display .top");
const resetButtonEle = document.querySelector("#resetButton");
const clearButtonEle = document.querySelector("#clearButton");

let firstOperand = "";
let secondOperand = "";
let operator = null;
let currentOperand = 1;
let answer = null;
let expression = "";

const buttons = [
  { type: "number", value: 1, order: 1 },
  { type: "number", value: 2, order: 2 },
  { type: "number", value: 3, order: 3 },
  { type: "number", value: 4, order: 5 },
  { type: "number", value: 5, order: 6 },
  { type: "number", value: 6, order: 7 },
  { type: "number", value: 7, order: 9 },
  { type: "number", value: 8, order: 10 },
  { type: "number", value: 9, order: 11 },
  { type: "number", value: 0, order: 14 },
  { type: "operator", value: "÷", order: 4 },
  { type: "operator", value: "×", order: 8 },
  { type: "operator", value: "-", order: 12 },
  { type: "dot", value: ".", order: 13 },
  { type: "operator", value: "+", order: 16 },
  { type: "calculate", value: "=", order: 15 },
];

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) {
        setTimeout(() => {
          clear();
        }, 500);
        return "I WILL FIND YOU";
      }
      return a / b;
    default:
      break;
  }
};

const updateUI = () => {
  if (answer) {
    displayBottomEle.textContent = answer;
  } else {
    displayBottomEle.textContent =
      currentOperand === 1 || secondOperand === ""
        ? firstOperand
        : secondOperand;
  }

  displayTopEle.textContent = expression;
};

const clear = () => {
  firstOperand = "";
  secondOperand = "";
  currentOperand = 1;
  operator = null;
  answer = null;
  expression = "";

  displayTopEle.textContent = "";
  displayBottomEle.textContent = "";
};

const deleteChar = () => {
  if (answer) {
    return;
  }

  if (currentOperand === 1) {
    firstOperand = firstOperand.slice(0, -1);
    displayBottomEle.textContent = firstOperand;
  } else {
    secondOperand = secondOperand.slice(0, -1);
    displayBottomEle.textContent = secondOperand;
  }
};

const handleNumber = (e) => {
  if (answer) {
    clear();
  }

  if (currentOperand == 1) {
    firstOperand += e.target.textContent;
  } else {
    secondOperand += e.target.textContent;
  }
  updateUI();
};

const handleOperator = (e) => {
  if (!firstOperand) {
    operator = e.target.textContent;
    firstOperand = "0";

    expression = `${firstOperand} ${operator} `;
  } else if (firstOperand && secondOperand) {
    answer = operate(operator, +firstOperand, +secondOperand);
    operator = e.target.textContent;

    firstOperand = answer;
    expression += `${secondOperand} ${operator} `;
    secondOperand = "";
    answer = null;
  } else if (firstOperand) {
    operator = e.target.textContent;
    expression = `${firstOperand} ${operator} `;
  }

  currentOperand = 2;
  updateUI();
};

const handleDot = (e) => {
  if (currentOperand == 1) {
    if (firstOperand.includes(".")) {
      return;
    }

    firstOperand === ""
      ? (firstOperand = "0.")
      : (firstOperand += e.target.textContent);
  } else {
    if (secondOperand.includes(".")) {
      return;
    }
    secondOperand === ""
      ? (secondOperand = "0.")
      : (secondOperand += e.target.textContent);
  }

  updateUI();
};

const handleCalculate = () => {
  if (!firstOperand || !secondOperand || !operator) {
    return;
  }

  answer = operate(operator, +firstOperand, +secondOperand);
  expression = "";

  updateUI();
  firstOperand = answer;
  secondOperand = "";
  answer = null;
  currentOperand = 1;
};

buttons.forEach((i) => {
  const button = document.createElement("div");
  button.textContent = i.value;
  button.classList.add("item");
  button.style.order = i.order;

  switch (i.type) {
    case "number":
      button.addEventListener("click", handleNumber);

      break;
    case "calculate":
      button.addEventListener("click", handleCalculate);
      break;
    case "operator":
      button.addEventListener("click", handleOperator);
      break;
    case "dot":
      button.addEventListener("click", handleDot);
      break;

    default:
      break;
  }

  buttonsDivEle.appendChild(button);
});

clearButtonEle.addEventListener("click", clear);
resetButtonEle.addEventListener("click", () => {
  deleteChar();
});
