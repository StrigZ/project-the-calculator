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

  displayTopEle.textContent = `
  ${currentOperand === 2 ? firstOperand : ""} 
  ${operator ? operator : ""}
  ${answer ? secondOperand : ""}
  `;
};

const clear = () => {
  firstOperand = "";
  secondOperand = "";
  currentOperand = 1;
  operator = null;
  answer = null;

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

buttons.forEach((i) => {
  const button = document.createElement("div");
  button.textContent = i.value;
  button.classList.add("item");
  button.style.order = i.order;

  switch (i.type) {
    case "number":
      button.addEventListener("click", (e) => {
        if (answer) {
          clear();
        }

        if (currentOperand == 1) {
          firstOperand += e.target.textContent;
        } else {
          secondOperand += e.target.textContent;
        }

        updateUI();
      });
      break;
    case "calculate":
      button.addEventListener("click", (e) => {
        answer = operate(operator, +firstOperand, +secondOperand);

        updateUI();
        firstOperand = answer;
        secondOperand = "";
      });
      break;
    case "operator":
      button.addEventListener("click", (e) => {
        currentOperand = 2;
        operator = e.target.textContent;
        secondOperand = "";
        answer = null;

        updateUI();
      });
      break;
    case "dot":
      button.addEventListener("click", (e) => {
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
      });
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
