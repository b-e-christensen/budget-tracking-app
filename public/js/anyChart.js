
// displays a pie chart made of data from user's budget
// Grabs the CANVAS (must be displayed to a canvas html element) and establishes it as the place to hold the chart
const ctx = document.getElementById('myChart')
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            'Housing',
            'Insurance',
            'Transportation',
            'Food',
            'Savings',
            'Utilities',
            'Personal'
          ],
        datasets: [{
            label: 'Budget Breakdown',
            // will need to change data variables once it is more clear how this data will be returned
            data: [budget.housing, budget.insurance, budget.transportation, budget.food, budget.savings, budget.utilities, budget.personal],
           backgroundColor: [
            'rgba(236, 112, 99, 0.35)',
            'rgba(165, 105, 189, 0.35)',
            'rgba(93, 173, 226, 0.35)',
            'rgba(69, 179, 157, 0.35)',
            'rgba(88, 214, 141, 0.35)',
            'rgba(245, 176, 65, 0.35)',
            'rgba(220, 118, 51, 0.35)'
          ],
          borderColor: [
            'rgba(236, 112, 99, 1)',
            'rgba(165, 105, 189, 1)',
            'rgba(93, 173, 226, 1)',
            'rgba(69, 179, 157, 1)',
            'rgba(88, 214, 141, 1)',
            'rgba(245, 176, 65, 1)',
            'rgba(220, 118, 51, 1)'
          ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true
  }
});

// displays bar chart which contains budget info, and line chart overlayed showing expenses made. 
const ctxOverlay = document.getElementById('myChart');
const mixedChart = new Chart(ctxOverlay, {
    data: {
        labels: [
          'Housing',
          'Insurance',
          'Transportation',
          'Food',
          'Savings',
          'Utilities',
          'Personal'
        ],
        datasets: [{
          type: 'bar',
          label: 'Budget',
          // will need to change data variables once it is more clear how this data will be returned
          data: [budget.housing, budget.insurance, budget.transportation, budget.food, budget.savings, budget.utilities, budget.personal],
          backgroundColor: [
            'rgba(236, 112, 99, 0.35)',
            'rgba(165, 105, 189, 0.35)',
            'rgba(93, 173, 226, 0.35)',
            'rgba(69, 179, 157, 0.35)',
            'rgba(88, 214, 141, 0.35)',
            'rgba(245, 176, 65, 0.35)',
            'rgba(220, 118, 51, 0.35)'
          ],
          borderColor: [
            'rgba(236, 112, 99, 1)',
            'rgba(165, 105, 189, 1)',
            'rgba(93, 173, 226, 1)',
            'rgba(69, 179, 157, 1)',
            'rgba(88, 214, 141, 1)',
            'rgba(245, 176, 65, 1)',
            'rgba(220, 118, 51, 1)'
          ],
            borderWidth: 1
        }, {
          type: 'line',
          label: 'Expenses',
          // will need to change data variables once it is more clear how this data will be returned
          data: [expense.housing, expense.insurance, expense.transportation, expense.food, expense.savings, expense.utilities, expense.personal],
          fill: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
          responsive: true
      }
});

// script src for chart.js (npm docs arent clear at all on how to pull in the package with a require statement)
/* <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js'></script> */