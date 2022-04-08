const postIncome = async (event) => {
    event.preventDefault();

    const salary = document.getElementById('monthly-income').value
    const response = await fetch('/api/income', {
        method: 'POST',
        body: JSON.stringify({ salary }),
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        document.location.replace('/first-budget')
    } else {
        alert(response.statusText)
    }
}

document.getElementById('post-income').addEventListener('submit', postIncome)