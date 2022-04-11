let inputEls = [...document.querySelectorAll('input')]
inputEls.pop()
inputEls.shift()

const postBudget = async (event) => {
    event.preventDefault()

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

    const response = await fetch('/api/budget', {
        method: 'POST',
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
    })
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }

}

document.getElementById('post-budget').addEventListener('submit', postBudget)