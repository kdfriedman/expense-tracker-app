import React, { useState } from 'react';
import Modal from 'react-modal';

const AddExpense = (props) => {
  // initial state
  const initialFormInputValueState = {
    expense: '',
    description: '',
    date: '',
  };

  // modal state
  const [modalIsOpen, setIsOpen] = useState(false);

  // two way binding for modal form - update state with input value
  const [value, setValue] = useState(initialFormInputValueState);

  const generateId = (id) => {
    return id + 1;
  };

  // regex map to use for form input validation
  const INPUT_KEY_REGEX_MAP = {
    expense: new RegExp(
      `(^[0-9]$)|(^[0-9]{3}.[0-9]{2}$)|(^[0-9]{3}.[0-9]{1}$)|(^[0-9]{2}.[0-9]{2}$)|(^[0-9]{2}.[0-9]$)|(^[0-9]{3})|(^[0-9]{2})$`,
      'g'
    ),
    description: new RegExp(/([^!@#$%^&*)(][0-9a-zA-Z\s]+)/, 'ig'),
    date: new RegExp(
      `^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)[0-9][0-9]$`,
      'ig'
    ),
  };

  // reset form value input state with initial state of empty strings
  const clearFormInputValueState = () => {
    setValue(initialFormInputValueState);
  };

  // open modal
  const openModal = () => {
    setIsOpen(true);
  };

  // close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    // convert formElement HTML List to array
    const formElements = [...e.currentTarget.elements];

    // filter out form elements for input elements only
    const formElementValueList = formElements.filter((formElement) =>
      formElement.tagName.toLowerCase().includes('input')
    );

    // map the values from each input element in form
    const formInputValues = formElementValueList.map((input) =>
      input.value.trim()
    );

    // update home page state with expense values
    // props.updateExpenseList([...props.expenseList, formInputValues]);
    //TODO figure out who homeMain component is passing undefined after state update?
    props.updateExpenseList((expenseList) => {
      const lastExpenseInList = expenseList[expenseList.length - 1];
      return [
        ...expenseList,
        {
          id: generateId(lastExpenseInList.id),
          expenseItems: formInputValues,
          isSettled: false,
        },
      ];
    });

    // clear form inputs using useState hook
    clearFormInputValueState();

    // exit from modal after submission
    closeModal();
  };

  const handleInvalidInput = (e) => {
    const inputRegexValue = INPUT_KEY_REGEX_MAP[e.currentTarget.name];
    const hasMatch = e.currentTarget.value.match(inputRegexValue);
    const isValidInput = inputRegexValue.test(e.currentTarget.value);
  };

  const bindInputValueToForm = (e) => {
    // update value with useState and pass in dynamic event target name as key with value
    setValue({ ...value, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <div className='expense-form__container'>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          //   onAfterOpen={afterOpenModal}
          //   onRequestClose={closeModal}
          //   style={customStyles}
          contentLabel='Example Modal'
        >
          <button onClick={closeModal}>Close Modal</button>
          <form id='expenseForm' onSubmit={handleAddExpense}>
            <label>Expense</label>
            <input
              onChange={bindInputValueToForm}
              onBlur={handleInvalidInput}
              type='text'
              placeholder='e.g. 24.34'
              name='expense'
              value={value.expense}
              minLength='1'
              maxLength='6'
              required
            />
            <label>Description</label>
            <input
              onChange={bindInputValueToForm}
              onBlur={handleInvalidInput}
              type='text'
              placeholder='e.g. groceries'
              name='description'
              value={value.description}
              minLength='1'
              maxLength='50'
              required
            />
            <label>Date</label>
            <input
              onChange={bindInputValueToForm}
              onBlur={handleInvalidInput}
              type='text'
              placeholder='mm/dd/yyyy'
              name='date'
              value={value.date}
              required
              minLength='10'
              maxLength='10'
            />
            <button type='submit'>Add Expense</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default AddExpense;
