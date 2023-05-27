const loanAmountInput = document.querySelector('.loan-amount');
const interesRateInput = document.querySelector('.loan-intres_rate');
const loanTrenureInput = document.querySelector('.loan-tenure');

const loanEMIValue = document.querySelector('.loan-emi .value');
const totalInterestValue = document.querySelector('.total-in .value');
const totalAmountVAlue = document.querySelector('.total-amount .value');

const calBtn = document.querySelector('.cal-btn');

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interesRateInput.value);
let loanTenure = parseFloat(loanTrenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

const displayChart = function (totalInterestPayable) {
  const ctx = document.getElementById('myChart').getContext('2d');
 myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Total Interest', 'Prinvipal Loan Amount'],
        datasets: [{
            data: [totalInterestPayable, loanAmount],
            backgroundColor: ["#005aff","#E31937"],
            borderWidth: 0
        }]
    },
    
});
}

const updateChartUi = function(totalInterestPayable, loanAmount){
  myChart.data.datasets[0].data[0] = totalInterestPayable;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
}

// Formula
const calcEMI = () => {
  let emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure) /
    (Math.pow(1 + interest, loanTenure) - 1))

  return emi;
}

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountVAlue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if(myChart) {
    updateChartUi(totalInterestPayable, loanAmount);
  } else {
    displayChart(totalInterestPayable, loanAmount);
  }

 
}

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interesRateInput.value);
  loanTenure = parseFloat(loanTrenureInput.value);

  interest = interestRate / 12 / 100;
};

const init = () => {
  refreshInputValues();
  let emi = calcEMI()
  updateData(emi);
}

init();


calBtn.addEventListener('click', init)