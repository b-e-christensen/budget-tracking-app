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

async function sendDates() {
  const start = document.getElementById('start-date').value
  const end = document.getElementById('end-date').value

  const response = await fetch('/api/expense/date', {
    method: 'POST',
    body: JSON.stringify({ start, end }),
    headers: { 'Content-Type': 'application/json' },
  })
  if(response.ok) {
    console.log('response ok')
  } else {
    console.log(response.statusText)
  }
}

document.getElementById('expenses-by-date').addEventListener('submit', sendDates)
document.getElementById("submitexpense").addEventListener("submit", submitExpense);
// document.getElementById("addexpense").addEventListener("submit", addExpense);



//add a new function here that would generate a row under the correct columns to add the info to the webpage when the button is pushed

$(function () {
  // Get the text for the Handlebars template from the script element.
  var templateText = $("#tableTemplate").html();
  
  // Compile the Handlebars template.
  var tableTemplate = Handlebars.compile(templateText);

	// Define an array of people.
  var people = [
    { "Id": 1, "First Name": "Anthony", "Last Name": "Nelson", "Age": 25 },
    { "Id": 2, "First Name": "Helen", "Last Name": "Garcia", "Age": 32 },
    { "Id": 3, "First Name": "John", "Last Name": "Williams", "Age": 48 }
  ];
  
  // Evaluate the template with an array of people and set the HTML
  // for the people table.
  $("#people").html(tableTemplate({ array: people }));
  
  // Deine an array of smart phones.
  var smartPhones = [
  	{ "Manufacturer": "Apple", "Phone": "iPhone", "Operating System": "iOS" },
    { "Manufacturer": "Samsung", "Phone": "Galaxy", "Operating System": "Android" },
    { "Manufacturer": "Nokia", "Phone": "Lumia", "Operating System": "Windows" }
  ];
  
  // Evaluate the same table template with an array of smart phoes and set the HTML
  // for the smartphones table.
  $("#smartphones").html(tableTemplate({ array: smartPhones }));
});