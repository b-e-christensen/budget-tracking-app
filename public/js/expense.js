// const { contentSecurityPolicy } = require("helmet");


const submitExpense = async(event) => {
    event.preventDefault();

    const nameOfExpense = document.getElementById('nameofexpense');
    const expenseCategory = document.getElementById('expensecategory');
    const expenseValue = document.getElementById('costofexpense');
    const expenseDate = document.getElementById('date');
    // const userStatus = document.getElementById('status');
    // console.log(userStatus.textContent);
    await fetch('/api/expense', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({expense_name: nameOfExpense.value, category: expenseCategory.value, expense_amount: expenseValue.value, date: expenseDate.value})
    });

    // userStatus.textContent = `${nameOfExpense.value} has been submitted successfully!`;
    nameOfExpense.value = "";
    expenseCategory.value = "";
    expenseValue.value = "";
    expenseDate.value = "";
    location.reload()
};

document.getElementById("submitexpense").addEventListener("submit", submitExpense);
// document.getElementById("addexpense").addEventListener("submit", addExpense);



//add a new function here that would generate a row under the correct columns to add the info to the webpage when the button is pushed

