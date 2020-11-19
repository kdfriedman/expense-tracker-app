import React, { useState, useEffect } from 'react';
import AddExpense from './AddExpense';
import Expense from './Expense';

export const HomeMain = (props) => {
  // check if localStorage has expenseList, otherwise initialize state with empty object
  const initExpenseList = () =>
    JSON.parse(window.localStorage.getItem('expenseList')) || [
      {
        id: 0,
        expenseItems: [],
        isSettled: false,
      },
    ];
  // set state for expense list and settled expense
  const [expenseList, updateExpenseList] = useState(initExpenseList);

  // store in local storage
  useEffect(() => {
    window.localStorage.setItem('expenseList', JSON.stringify(expenseList));
  }, [expenseList]);

  console.log(expenseList);

  return (
    <main className='home'>
      <Expense
        expenseList={expenseList}
        updateExpenseList={updateExpenseList}
      />
      <AddExpense updateExpenseList={updateExpenseList} />
    </main>
  );
};
