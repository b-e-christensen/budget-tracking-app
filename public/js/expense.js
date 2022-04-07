const submitExpense = async(event) => {
    event.preventDefault();

    const nameOfExpense = document.getElementById('nameofexpense').value
    const expenseCategory = document.getElementById('expensecategory').value
    const expenseValue = document.getElementById('costofexpense').value
    const expenseDate = document.getElementById('date').value

    const response = await fetch('/api/expense', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expense_name: nameOfExpense, category: expenseCategory, expense_amount: expenseValue, expense_date: expenseDate})
    })
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.status)
    }
};

document.getElementById("submitexpense").addEventListener("submit", submitExpense);