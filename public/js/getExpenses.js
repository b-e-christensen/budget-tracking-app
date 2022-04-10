class Expense {
    constructor(name, category, value, date, id) {
        this.name = name,
        this.category = category,
        this.value = value,
        this.date = date,
        this.id = id
    }
}

async function editExpense() {
    const expenseId = this.getAttribute('value')
    const tableRow = document.getElementById('tr' + expenseId)
    const expense_name = tableRow.children[0].children[0].children[0].value
    const category = tableRow.children[1].children[0].value
    const expense_amount = tableRow.children[2].children[0].value
    const date = new Date (tableRow.children[3].children[0].value)
    console.log(category)
    await fetch(`/api/expense/${expenseId}`, {
        method: 'PUT',
        body: JSON.stringify({ expense_name, category, expense_amount, date }),
        headers: { 'Content-Type': 'application/json'},
    })
    location.reload()
}

async function deleteExpense() {
    const expenseId = this.getAttribute('value')
    const tableRow = document.getElementById('tr' + expenseId)
    await fetch(`/api/expense/${expenseId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
    })
    location.reload()
}

async function expensesOnPageLoad(data, arr) {

    const generatedTableRow = document.querySelectorAll('.generated-tr')
    generatedTableRow.forEach(tableRow => {
        tableRow.remove();
      });

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const newDate = element.expenseDate.split('-')[0] + '-' + element.expenseDate.split('-')[1] + '-' + element.expenseDate.split('-')[2][0] + element.expenseDate.split('-')[2][1]

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
    tableRow.setAttribute('id', 'tr' + param5)
    tableRow.classList.add('generated-tr')
    table.appendChild(tableRow)

    const col1 = document.createElement('td')
    col1.classList.add('generated-td')
    const form1 = document.createElement('form')
    const input1 = document.createElement('input')
    input1.setAttribute('value', param1)
    tableRow.appendChild(col1)
    col1.appendChild(form1)
    form1.appendChild(input1)


    const col2 = document.createElement('td')
    col2.classList.add('generated-td')
    const select = document.createElement('select')

    const option1 = document.createElement('option')
    option1.setAttribute('value', 'housing')
    option1.textContent = 'Housing'

    const option2 = document.createElement('option')
    option2.setAttribute('value', 'insurance')
    option2.textContent = 'Inusurance'

    const option3 = document.createElement('option')
    option3.setAttribute('value', 'transportation')
    option3.textContent = 'Transportation'

    const option4 = document.createElement('option')
    option4.setAttribute('value', 'food')
    option4.textContent = 'Food'

    const option5 = document.createElement('option')
    option5.setAttribute('value', 'savings')
    option5.textContent = 'Savings'

    const option6 = document.createElement('option')
    option6.setAttribute('value', 'utilities')
    option6.textContent = 'Utilities'

    const option7 = document.createElement('option')
    option7.setAttribute('value', 'personal')
    option7.textContent = 'Personal'

    switch (param2) {
        case 'housing':
        option1.setAttribute('selected', 'selected')
        break;
        case 'insurance':
        option2.setAttribute('selected', 'selected')
        break;
        case 'transportation':
        option3.setAttribute('selected', 'selected')
        break;
        case 'food':
        option4.setAttribute('selected', 'selected')
        break;
        case 'savings':
        option5.setAttribute('selected', 'selected')
        break;
        case 'utilities':
        option6.setAttribute('selected', 'selected')
        break;
        case 'personal':
        option7.setAttribute('selected', 'selected')
        break;
    }
    tableRow.appendChild(col2)
    col2.appendChild(select)
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    select.appendChild(option4)
    select.appendChild(option5)
    select.appendChild(option6)
    select.appendChild(option7)

    const col3 = document.createElement('td')
    col3.classList.add('generated-td')
    const input3 = document.createElement('input')
    input3.setAttribute('value', param3)
    tableRow.appendChild(col3)
    col3.appendChild(input3)

    const col4 = document.createElement('td')
    col4.classList.add('generated-td')
    const input4 = document.createElement('input')
    input4.setAttribute('type', 'date')
    input4.setAttribute('value', param4)
    tableRow.appendChild(col4)
    col4.appendChild(input4)

    const col5 = document.createElement('td')
    col5.classList.add('generated-td')
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.setAttribute('value', param5)
    editButton.addEventListener('click', editExpense)
    tableRow.appendChild(col5)
    col5.appendChild(editButton)

    const col6 = document.createElement('td')
    col6.classList.add('generated-td')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.setAttribute('value', param5)
    deleteButton.addEventListener('click', deleteExpense)
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

async function getExpensesByDate() {

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

async function getExpensesByDateForm(e) {
    e.preventDefault()
  
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

  document.getElementById('expenses-by-date').addEventListener('submit', getExpensesByDateForm)

let startTime = document.getElementById('start-date').value
let endTime = document.getElementById('end-date').value


  if(startTime && endTime) {
        getExpensesByDate()
  } else {
        getExpenses() 
  }
