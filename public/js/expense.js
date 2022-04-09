// const { contentSecurityPolicy } = require("helmet");


const submitExpense = async(event) => {
    event.preventDefault();

    const nameOfExpense = document.getElementById('nameofexpense');
    const expenseCategory = document.getElementById('expensecategory');
    const expenseValue = document.getElementById('costofexpense');
    const expenseDate = document.getElementById('date');
    const userStatus = document.getElementById('status');
    // console.log(userStatus.textContent);
    await fetch('/api/expense', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({expense_name: nameOfExpense.value, category: expenseCategory.value, expense_amount: expenseValue.value, date: expenseDate.value})
    });

    userStatus.textContent = `${nameOfExpense.value} has been submitted successfully!`;
    nameOfExpense.value = "";
    expenseCategory.value = "";
    expenseValue.value = "";
    expenseDate.value = "";
    
};





document.getElementById("submitexpense").addEventListener("submit", submitExpense);
// document.getElementById("addexpense").addEventListener("submit", addExpense);



//add a new function here that would generate a row under the correct columns to add the info to the webpage when the button is pushed

function getFromLocal () {
    tableBody = $('#table-body');
    retrievedName = JSON.parse(localStorage.getItem('name'))
    retrievedNotes = JSON.parse(localStorage.getItem('category'))
    retrievedTraining1 = JSON.parse(localStorage.getItem('cost'))
    retrievedDate1 = JSON.parse(localStorage.getItem('date'))

    if(retrievedName !== null && retrievedName !== '') {
      
    let expenseRowEl = $('<tr>');
    let expenseNameTdEl = $('<td>').addClass('p-2').text(retrievedName);
    let expenseCategoryTdEl = $('<td>').addClass('p-2').text(retrievedCategory);
    let expenseCostTdEl = $('<td>').addClass('p-2').text(retrievedCost);
    let expenseDateTdEl = $('<td>').addClass('p-2').text(retrievedDate);
   
    
  expenseRowEl.append(
    expenseNameTdEl,
    expenseCategoryTdEl,
    expenseCostTdEl,
    expenseDateTdEl,
    );
  
    tableBody.append(expenseRowEl)
  }
  }
  
function setexpenseData(){
  let nameInput = document.getElementById('exp-name').value;
  //notes local store
  let categoryInput = document.getElementById('exp-category').value;
  //training option 1 local store
  let costInput = document.getElementById('exp-cost').value;
  //date local store
  let dateInput = document.getElementById('exp-date').value;

  
    localStorage.setItem('name', JSON.stringify(nameInput));
    localStorage.setItem('category', JSON.stringify(categoryInput));
    localStorage.setItem('cost', JSON.stringify(costInput));
    localStorage.setItem('date', JSON.stringify(dateInput));;
  }
//   function printModalInfo () {
  
//   //name local store
//   let nameInput = document.getElementById('exp-name').value;
//   //category local store
//   let categoryInput = document.getElementById('exp-category').value;
//   //cost local store
//   let costInput = document.getElementById('exp-cost').value;
//   //date  local store
//   let dateInput = document.getElementById('emp-date').value;
  
//     let expenseRowEl = $('<tr>');
//     let expenseNameTdEl = $('<td>').addClass('p-2').text(nameInput);
//     let expenseCategoryTdEl = $('<td>').addClass('p-2').text(noteInput);
//     let expenseCostTdEl = $('<td>').addClass('p-2').text(trainInput1);
//     let expenseDateTdEl = $('<td>').addClass('p-2').text(dateInput1);

  
//   expenseRowEl.append(
//     expenseNameTdEl,
//     expenseCategoryTdEl,
//     expenseCostTdEl,
//     expenseDateTdEl,
//     );
  
//     tableBody.append(expenseRowEl)
  
//   }