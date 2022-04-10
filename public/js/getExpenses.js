class Expense {
    constructor(name, category, value, date, id) {
        this.name = name,
        this.category = category,
        this.value = value,
        this.date = date,
        this.id = id
    }
}

async function expensesOnPageLoad(data, arr) {

    const generatedTableRow = document.querySelectorAll('.generated-tr')
    const generatedTableData = document.querySelectorAll('.generated-td')
    generatedTableRow.forEach(tableRow => {
        tableRow.remove();
      });
    generatedTableData.forEach(tableData => {
        tableData.remove()
    })

    for (let i = 0; i < data.length; i++) {
        console.log('for loop')
        const element = data[i];
        const newDate = element.expenseDate.split('-')[1] + '/' + element.expenseDate.split('-')[2][0] + element.expenseDate.split('-')[2][1] + '/' + element.expenseDate.split('-')[0] 

        if (element.housing) {
            arr.push(new Expense(element.name, 'housing', element.housing, newDate, element.id))
        } else if (element.insurance) {
            arr.push(new Expense(element.name, 'insurance', element.insurance, newDate, element.id))
        } else if (element.transportation) {
            arr.push(new Expense(element.name, 'transportation', element.transportation, newDate, element.id))
        } else if (element.food) {
            arr.push(new Expense(element.name, 'food', element.food, newDate, element.id))
        } else if (element.savings) {
            arr.push(new Expense(element.name, 'savings', element.savings, newDate, element.id))
        } else if (element.utilities) {
            arr.push(new Expense(element.name, 'utilities', element.utilities, newDate, element.id))
        } else if (element.personal) {
            arr.push(new Expense(element.name, 'personal', element.personal, newDate, element.id))
        }
        
    }
}

function newRow(param1, param2, param3, param4, param5) {

    const table = document.getElementById('expenses-table')
    const tableRow = document.createElement('tr')
    tableRow.classList.add('generated-tr')
    table.appendChild(tableRow)
    const col1 = document.createElement('td')
    col1.classList.add('generated-td')
    col1.textContent = param1
    tableRow.appendChild(col1)
    const col2 = document.createElement('td')
    col2.classList.add('generated-td')
    col2.textContent = param2
    tableRow.appendChild(col2)
    const col3 = document.createElement('td')
    col3.classList.add('generated-td')
    col3.textContent = param3
    tableRow.appendChild(col3)
    const col4 = document.createElement('td')
    col4.classList.add('generated-td')
    col4.textContent = param4
    tableRow.appendChild(col4)

    const col5 = document.createElement('td')
    col5.classList.add('generated-td')
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.setAttribute('value', param5)
    tableRow.appendChild(col5)
    col5.appendChild(editButton)

    const col6 = document.createElement('td')
    col6.classList.add('generated-td')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.setAttribute('value', param5)
    tableRow.appendChild(col6)
    col6.appendChild(deleteButton)
}

async function getExpenses() {
    let expensesArr = []
    const fetchRequest = await fetch('/api/expense', { credentials: 'include' })
      .then(function (response) {
        return response.json();

      }).then(function (data) {
        expensesOnPageLoad(data, expensesArr)

   }).then(function () {
       expensesArr.forEach(expense => {
           newRow(expense.name, expense.category, expense.value, expense.date, expense.id)
       });
   })
   return fetchRequest
}

// getExpenses()

async function getExpensesByDate(event) {
    event.preventDefault()
    let expensesArr =[]

    const start = document.getElementById('start-date').value
    const end = document.getElementById('end-date').value
    const startDate = new Date(start)
    const endDate = new Date(end)

    const fetchRequest = await fetch(`/api/expense/date/${startDate}/${endDate}`, {
      headers: { 'Content-Type': 'application/json' },
    }).then(function (response) {
        return response.json();

      }).then(function (data) {
        expensesOnPageLoad(data, expensesArr)

   }).then(function () {
       expensesArr.forEach(expense => {
           newRow(expense.name, expense.category, expense.value, expense.date, expense.id)
       });
   })
   return fetchRequest
  }

  document.getElementById('expenses-by-date').addEventListener('submit', getExpensesByDate)

  getExpenses()