import React from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";

const ExpenseInsights = (props) => {
  const getPercentageOfExpenseSettledState = (expenseList) => {
    if (!expenseList) return;

    const settledExpenses = expenseList.filter(
      (expense) => expense.isSettled === true
    );
    if (settledExpenses.length === 0) return [0, 100];
    const percentOfSettledExpenses = Math.trunc(
      (settledExpenses.length / (expenseList.length - 1)) * 100
    );
    const percentOfUnsettledExpenses = 100 - percentOfSettledExpenses;
    return [percentOfSettledExpenses, percentOfUnsettledExpenses];
  };

  const percentOfSettledExpenseState = getPercentageOfExpenseSettledState(
    props.expenseList
  );

  return (
    <>
      <div className="expense__insights-container">
        <h1 className="expense__insights">Dashboard Insights:</h1>
        <div className="expense__insights-stats-container">
          <div className="expense__insights-total-expenses">
            Total Expenses: {props.expenseCount}
          </div>
          <div className="expense__plotly-container">
            <Plot
              config={{ displayModeBar: false, responsive: true }}
              layout={{
                showlegend: false,
                autosize: true,
              }}
              data={[
                {
                  values: percentOfSettledExpenseState,
                  labels: ["settled", "unsettled"],
                  type: "pie",
                },
              ]}
              useResizeHandler={true}
              className="expense__settled-pie-chart"
            />
            <Plot
              config={{ displayModeBar: false, responsive: true }}
              layout={{
                showlegend: false,
                autosize: true,
              }}
              data={[
                {
                  values: percentOfSettledExpenseState,
                  labels: ["settled", "unsettled"],
                  type: "pie",
                },
              ]}
              useResizeHandler={true}
              className="expense__settled-pie-chart"
            />
          </div>
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
