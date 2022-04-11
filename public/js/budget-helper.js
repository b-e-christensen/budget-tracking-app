// Function to ensure doesnt go over 100%
const checkTotal = async() => {
    let total = 0
    for (let index = 1; index < inputEls.length; index++) {
        const element = Number(inputEls[index].value);
        console.log(element)
        total += element
    }
    if(total > 100) {
        return false
    } else {
        return true
    }
}