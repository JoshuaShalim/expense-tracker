import React, { useState } from 'react';

import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddExpenseForm = ({onAddExpense}) => {
  const [expense, setExpense] = useState({
    category:"",
    amount:"",
    date:"",
    icon:"",
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
    return (
        <div>

            <EmojiPickerPopup
            icon= {expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon) }
            />
            <Input
            value={expense.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Income Category"
            placeholder="Rent, Groceries, etc"
            type="text"
            />
            <Input
            value={expense.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            placeholder="1-10000000"
            type="number"
            />
            <Input
            value={expense.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
            />
            <div className="">
                <button
                    type="button"
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense) }
                >
                    Add Expense
                </button>
            </div>
        </div>
  )
}

export default AddExpenseForm