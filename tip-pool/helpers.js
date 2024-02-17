// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects

function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;
  tr.append(newTd);
}

// expects a table row element, creates a new td element with class 'deleteBtn' and value X, appends to tr
function appendDeleteBtn(tr) {
  let newTd = document.createElement('td');
  newTd.innerText = 'X';
  newTd.className = 'deleteBtn'
  tr.append(newTd);
}

// deletes table row, updates allPayments, shift summary, and server table
function deleteTableRow(e) {
  const removedPayment = e.target.parentElement.getAttribute('id');
  delete allPayments[removedPayment];
  updateSummary();
  updateServerTable();
  e.target.parentElement.remove();
}



