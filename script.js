let expenses = [];

function addExpense() {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (description === '' || isNaN(amount) || amount <= 0 || category === '') {
        alert('Please enter a valid expense description, amount, and category.');
        return;
    }

    expenses.push({ description, amount, category });
    descriptionInput.value = '';
    amountInput.value = '';
    categorySelect.value = '';

    displayExpenses();
}

function displayExpenses() {
    const showCategorySum = document.getElementById('show-category-sum').checked;

    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    let totalExpense = 0;

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${expense.description} - ₹${expense.amount.toFixed(2)} (${expense.category})`;
        expenseList.appendChild(listItem);

        totalExpense += expense.amount;
    });

    const totalExpenseElement = document.getElementById('total');
    totalExpenseElement.textContent = totalExpense.toFixed(2);

    if (showCategorySum) {
        const categories = calculateCategoryWiseExpense();
        displayCategoricalSum(categories);
    } else {
        // If showCategorySum is false, clear the content of the category-sum-list
        const categorySumList = document.getElementById('category-sum-list');
        categorySumList.innerHTML = '';
    }
}


function calculateCategoryWiseExpense() {
    const categories = {};
    for (const expense of expenses) {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    }
    return categories;
}

function displayCategoricalSum(categorySums) {
    const categorySumList = document.getElementById('category-sum-list');
    categorySumList.innerHTML = ''; // Clear previous content
    for (const category in categorySums) {
        const categorySum = categorySums[category];
        const categorySumItem = document.createElement('div');
        categorySumItem.textContent = `Total ${category} Expense: ₹${categorySum.toFixed(2)}`;
        categorySumList.appendChild(categorySumItem);
    }
}
