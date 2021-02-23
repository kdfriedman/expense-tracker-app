import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const AddExpense = (props) => {
  // modal state
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorText, updateErrorText] = useState("");

  const EXPENSE_BUTTON_TYPE = {
    negative: "I owe",
    positive: "Owes me",
  };

  const [expenseBtnType, updateExpenseBtnType] = useState(
    EXPENSE_BUTTON_TYPE.positive
  );

  // initial state
  const initialFormInputValueState = {
    expense: "",
    expenseType: [],
    description: "",
    date: "",
  };

  // two way binding for modal form - update state with input value
  const [value, setValue] = useState(initialFormInputValueState);

  const generateId = (id) => {
    return id + 1;
  };

  // regex map to use for form input validation
  const INPUT_KEY_REGEX_MAP = {
    expense: new RegExp(
      `(^[0-9]$)|(^[0-9]{3}.[0-9]{2}$)|(^[0-9]{3}.[0-9]{1}$)|(^[0-9]{2}.[0-9]{2}$)|(^[0-9]{2}.[0-9]$)|(^[0-9]{3})|(^[0-9]{2})$`,
      "g"
    ),
    expenseType: new RegExp(/[a-zA-Z\s-.:]+/, "ig"),
    description: new RegExp(/([^!@#$%^&*)(][0-9a-zA-Z\s]+)/, "ig"),
    date: new RegExp(
      `^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)[0-9][0-9]$`,
      "ig"
    ),
  };

  // reset form value input state with initial state of empty strings
  const clearFormInputValueState = () => {
    // update form with initial values
    setValue(initialFormInputValueState);
    // clear all error text
    updateErrorText("");
  };

  // open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // close modal
  const closeModal = () => {
    // update form with initial values
    setValue(initialFormInputValueState);
    // clear all error text
    updateErrorText("");
    setIsOpen(false);
  };

  // handle toggle between expenseType button
  const handleExpenseTypeChange = (e) => {
    const expenseTypeParentEl = e.currentTarget;
    const targetExpenseTypeBtn = e.target.closest("[data-btn-active]");
    const isTargetBtnActive = targetExpenseTypeBtn.dataset.btnActive;

    // check if target btn element contains data-btn-active='false'
    if (isTargetBtnActive === "false") {
      // set btn that was false to true and active class
      targetExpenseTypeBtn.dataset.btnActive = "true";
      targetExpenseTypeBtn.classList.toggle("active");
      // update expenseType click button click value to use for input expenseType related input binding
      updateExpenseBtnType(targetExpenseTypeBtn.dataset.expenseType);
      // loop through list of btn elements and filter out targetBtn which was changed
      // change non-active btn which was previously true
      const expenseTypeBtnList = [...expenseTypeParentEl.children];
      expenseTypeBtnList.forEach((expenseTypeBtn) => {
        if (expenseTypeBtn !== targetExpenseTypeBtn) {
          expenseTypeBtn.classList.toggle("active");
          expenseTypeBtn.dataset.btnActive = "false";
        }
      });
    }
  };

  // handle invalid user input using regex
  const handleInvalidInput = () => {
    const form = document.getElementById("expenseForm");
    // prettier-ignore
    const formInputs = [...form.elements].filter((el) => el.tagName.toLowerCase() === 'input');
    const validatedInputs = formInputs.filter((input) => {
      const inputRegexValue = INPUT_KEY_REGEX_MAP[input.name];
      return inputRegexValue.test(input.value);
    });
    return validatedInputs;
  };

  const handleInvalidDate = () => {
    return updateErrorText("Please enter valid date");
  };

  // handle two way binding on DOM
  // adds first line of validation for user input
  const bindInputValueToForm = (e) => {
    const dateInput = e.target.closest('input[name="date"]');
    const expenseInput = e.target.closest('input[name="expense"]');
    const expenseTypeInput = e.target.closest('input[name="expenseType"]');
    const descriptionInput = e.target.closest('input[name="description"]');
    let dateInputValue;

    // only passes when a character is added to input
    if (dateInput && e.target.value.length === value.date.length + 1) {
      // prettier-ignore
      const isNumber = /[0-9]/gi.test(e.target.value[e.target.value.length - 1]);
      // check if user input is integer, otherwise exclude value from input
      if (!isNumber) return;

      if (value.date.length === 1 || value.date.length === 4) {
        // check if date input value has hit specific indices and insert slash to format date
        dateInputValue = dateInput.value + "/";
      }
    }

    if (expenseInput && e.target.value.length === value.expense.length + 1) {
      // prettier-ignore
      const isExpense = /[.0-9]/gi.test(e.target.value[e.target.value.length - 1]);
      // check if user input is integer, otherwise exclude value from input
      if (!isExpense) return;
    }

    // prettier-ignore
    if (descriptionInput) {
      // prettier-ignore
      const isIllegalChar = /[!@?}#$%^{\]&[*)(><;"+=~`_-]/gi.test(e.target.value[e.target.value.length - 1]);
      // check if user input is allowed, otherwise exclude value from input
      if (isIllegalChar) return;
    }

    // prettier-ignore
    if (expenseTypeInput) {
      // prettier-ignore
      const isValidChar = /[a-zA-Z\s-.:]+/.test(e.target.value[e.target.value.length - 1]);
      // check if user input is integer, otherwise exclude value from input
      if (!isValidChar) return;
    }

    // update value with useState and pass in dynamic event target name as key with value
    // check if dateInput is present, otherwise pass default e.target.value
    setValue({
      ...value,
      [e.target.name]: !dateInputValue ? e.target.value : dateInputValue,
    });
  };

  // handle submission
  const handleAddExpense = (e) => {
    e.preventDefault();

    // additional validation onSubmit to ensure correct inputs
    const validatedInputs = handleInvalidInput(e);
    if (validatedInputs.length < 4) {
      handleInvalidDate();
      return;
    }

    // convert formElement HTML List to array
    const formElements = [...e.currentTarget.elements];

    // filter out form elements for input elements only
    const formElementValueList = formElements.filter((formElement) =>
      formElement.tagName.toLowerCase().includes("input")
    );

    // map the values from each input element in form
    const formInputValues = formElementValueList.map((input) =>
      input.value.trim()
    );
    // descructure form input data so I can inject expenseType btn value
    const [expense, expenseType, description, date] = formInputValues;

    // update home page state with expense values
    props.updateExpenseList((expenseList) => {
      const lastExpenseInList = expenseList[expenseList.length - 1];
      return [
        ...expenseList,
        {
          id: generateId(lastExpenseInList.id),
          expenseItems: [
            expense,
            [expenseBtnType, expenseType],
            description,
            date,
          ],
          isSettled: false,
          expiration: new Date().getTime() + 1.2e9,
        },
      ];
    });

    // clear form inputs using useState hook
    clearFormInputValueState();

    // exit from modal after submission
    closeModal();
  };

  return (
    <>
      <div className="expense__form-container">
        <button
          data-analytics-payload='{
            "event": "on_click", 
            "element_data_value": "create expense click", 
            "element_type":"button", 
            "element_class": "undefined", 
            "element_id": "undefined",
            "component_name": "AddExpense"
          }'
          onClick={openModal}
        >
          Create Expense
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Expense Contact Form"
          className="expense__modal-container"
        >
          <div className="expense__create-expense-container">
            <div className="expense__create-expense">Create expense</div>
            <div
              onClick={closeModal}
              className="expense__form-close"
              data-analytics-payload='{
                "event": "on_click", 
                "element_data_value": "create expense form close - x button click",
                "element_type":"div", 
                "element_class": "expense__form-close", 
                "element_id": "undefined",
                "component_name": "AddExpense"
              }'
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <form id="expenseForm" onSubmit={handleAddExpense}>
            <label>Expense</label>
            <input
              onChange={bindInputValueToForm}
              type="text"
              placeholder="e.g. 24.34"
              name="expense"
              value={value.expense}
              minLength="1"
              maxLength="6"
              required
            />
            <label
              onClick={handleExpenseTypeChange}
              className="expense__settlement-type-container"
            >
              <div
                data-expense-type={EXPENSE_BUTTON_TYPE.positive}
                data-btn-active="true"
                className="expense__settlement-type-button active"
              >
                {EXPENSE_BUTTON_TYPE.positive}
              </div>
              <div
                data-expense-type={EXPENSE_BUTTON_TYPE.negative}
                data-btn-active="false"
                className="expense__settlement-type-button"
              >
                {EXPENSE_BUTTON_TYPE.negative}
              </div>
            </label>
            <input
              onChange={bindInputValueToForm}
              type="text"
              placeholder="e.g. Melissa"
              name="expenseType"
              value={value.expenseType}
              minLength="1"
              maxLength="30"
              required
            />
            <label>Description</label>
            <input
              onChange={bindInputValueToForm}
              type="text"
              placeholder="e.g. groceries"
              name="description"
              value={value.description}
              minLength="1"
              maxLength="50"
              required
            />
            <label>Date</label>
            <input
              onChange={bindInputValueToForm}
              type="text"
              placeholder="mm/dd/yyyy"
              name="date"
              value={value.date}
              required
              minLength="10"
              maxLength="10"
            />
            <span id="dateInputError" className="input__error-text">
              {errorText}
            </span>
            <button type="submit">Add Expense</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AddExpense;

AddExpense.propTypes = {
  updateExpenseList: PropTypes.func.isRequired,
};
