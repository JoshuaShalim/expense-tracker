import React, {
  useEffect,
  useState,
} from 'react';

import { suggestCategory } from '../../utils/categorize';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
    description: '',
    merchant: ''
  });

  const [suggested, setSuggested] = useState('Other');
  const [categoryManuallyEdited, setCategoryManuallyEdited] = useState(false);

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
    if (key === 'category') setCategoryManuallyEdited(true);
  };

  // Update suggested category whenever description or merchant changes
  useEffect(() => {
    const s = suggestCategory(expense.description, expense.merchant);
    setSuggested(s);

    // If category not manually edited, keep it in sync with suggestion
    if (!categoryManuallyEdited) handleChange('category', s);
  }, [expense.description, expense.merchant]); // eslint-disable-line

  const handleUseSuggestion = () => {
    handleChange('category', suggested);
    setCategoryManuallyEdited(false);
  };

  const handleSubmit = () => {
    onAddExpense(expense);
    // reset fields
    setExpense({
      category: '',
      amount: '',
      date: '',
      icon: '',
      description: '',
      merchant: ''
    });
    setSuggested('Other');
    setCategoryManuallyEdited(false);
  };

  return (
    <div className="space-y-3">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={expense.description}
        onChange={({ target }) => handleChange('description', target.value)}
        label="Description"
        placeholder="Movie night, Coffee, etc"
        type="text"
      />

      <Input
        value={expense.merchant}
        onChange={({ target }) => handleChange('merchant', target.value)}
        label="Merchant"
        placeholder="Starbucks, Uber, etc"
        type="text"
      />

      <div className="relative">
        <Input
          value={expense.category}
          onChange={({ target }) => handleChange('category', target.value)}
          label="Category"
          placeholder="Category"
          type="text"
        />
        {/* Highlight suggestion dynamically */}
        {expense.category !== suggested && (
          <div className="absolute top-0 right-0 text-sm text-gray-500 italic mt-1">
            Suggested: <strong>{suggested}</strong>
            <button
              type="button"
              onClick={handleUseSuggestion}
              className="ml-2 underline text-xs"
            >
              Use
            </button>
          </div>
        )}
      </div>

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder="1-10000000"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
