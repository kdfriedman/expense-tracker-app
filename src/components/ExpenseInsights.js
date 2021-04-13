import React from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";

const ExpenseInsights = (props) => {
  // get state of settled expenses and return as array
  const getExpenseIsSettledKeyList = (expenseList) => {
    const expenseIsSettledKeyMap = new Map();
    expenseIsSettledKeyMap.set("true", "settled");
    expenseIsSettledKeyMap.set("false", "unsettled");

    console.log(expenseIsSettledKeyMap);

    // copy expense list to use within charts, avoiding altering the state itself
    const copiedExpenseList = [...expenseList];
    const copiedValidExpenserList = copiedExpenseList.filter(
      (expense) => expense?.expenseItems.length !== 0
    );
    // use within charts to determine if expense item is settled or not
    const copiedExpenseIsSettledKeyList = copiedValidExpenserList.map(
      (expense) => {
        return expenseIsSettledKeyMap.get(expense.isSettled.toString());
      }
    );
    return copiedExpenseIsSettledKeyList;
  };

  const expenseIsSettledKeyList = getExpenseIsSettledKeyList(props.expenseList);

  const sumExpensesBySettledState = (expenseList) => {
    // return func if expense list does not exist
    if (!expenseList) return;

    // remove any non valid expenses
    const filteredValidListOfExpenses = expenseList.filter((expense) => {
      // check if expense item array contains values
      const hasValues = expense?.expenseItems[1] ?? null;
      return hasValues;
    });

    const summedExpenses = filteredValidListOfExpenses.reduce(
      (totaledExpenses, expense) => {
        // check if expense is settled vs unsettled
        switch (expense.isSettled) {
          case true:
            // check if settled sum property exist on accumulator
            if (!("settledExpenseSum" in totaledExpenses)) {
              // init to 0
              totaledExpenses["settledExpenseSum"] = 0;
            }
            // if prop exists, sum up each new expense item amount into a single sum
            totaledExpenses["settledExpenseSum"] =
              totaledExpenses["settledExpenseSum"] +
              parseFloat(expense.expenseItems[0]);
            break;
          case false:
            // check if unsettled sum property exist on accumulator
            if (!("unsettledExpenseSum" in totaledExpenses)) {
              // init to 0
              totaledExpenses["unsettledExpenseSum"] = 0;
            }
            // if prop exists, sum up each new expense item amount into a single sum
            totaledExpenses["unsettledExpenseSum"] =
              totaledExpenses["unsettledExpenseSum"] +
              parseFloat(expense.expenseItems[0]);
            break;
        }
        return totaledExpenses;
      },
      {}
    );
    const summedExpensesListOfValues = Object.values(summedExpenses);
    return summedExpensesListOfValues;
  };

  const summedExpensesBySettledState = sumExpensesBySettledState(
    props.expenseList
  );
  console.log(summedExpensesBySettledState);

  const groupExpenseCountByUser = (expenseList) => {
    // exclude all entries which contain empty expenseItem arr
    const filteredValidListOfExpenses = expenseList.filter((expense) => {
      // check if expense item array contains values
      const hasValues = expense?.expenseItems[1] ?? null;
      return hasValues;
    });
    // reduce expenseList to group users by total expense count
    const aggregatedUserExpenseCount = filteredValidListOfExpenses.reduce(
      (allUserExpenses, expense) => {
        // destructure items from user expense arr from expense item arr
        const [, userExpenseName] = expense.expenseItems[1];
        if (userExpenseName in allUserExpenses) {
          allUserExpenses[userExpenseName]++;
        } else {
          allUserExpenses[userExpenseName] = 1;
        }
        return allUserExpenses;
      },
      {}
    );
    // get user names and counts from group by user total expense count object
    const aggregatedUserExpenseCountKeys = Object.keys(
      aggregatedUserExpenseCount
    );
    const aggregatedUserExpenseCountValues = Object.values(
      aggregatedUserExpenseCount
    );
    return { aggregatedUserExpenseCountKeys, aggregatedUserExpenseCountValues };
  };
  const groupedExpenseCountByUser = groupExpenseCountByUser(props.expenseList);

  const groupExpenseAmountByUser = (expenseList) => {
    // exclude all entries which contain empty expenseItem arr
    const filteredValidListOfExpenses = expenseList.filter((expense) => {
      // check if expense item array contains values
      const hasValues = expense?.expenseItems[1] ?? null;
      return hasValues;
    });
    // reduce expenseList to group users by total expense count
    const aggregatedUserExpenses = filteredValidListOfExpenses.reduce(
      (allUserExpenses, expense) => {
        // destructure items arr to access user expense amount
        const [userExpenseAmount] = expense.expenseItems;
        // destructure items arr at index 1 to access inner arr of user expense name
        const [userExpenseState, userExpenseName] = expense.expenseItems[1];

        // check if userExpenseState string has phrase which === negative vs positive (owes me vs I owe)
        const isNegativeValue = /(i owe)/gi.test(userExpenseState);

        // check if prop exists in all user expenses object
        if (!(userExpenseName in allUserExpenses)) {
          allUserExpenses[userExpenseName] = 0;
        }
        // if user name prop exists, sum up unique expense amount and store in property value
        allUserExpenses[userExpenseName] =
          allUserExpenses[userExpenseName] +
          (isNegativeValue
            ? -parseFloat(userExpenseAmount)
            : parseFloat(userExpenseAmount));
        return allUserExpenses;
      },
      {}
    );
    // get user names and expense amounts from group by user total expense amount object
    const aggregatedUserExpenseKeys = Object.keys(aggregatedUserExpenses);
    const aggregatedUserExpenseValues = Object.values(aggregatedUserExpenses);
    return { aggregatedUserExpenseKeys, aggregatedUserExpenseValues };
  };
  const groupedExpenseAmountByUser = groupExpenseAmountByUser(
    props.expenseList
  );

  const generateChartColorFromUserExpenseAmount = ({
    ...aggregatedUserExpenseObj
  }) => {
    const hasPositiveValuesList = aggregatedUserExpenseObj.aggregatedUserExpenseValues.map(
      (int) => int > 0
    );
    const chartColorsBasedOnBool = hasPositiveValuesList.map((hasPosVal) =>
      hasPosVal ? "green" : "red"
    );
    return chartColorsBasedOnBool;
  };
  const generatedChartColorFromUserExpenseAmount = generateChartColorFromUserExpenseAmount(
    groupedExpenseAmountByUser
  );
  return (
    <>
      <div className="expense__insights-container">
        <h1 className="expense__insights">Dashboard Insights:</h1>
        <div className="expense__insights-stats-container">
          <div className="expense__insights-total-expenses">
            Total Expenses: {props.expenseCount}
          </div>
          <div className="expense__insights-charts-container">
            <div className="expense__insights-chart-container">
              <header className="expense__insights-chart-header">
                Settled vs Unsettled
              </header>
              <Plot
                config={{ displayModeBar: false, responsive: true }}
                layout={{
                  showlegend: false,
                  autosize: true,
                }}
                data={[
                  {
                    values: summedExpensesBySettledState,
                    labels: expenseIsSettledKeyList,
                    type: "pie",
                  },
                ]}
                useResizeHandler={true}
                className="expense__insights-chart"
              />
            </div>

            <div className="expense__insights-chart-container">
              <header className="expense__insights-chart-header">
                Expense Volume Per User
              </header>
              <Plot
                config={{ displayModeBar: false, responsive: true }}
                layout={{
                  showlegend: false,
                  autosize: true,
                  yaxis: { dtick: 1 },
                }}
                data={[
                  {
                    x: groupedExpenseCountByUser.aggregatedUserExpenseCountKeys,
                    y:
                      groupedExpenseCountByUser.aggregatedUserExpenseCountValues,
                    type: "bar",
                  },
                ]}
                useResizeHandler={true}
                className="expense__insights-chart"
              />
            </div>
            <div className="expense__insights-chart-container">
              <header className="expense__insights-chart-header">
                Net Amount Owed Per User
              </header>
              <Plot
                config={{ displayModeBar: false, responsive: true }}
                layout={{
                  showlegend: false,
                  autosize: true,
                  yaxis: { dtick: 50 }, // TODO: add some math to increase/decrease based on arr input
                }}
                data={[
                  {
                    x: groupedExpenseAmountByUser.aggregatedUserExpenseKeys,
                    y: groupedExpenseAmountByUser.aggregatedUserExpenseValues,
                    marker: {
                      color: generatedChartColorFromUserExpenseAmount,
                    },
                    type: "bar",
                  },
                ]}
                useResizeHandler={true}
                className="expense__insights-chart"
              />
            </div>
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
