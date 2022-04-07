// API call gets current user budget 
const getUserBudget = async () => {
    const budget = await fetch('/api/budget', { credentials: 'include' }).then(response => { return response.json() }).catch(err => console.error(err))
    return budget
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
    return budget.id
}

// Makes API call to save data 
const saveBudget = async () => {
    const budgetId =  await getUserBudget()
    const budgetName = document.getElementById('name').value
    const housing = document.getElementById('housing').value
    const insurance = document.getElementById('insurance').value
    const transportation = document.getElementById('transportation').value
    const food = document.getElementById('food').value
    const savings = document.getElementById('savings').value
    const utilities = document.getElementById('utilities').value
    const personal = document.getElementById('personal').value


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
    }).then(resp => {writeBudget(); return resp.json()}).catch(err => console.error(err))

}

// Edit feature makes read only 
const addeReadOnly = async () => {
    const inputsEls = document.querySelectorAll('.budget-input')
    inputsEls.forEach(element => {
        element.addAttribute('readonly')
    });
}

// Edit feature allows editing on inputs 
const removeReadOnly = async () => {
    const inputsEls = document.querySelectorAll('.budget-input')
    inputsEls.forEach(element => {
        element.removeAttribute('readonly')
    });
}


// event listens for edit and saving 
document.getElementById('budget-edit-btn').addEventListener('click', removeReadOnly)
document.getElementById('budget-save-btn').addEventListener('click', saveBudget)

writeBudget()