window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000;
  document.getElementById("loan-years").value = 5;
  document.getElementById("loan-rate").value = 3.5;
  const values = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const updatedValues = getCurrentUIValues();
  const newMonthly = calculateMonthlyPayment(updatedValues);
  updateMonthly(newMonthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if (isNaN(values.amount) || isNaN(values.rate) || isNaN(values.years)) {
    throw new Error('Input invalid!');
  } else {
    const p = values.amount;
    const r = (values.rate / 100) / 12;
    const n = values.years * 12;
    const m = p * r * ((1 + r) ** n) / (((1 + r) ** n) - 1);
    return `${m.toFixed(2)}`;
  }
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.getElementById('monthly-payment');
  monthlyPayment.innerText = '$' + monthly;
}
