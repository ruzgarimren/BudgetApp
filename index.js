let total_amount = document.getElementById("total-amount");
let user_amount = document.getElementById("user-amount");
const check_amount_button = document.getElementById("check-amount");
const total_amount_button = document.getElementById("total-amount-button");
const product_title = document.getElementById("product-title");
const error_message = document.getElementById("budget-error");
const product_title_error = document.getElementById("product-title-error");
const product_cost_error = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditure_value = document.getElementById("expenditure-value");
const balance_amount = document.getElementById("balance-amount");
const list = document.getElementById("list");
const expense_category = document.getElementById("expense-category");
let temp_amount = 0;

check_amount_button.addEventListener("click", () => {
    if (!user_amount.value || !product_title.value) {
        product_title_error.classList.remove("hide");
        return false;
    }
    disable_buttons(false);

    let expenditure = parseInt(user_amount.value);
    let sum = parseInt(expenditure_value.innerText) + expenditure;
    expenditure_value.innerText = sum;
    const total_balance = temp_amount - sum;
    balance_amount.innerText = total_balance;
    list_creator(product_title.value, user_amount.value, expense_category.value);
    product_title_error.value = "";
    user_amount.value = "";
});


const disable_buttons = (bool) => {
    let edit_buttons = document.getElementsByClassName("edit");
    Array.from(edit_buttons).forEach((element) => {
        element.disabled = bool;
    });
};


const modify_element = (element, edit = false) => {
    let parent_div = element.parentElement;
    let current_balance = balance_amount.innerText;
    let current_expense = expenditure_value.innerText;
    let parent_amount = parent_div.querySelector(".amount").innerText;
    if (edit) {
        let parent_text = parent_div.querySelector(".product").innerText;
        product_title.value = parent_text;
        user_amount.value = parent_amount;
        disable_buttons(true);
    }

    balance_amount.innerText = parseInt(current_balance) + parseInt(parent_amount);
    expenditure_value.innerText = parseInt(current_expense) - parseInt(parent_amount);
    parent_div.remove();
};


const list_creator = (expense_name, expense_value) => {
    let sub_list_content = document.createElement("div");
    sub_list_content.classList.add("sublist-content", "flex-space");
    list.appendChild(sub_list_content);
    sub_list_content.innerHTML = `<p class="product">${expense_name}</p><p class="amount">${expense_value}</p>`;
    let edit_button = document.createElement("button");
    edit_button.classList.add("fa-solid", "fa-pen-to-square", "edit");
    edit_button.style.fontSize = "1.2em";
    edit_button.addEventListener("click", () => {
        modify_element(edit_button, true);
    });
    let delete_button = document.createElement("button");
    delete_button.classList.add("fa-solid", "fa-trash-can", "delete");
    delete_button.style.fontSize = "1.2em";
    delete_button.addEventListener("click", () => {
        modify_element(delete_button);
    });
    sub_list_content.appendChild(edit_button);
    sub_list_content.appendChild(delete_button);
    document.getElementById("list").appendChild(sub_list_content);
};


check_amount_button.addEventListener("click", () => {
    if (!user_amount.value || !product_title.value) {
        product_title_error.classList.remove("hide");
        return false;
    }
    disable_buttons(false);

    let expenditure = parseInt(user_amount.value);
    let sum = parseInt(expenditure_value.innerText) + expenditure;
    expenditure_value.innerText = sum;
    const total_balance = temp_amount - sum;
    balance_amount.innerText = total_balance;
    list_creator(product_title.value, user_amount.value);
    product_title_error.value = "";
    user_amount.value = "";
});


const chartContainer = document.getElementById("expense-chart").getContext("2d");
const expenseChart = new Chart(chartContainer, {
    type: "doughnut",
    data: {
        labels: ["Food", "Utilities", "Entertainment", "Others"],
        datasets: [{
            data: [200, 100, 80, 150],
            backgroundColor: ["#FF847C", "#FFD700", "#8AC926", "#1982C4"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: true,
            animateScale: true
        },
        legend: {
            position: "bottom",
            labels: {
                fontColor: "#363D55",
                fontSize: 14,
                padding: 10
            }
        }
    }
});
