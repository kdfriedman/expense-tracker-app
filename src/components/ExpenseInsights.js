import React from "react";
import PropTypes from "prop-types";

const ExpenseInsights = (props) => {
  const getPercentageOfSettledExpenses = (expenseList) => {
    if (!expenseList) return;

    const settledExpenses = expenseList.filter(
      (expense) => expense.isSettled === true
    );
    if (expenseList.length < 1 || settledExpenses.length === 0) return 0;
    const percentOfSettledExpenses =
      (settledExpenses.length / (expenseList.length - 1)) * 100;
    return `${percentOfSettledExpenses}%`;
  };
  return (
    <>
      <div className="expense__insights-container">
        <h1 className="expense__insights">Dashboard Insights:</h1>
        <div className="expense__insights-total-expenses">
          Total Expenses: {props.expenseCount}
        </div>
        <div className="expense__insights-percent-settled">
          % of Settled Expenses:{" "}
          {getPercentageOfSettledExpenses(props.expenseList)}
        </div>
      </div>
    </>
  );
};

ExpenseInsights.propTypes = {
  expenseCount: PropTypes.number.isRequired,
  expenseList: PropTypes.array.isRequired,
};

export default ExpenseInsights;
