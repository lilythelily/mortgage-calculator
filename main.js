"use strict";

const input = document.querySelectorAll("input");
const leftIcon = document.querySelector(".left");
const rightIcon1 = document.querySelector("#right1");
const rightIcon2 = document.querySelector("#right2");
const repay = document.querySelector("#repay");
const interest = document.querySelector("#interest");
const radio1 = document.querySelector("#radio1");
const radio2 = document.querySelector("#radio2");
const dot1 = document.querySelector("#dot1");
const dot2 = document.querySelector("#dot2");
const calculateBtn = document.querySelector(".calculate");
const emptyResults = document.querySelector(".empty-results");
const yourResults = document.querySelector(".your-results");
const clearBtn = document.querySelector(".clear");
const errorMsg = document.querySelectorAll("small");

// change styles

function leftStyle() {
  leftIcon.style.backgroundColor = "hsl(61, 70%, 52%)";
  leftIcon.style.color = "hsl(202, 55%, 16%)";
  leftIcon.style.borderColor = "hsl(61, 70%, 52%)";
}

function revertLeftStyle() {
  leftIcon.style.backgroundColor = "hsl(202, 86%, 94%)";
  leftIcon.style.color = "hsl(200, 26%, 54%)";
  leftIcon.style.borderColor = "hsl(200, 26%, 54%)";
}

function rightStyle1() {
  rightIcon1.style.backgroundColor = "hsl(61, 70%, 52%)";
  rightIcon1.style.color = "hsl(202, 55%, 16%)";
  rightIcon1.style.borderColor = "hsl(61, 70%, 52%)";
}

function revertRightStyle1() {
  rightIcon1.style.backgroundColor = "hsl(202, 86%, 94%)";
  rightIcon1.style.color = "hsl(200, 26%, 54%)";
  rightIcon1.style.borderColor = "hsl(200, 26%, 54%)";
}

function rightStyle2() {
  rightIcon2.style.backgroundColor = "hsl(61, 70%, 52%)";
  rightIcon2.style.color = "hsl(202, 55%, 16%)";
  rightIcon2.style.borderColor = "hsl(61, 70%, 52%)";
}

function revertRightStyle2() {
  rightIcon2.style.backgroundColor = "hsl(202, 86%, 94%)";
  rightIcon2.style.color = "hsl(200, 26%, 54%)";
  rightIcon2.style.borderColor = "hsl(200, 26%, 54%)";
}

function revertRadio1() {
  repay.style.borderColor = "hsl(200, 26%, 54%)";
  radio1.style.borderColor = "hsl(200, 26%, 54%)";
  dot1.style.opacity = 0;
  repay.style.backgroundColor = "#fff";
}

function revertRadio2() {
  interest.style.borderColor = "hsl(200, 26%, 54%)";
  radio2.style.borderColor = "hsl(200, 26%, 54%)";
  dot2.style.opacity = 0;
  interest.style.backgroundColor = "#fff";
}

// input field events

input.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target === input[0]) {
      item.style.borderColor = "hsl(61, 70%, 52%)";
      leftStyle();
    }
    if (e.target === input[1]) {
      item.style.borderColor = "hsl(61, 70%, 52%)";
      rightStyle1();
    }
    if (e.target === input[2]) {
      item.style.borderColor = "hsl(61, 70%, 52%)";
      rightStyle2();
    }
  });
});

// radio button events

repay.addEventListener("click", (e) => {
  if ((dot2.style.opacity = 1)) {
    repay.style.borderColor = "hsl(61, 70%, 52%)";
    repay.style.backgroundColor = "hsla(61, 70%, 52%, .2)";
    radio1.style.borderColor = "hsl(61, 70%, 52%)";
    dot1.style.opacity = 1;
    revertRadio2();
  }
});

interest.addEventListener("click", (e) => {
  if ((dot1.style.opacity = 1)) {
    interest.style.borderColor = "hsl(61, 70%, 52%)";
    interest.style.backgroundColor = "hsla(61, 70%, 52%, .2)";
    radio2.style.borderColor = "hsl(61, 70%, 52%)";
    dot2.style.opacity = 1;
    revertRadio1();
  }
});

// clear styles

