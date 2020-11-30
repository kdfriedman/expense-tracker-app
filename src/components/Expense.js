import React, { useState } from 'react';

const ExpenseList = (props) => {
  // toggle state using falsy bool as arg for useState handler
  const toggleSelected = (e) => {
    //e.persist();
    const currentTargetId = e.currentTarget.id.slice(
      e.currentTarget.id.length - 1
    );
    props.updateExpenseList((expenseList) => {
      let copiedExpenseList = [...expenseList];
      copiedExpenseList[currentTargetId].isSettled = !copiedExpenseList[
        currentTargetId
      ].isSettled;
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
      <h1>Expense List</h1>
      {props.expenseList.length > 1 &&
        props.expenseList.slice(1).map((expense, i) => {
          return (
            <div
              id={`expense-container-${expense.id}`}
              key={`expense-container-${expense.id}`}
            >
              <div
                key={`${expense.id}-${expense.expenseItems[0]}`}
                className='expense__expense-text'
              >
                {expense.expenseItems[0]}
              </div>
              <div
                key={`${expense.id}-${expense.expenseItems[1]}`}
                className='expense__description-text'
              >
                {expense.expenseItems[1]}
              </div>
              <div
                key={`${expense.id}-${expense.expenseItems[2]}`}
                className='expense__date-text'
              >
                {expense.expenseItems[2]}
              </div>
              <div
                id={`expense-toggle-${expense.id}`}
                className='expense__toggle-container'
                onClick={toggleSelected}
              >
                <div
                  className={`expense__dialog-button ${
                    expense.isSettled ? '' : 'expense__disabled'
                  }`}
                >
                  {expense.isSettled ? 'Ok' : 'No'}
                </div>
              </div>
              <div
                id={`expense_remove-icon-${expense.id}`}
                onClick={(e) => handleRemoveExpense(e, `${expense.id}`)}
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
