import React, { useState } from 'react';

const ExpenseList = (props) => {
  // toggle state using falsy bool as arg for useState handler
  const toggleSelected = (e) => {
    e.persist();
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
                className='expense-list__expense-text'
              >
                {expense.expenseItems[0]}
              </div>
              <div
                key={`${expense.id}-${expense.expenseItems[1]}`}
                className='expense-list__description-text'
              >
                {expense.expenseItems[1]}
              </div>
              <div
                key={`${expense.id}-${expense.expenseItems[2]}`}
                className='expense-list__date-text'
              >
                {expense.expenseItems[2]}
              </div>
              <div
                id={`expense-toggle-${expense.id}`}
                className='expense-list__toggle-container'
                onClick={toggleSelected}
              >
                <div
                  className={`expense-list__dialog-button ${
                    expense.isSettled ? '' : 'disabled'
                  }`}
                >
                  {expense.isSettled ? 'Ok' : 'No'}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ExpenseList;