// document.addEventListener("click", (e) => {
//   if (e.target != input[0] && e.target != calculateBtn) {
//     revertLeftStyle();
//     input[0].style.borderColor = "hsl(200, 26%, 54%)";
//   }
//   if (e.target != input[1] && e.target != calculateBtn) {
//     revertRightStyle1();
//     input[1].style.borderColor = "hsl(200, 26%, 54%)";
//   }
//   if (e.target != input[2] && e.target != calculateBtn) {
//     revertRightStyle2();
//     input[2].style.borderColor = "hsl(200, 26%, 54%)";
//   }
// });

// calculate mortgage

calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let hasError = false;

  // reset error state
  errorMsg.forEach((msg) => msg.classList.add("hide"));
  input.forEach((inputField) => {
    inputField.style.borderColor = "hsl(200, 26%, 54%)";
  });
  revertLeftStyle();
  revertRightStyle1();
  revertRightStyle2();

  // error handling
  input.forEach((inputField, index) => {
    if (inputField.value.trim() === "") {
      hasError = true;
      errorMsg[index].classList.remove("hide");
      inputField.style.borderColor = "hsl(4, 69%, 50%)";

      if (index === 0) {
        leftIcon.style.backgroundColor = "hsl(4, 69%, 50%)";
        leftIcon.style.color = "#fff";
        leftIcon.style.borderColor = "hsl(4, 69%, 50%)";
      } else if (index === 1) {
        rightIcon1.style.backgroundColor = "hsl(4, 69%, 50%)";
        rightIcon1.style.color = "#fff";
        rightIcon1.style.borderColor = "hsl(4, 69%, 50%)";
      } else if (index === 2) {
        rightIcon2.style.backgroundColor = "hsl(4, 69%, 50%)";
        rightIcon2.style.color = "#fff";
        rightIcon2.style.borderColor = "hsl(4, 69%, 50%)";
      }
    }
  });

  // radio button check
  if (dot1.style.opacity == 0 && dot2.style.opacity == 0) {
    hasError = true;
    errorMsg[3].classList.remove("hide");
  }

  // stop calculation if any error
  if (hasError) {
    return;
  }

  emptyResults.classList.add("hide");
  yourResults.classList.remove("hide");

  const mortgageAmount = parseFloat(input[0].value.replace(/,/g, ""));
  const interestRate = parseFloat(input[2].value) / 100;
  const termYears = parseFloat(input[1].value);
  const termMonths = termYears * 12;
  const monthlyRate = interestRate / 12;
  const monthlyAmount = document.querySelector(".monthly-amount");
  const totalAmount = document.querySelector(".total-amount");

  if (dot1.style.opacity == 1) {
    // repayment calculation
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, termMonths);
    const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
    let monthlyPayment = mortgageAmount * (numerator / denominator);
    let totalPayment = monthlyPayment * termMonths;

    monthlyAmount.textContent = `£${formatter.format(
      monthlyPayment.toFixed(2)
    )}`;
    totalAmount.textContent = `£${formatter.format(totalPayment.toFixed(2))}`;
  } else if (dot2.style.opacity == 1) {
    // interest-only calculation
    let interestOnly = mortgageAmount * monthlyRate;
    let totalInterest = interestOnly * termMonths;

    monthlyAmount.textContent = `£${formatter.format(interestOnly.toFixed(2))}`;
    totalAmount.textContent = `£${formatter.format(totalInterest.toFixed(2))}`;
  }
});

// format numbers

const formatter = new Intl.NumberFormat("en-US");

input[0].addEventListener("input", (e) => {
  const rawValue = e.target.value.replace(/[^0-9]/g, "");
  if (rawValue) {
    const formattedValue = formatter.format(parseInt(rawValue));
    e.target.value = formattedValue;
  } else {
    e.target.value = "";
  }
});

// show error messages

// small.forEach(() => {
//   calculateBtn.addEventListener('click', (e) => {
//       if (small.closest === input[0]) {
//         input[0].style.borderColor = "hsl(4, 69%, 50%)";
//         leftIcon.style.backgroundColor = "hsl(4, 69%, 50%)";
//         leftIcon.style.color = "#fff";
//         leftIcon.style.borderColor = "hsl(4, 69%, 50%)";
//         small.classList.remove('hide');
//       }
//   })
// });

// clear all fields

clearBtn.addEventListener("click", (e) => {
  window.location.reload();
});
