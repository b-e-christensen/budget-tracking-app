// pass in the array of expenses from GET requesting user data. 

const addExpenses = (expense) => {
    let housing = 0
    let insurance = 0
    let transportation = 0
    let food = 0
    let savings = 0
    let utilities = 0
    let personal = 0

    for (let i = 0; i < expense.length; i++) {
        const element = expense[i];
        housing = element.housing + housing
        insurance += element.insurance
        transportation += element.transportation
        food += element.food
        savings += element.savings
        utilities += element.utilities
        personal += element.personal        
    }
        let expenses = {
         housing,
         insurance,
         transportation,
         food,
         savings,
         utilities,
         personal,
    }
    return expenses
}

async