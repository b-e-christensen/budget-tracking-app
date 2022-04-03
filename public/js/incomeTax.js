
function deductFederalTax(salary) {
    // Subtracts standard single deductible from salary to get taxable income
    let taxableIncome = salary - 12950
    let netIncome

    if (taxableIncome < 0){
        netIncome = salary
    } else if (taxableIncome <= 10275) {
        let tax = taxableIncome * .1
        console.log('tax ----> ' + tax);
        netIncome = salary - tax
    } else if (10276 <= taxableIncome && taxableIncome <= 41775) {
        let previousBrackets = 1027.5
        taxableIncome -= 10276
        let tax = taxableIncome * .12
        netIncome = salary - (tax + previousBrackets)
    } else if (41776 <= taxableIncome && taxableIncome <= 89075) {
        let previousBrackets = 4807.5
        taxableIncome -= 41776
        let tax = taxableIncome * .22
        netIncome = salary - (tax + previousBrackets)
    } else if (89076 <= taxableIncome && taxableIncome <= 170050) {
        let previousBrackets = 15213.5
        taxableIncome -= 89076
        let tax = taxableIncome * .24
        netIncome = salary - (tax + previousBrackets)
    } else if (170051 <= taxableIncome && taxableIncome <= 215950) {
        let previousBrackets = 34647.5
        taxableIncome -= 170051
        let tax = taxableIncome * .32
        netIncome = salary - (tax + previousBrackets)
    } else if (215951 <= taxableIncome && taxableIncome <= 539900) {
        let previousBrackets = 49335.5
        taxableIncome -= 215951
        let tax = taxableIncome * .35
        netIncome = salary - (tax + previousBrackets)
    } else {
        let previousBrackets = 162718
        taxableIncome -= 539901
        let tax = taxableIncome * .37
        netIncome = salary - (tax + previousBrackets)
    }

    return netIncome
}
