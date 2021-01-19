import React from 'react';
import PropTypes from 'prop-types';

const ExpenseList = (props) => {

  // toggle state using falsy bool as arg for useState handler
  const toggleSelected = (e) => {
    const targetElement = e.target.closest('.expense__toggle-container') || null;
    const targetId = targetElement.id ? parseInt(targetElement.id.slice(targetElement.id.length - 1)) : null;

    if (!targetElement || !targetId) return console.error('expense toggle container element is either null or event target element does not have an ID');

    props.updateExpenseList((expenseList) => {
      let copiedExpenseList = [...expenseList];

      const targetIndex = copiedExpenseList.findIndex(prop => prop.id === targetId);
      copiedExpenseList[targetIndex].isSettled = !copiedExpenseList[targetIndex].isSettled;
      return copiedExpenseList;
    });
  };

  const handleRemoveExpense = (e, containerId) => {
    props.updateExpenseList((expenseList) => {
      const updatedExpenseList = expenseList.filter(
        (expense) => expense.id !== parseInt(containerId)
      );
      return [...updatedExpenseList];
    });
  };

  return (
    <>
      {props.expenseList.length > 1 &&
        props.expenseList.slice(1).map((expense) => {
          return (
            <div
              id={`expense-container-${expense.id}`}
              className='expense__container'
              key={`expense-container-${expense.id}`}
            >
              <div className='expense__expense-container'>
                <div className='expense__label'>Expense:</div>
                <div
                  key={`${expense.id}-${expense.expenseItems[0]}`}
                  className='expense__expense-text'
                >
                  {expense.expenseItems[0]}
                </div>
              </div>
              <div className='expense__description-container'>
                <div className='expense__label'>Description:</div>
                <div
                  key={`${expense.id}-${expense.expenseItems[1]}`}
                  className='expense__description-text'
                >
                  {expense.expenseItems[1]}
                </div>
              </div>
              <div className='expense__date-container'>
                <div className='expense__label'>Date:</div>
                <div
                  key={`${expense.id}-${expense.expenseItems[2]}`}
                  className='expense__date-text'
                >
                  {expense.expenseItems[2]}
                </div>
              </div>
              <div className='expense__toggle'>
                <div className='expense__label'>Settled Status:</div>
                <div
                  id={`expense-toggle-${expense.id}`}
                  className='expense__toggle-container'
                  onClick={toggleSelected}
                  data-analytics-payload={`{
                    "event": "on_click", 
                    "element_data_value": "expense toggle - test", 
                    "element_type":"div", 
                    "element_class": "expense__toggle-container", 
                    "element_id": "expense-toggle-test",
                    "component_name": "Expense"
                  }`}
                >
                  <div
                    className={`expense__dialog-button ${
                      expense.isSettled ? '' : 'expense__disabled'
                    }`}
                  >
                    {expense.isSettled ? 'Ok' : 'No'}
                  </div>
                </div>
              </div>
              <div
                id={`expense_remove-icon-${expense.id}`}
                className='expense__remove-icon'
                onClick={(e) => handleRemoveExpense(e, `${expense.id}`)}
                data-analytics-payload={`{
                  "event": "on_click", 
                  "element_data_value": "remove expense - x button click", 
                  "element_type":"div", 
                  "element_class": "expense__remove-icon", 
                  "element_id": "expense_remove-icon-${expense.id}",
                  "component_name": "Expense"
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                >
                  <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z' />
                </svg>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ExpenseList;

ExpenseList.propTypes = {
  updateExpenseList: PropTypes.func.isRequired,
  expenseList: PropTypes.array.isRequired
};
