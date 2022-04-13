
// API call gets current user budget 
const getUserBudget = async () => {
    const budget = await fetch('/api/budget', { credentials: 'include' }).then(response => { return response.json() }).catch(err => console.error(err))
    return budget
}

// API Get User Income 
const getUserIncome = async () => {
    const income = await fetch('/api/income', { credentials: 'include' }).then(response => { return response.json() }).catch(err => console.error(err))
    // const salary = income[0].salary
    return income
}

// Function to return decimal for percent calc
const decimal = async (num) => {
    let toInt = Number(num)
    if (num.length === 1 || num.length === 2) {
        return toInt /= Math.pow(10, 2);
    } else {
        return 1
    }
}

// Function to calculate percentage from income
const calcAmount = async () => {
    const salary = await getUserIncome()
    const monthlyIncome = salary[0].salary
    const budgetRe = await getUserBudget()
    const arry = Object.keys(budgetRe[0])
    for (let index = 2; index < arry.length - 2; index++) {
        const element = arry[index];
        const budgetElValue = document.getElementById(element).value
        const dec = await decimal(budgetElValue)
        const elId = element + '-amount'
        const budgetAmountEl = document.getElementById(elId)
        const dollarAmount = dec * monthlyIncome
        budgetAmountEl.innerText = '$ ' + String(dollarAmount)
    }
}


// Writes user budget to page
const writeBudget = async () => {
    const budgetRe = await getUserBudget()
    const budget = budgetRe[0]
    document.getElementById('name').value = budget.name
    document.getElementById('housing').value = budget.housing
    document.getElementById('insurance').value = budget.insurance
    document.getElementById('transportation').value = budget.transportation
    document.getElementById('food').value = budget.food
    document.getElementById('savings').value = budget.savings
    document.getElementById('utilities').value = budget.utilities
    document.getElementById('personal').value = budget.personal
    calcAmount()
    return budget.id
}

// Writes user income to the page
const writeIncome = async () => {
    const monthlyIncome = await getUserIncome()
    document.getElementById('income').value = monthlyIncome[0].salary
}

// Makes API call to save data 
const saveBudget = async () => {
    const budgetId = await getUserBudget()
    const budgetName = document.getElementById('name').value
    const housing = document.getElementById('housing').value
    const insurance = document.getElementById('insurance').value
    const transportation = document.getElementById('transportation').value
    const food = document.getElementById('food').value
    const savings = document.getElementById('savings').value
    const utilities = document.getElementById('utilities').value
    const personal = document.getElementById('personal').value

    const notOver = await checkTotal()
    if(!notOver) {
        alert('Total budget value must be under 100%')
        return
    }

    const b = await fetch(`/api/budget/${budgetId[0].id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            budget_name: budgetName,
            housing: housing,
            insurance: insurance,
            transportation: transportation,
            food: food,
            savings: savings,
            utilities: utilities,
            personal: personal
        })
    }).then(resp => { writeBudget(); return resp.json() }).catch(err => console.error(err))
}

const saveIncome = async () => {
    const salary = document.getElementById('income').value
    const income = await getUserIncome()
    const response = await fetch(`/api/income/${income[0].id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salary })
    }).then(resp => { writeIncome(); return resp.json() }).catch(err => console.error(err))
}

// event listens for edit and saving 
document.getElementById('income-save-btn').addEventListener('click', saveIncome)
document.getElementById('budget-save-btn').addEventListener('click', saveBudget)
document.getElementById('budget-refresh-btn').addEventListener('click', writeBudget)

const inputEls = document.querySelectorAll('.budget-input')
inputEls.forEach(element => {
    element.addEventListener('change', calcAmount)
});

writeIncome()
writeBudget()