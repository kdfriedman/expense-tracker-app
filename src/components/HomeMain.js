import React, { useState, useEffect } from 'react';
import AddExpense from './AddExpense';
import Expense from './Expense';

export const HomeMain = (props) => {
  // check if localStorage has expenseList, otherwise initialize state with empty object
  const initExpenseList = () => {
    let activeExpenseListData;
    const expenseListData = JSON.parse(
      window.localStorage.getItem('expenseList')
    );

    if (expenseListData) {
      // filter out expired expenses from init expense list
      activeExpenseListData = expenseListData.filter((expense) => {
        return (
          expense.expiration > new Date().getTime() || expense.expiration === 0
        );
      });
    }

    return activeExpenseListData
      ? activeExpenseListData
      : expenseListData || [
          {
            id: 0,
            expenseItems: [],
            isSettled: false,
            expiration: 0,
          },
        ];
  };

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
