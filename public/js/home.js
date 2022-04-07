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
       console.log(userExpense.food)
       return userExpense
   })
   return fetchRequest
}
