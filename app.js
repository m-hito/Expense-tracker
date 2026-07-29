document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput = document.getElementById("expense-name")
    const expenseAmountInput = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalAmountDisplay = document.getElementById("total-amount")

    let expenses = JSON.parse(localStorage.getItem("expenses")) || []
    renderExpenses()

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
                total: total
            }
            expenses.push(newExpense)
            saveToLocalStorage()
            renderExpenses()
            updateTotalAmount()
            expenseNameInput.value = ""
            expenseAmountInput.value = ""
        }
        console.log(calculateTotal());
    })

    function renderExpenses(params) {
        expenseList.innerHTML = ""
        console.log(expenses)
        expenses.forEach((expense) => {
            const expenseLi = document.createElement("li")
            expenseLi.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}"> Delete </button>
            `
            expenseList.appendChild(expenseLi)
            
        })
        updateTotalAmount()
    }
    function updateTotalAmount() {
        total = calculateTotal()
        totalAmountDisplay.innerText = total.toFixed(2)
    }
    function calculateTotal() {
        return expenses.reduce((sum, amount) => sum + amount.amount, startValue = 0);
    }
    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"))
            console.log(typeof expenseId);
            
            const listItem = expenses.findIndex((e) => e.id === !expenseId)
            expenses.splice(listItem, 1)
            renderExpenses()
            updateTotalAmount()
            saveToLocalStorage()
        }
    })
})