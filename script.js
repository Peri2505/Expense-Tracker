const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTrabsactionText = document.getElementById("text");
const newTrabsactionAmount = document.getElementById("amount");

//let transactions = [];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function startTheApp() {
  historyList.innerHTML = "";
  transactions.forEach(addTransactionToHistory);
  updateValues();
}
startTheApp();

function addTransaction(e) {
  e.preventDefault();
  if (
    newTrabsactionText.value.trim() === "" ||
    newTrabsactionAmount.value.trim() === ""
  ) {
    return;
  } else {
    const transacation = {
      id: generaterandomID(),
      text: newTrabsactionText.value,
      amount: +newTrabsactionAmount.value, //Number(newTrabsactionAmount.value)
    };
    transactions.push(transacation);
    updateValues();

    updateLocalStorage();

    addTransactionToHistory(transacation);
    newTrabsactionText.value = "";
    newTrabsactionAmount.value = "";
  }
}
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransactionToHistory(transacation) {
  const { text, amount, id } = transacation;
  const sign = amount > 0 ? "" : "-";
  const item = document.createElement("li");
  item.classList.add(amount > 0 ? "plus" : "minus");
  item.innerHTML = `${text} <span>${sign} $${Math.abs(
    amount
  )}</span><button class="delete-btn" onclick="removeTransaction(event,${id})">X</button>`;
  historyList.appendChild(item);
}

function removeTransaction(event, id) {
  transactions = transactions.filter((transacation) => {
    return transacation.id !== id;
  });

  updateLocalStorage();
  updateValues();
  event.target.parentElement.remove();
}

function updateValues() {
  const amounts = transactions.map((transacation) => transacation.amount);

  const total = amounts.reduce((sum, number) => sum + number, 0).toFixed(2);
  const income = amounts
    .filter((number) => number > 0)
    .reduce((sum, num) => sum + num, 0)
    .toFixed(2);
  const expense = amounts
    .filter((number) => number < 0)
    .reduce((sum, num) => sum + num, 0)
    .toFixed(2);

  balanceAmount.innerHTML = `$${total}`;
  moneyPlusAmount.innerHTML = `$${income}`;
  moneyMinusAmount.innerHTML = `$${expense}`;
}

function generaterandomID() {
  return Math.floor(Math.random() * 10000000000);
}
addTransactionForm.addEventListener("click", addTransaction);
