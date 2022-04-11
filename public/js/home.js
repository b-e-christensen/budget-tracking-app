
async function getExpenses() {
    const fetchRequest = await fetch('/api/expense', { credentials: 'include' })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        let housing = 0
        let insurance = 0
        let transportation = 0
        let food = 0
        let savings = 0
        let utilities = 0
        let personal = 0
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            housing += element.housing
            insurance += element.insurance
            transportation += element.transportation
            food += element.food
            savings += element.savings
            utilities += element.utilities
            personal += element.personal
        }
         let userExpense = {
            housing,
            insurance,
            transportation,
            food,
            savings,
            utilities,
            personal,
       }
       return userExpense
   })
   return fetchRequest
}


async function getUserIncome() {
  const fetchRequest = await fetch('/api/income', { credentials: 'include' })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    return Number(data[0].salary)
    })
    return fetchRequest
}

async function getUserBudget() {
  const fetchRequest = await fetch('/api/budget', { credentials: 'include' })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let housing = data[0].housing
      let insurance = data[0].insurance
      let tranportation = data[0].transportation
      let food = data[0].food
      let savings = data[0].savings
      let utilities = data[0].utilities
      let personal = data[0].personal
      let userBudget = {
        housing,
        insurance,
        tranportation,
        food,
        savings,
        utilities,
        personal,
      }
      return userBudget
    })
    return fetchRequest
}

async function budgetPieChart() {

  let budget = await getUserBudget()

  let budgetSum = 0
  for(const key in budget) {
    budgetSum += budget[key]
  }

  let budgetData = []
  if (budgetSum < 100) {
    let leftOver = 100 - budgetSum
    budgetData = [leftOver, budget.housing, budget.insurance, budget.tranportation, budget.food, budget.savings, budget.utilities, budget.personal]
  } else {
    budgetData = [budget.housing, budget.insurance, budget.tranportation, budget.food, budget.savings, budget.utilities, budget.personal]
  }

const ctx = document.getElementById('pie-chart')
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            'Non-allocated Funds',
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
            data: budgetData,
           backgroundColor: [
            'rgb(152, 151, 169, 0.35)',
            'rgba(236, 112, 99, 0.35)',
            'rgba(165, 105, 189, 0.35)',
            'rgba(93, 173, 226, 0.35)',
            'rgba(69, 179, 157, 0.35)',
            'rgba(88, 214, 141, 0.35)',
            'rgba(245, 176, 65, 0.35)',
            'rgba(220, 118, 51, 0.35)'
          ],
          borderColor: [
            'rgb(152, 151, 169, 1)',
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
}
async function setExpenseData() {
let expense = await getExpenses()
let income = await getUserIncome()
let budget = await getUserBudget()

const ctxOverlay = document.getElementById('double-chart');
const doubleChart = new Chart(ctxOverlay, {
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
          data: [income * budget.housing / 100, income * budget.insurance / 100, income * budget.tranportation / 100, income * budget.food / 100, income * budget.savings / 100, income * budget.utilities / 100, income * budget.personal / 100],
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
          // will need to create a function to add up each individual expense
          data: [expense.housing, expense.insurance, expense.transportation, expense.food, expense.savings, expense.utilities, expense.personal],
          fill: true,
          borderColor: 'rgb(54, 162, 235)'
        }]
      },
      options: {
          responsive: true
      }
}); 
}

budgetPieChart()
setExpenseData()