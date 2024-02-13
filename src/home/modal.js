import './home.css'
import React, { useState } from "react";
// import type { SVGProps } from 'react';


export default function Modal({ onClose, onAddTask, initialText, index, isEditMode }) {
  const [enteredText, setEnteredText] = useState(initialText || "");

  const modalStyle = isEditMode
  ? {
      align: 'center',
      top: '70px',
      bottom: '70px',
      display: 'flex',
      width: 'fit-content',
      height: 'fit-content'
 
  }
  : {};

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAddTask(enteredText, index);
    setEnteredText("");
    onClose();
  };

  return (
    <div className="modal" style={modalStyle}>
      {/* <div className="modal-content"> */}
        <div className="d-flex flex-column justify-content-center align-items-center ml-5">
          <h2 className='m-5' >To Do</h2>
        
          <input
            className="m-3 rounded"
            type="text"
            value={enteredText}
            onChange={textChangeHandler}
            placeholder="What do you need to do?"
          />
          <button
          className="mt-5 addButton tinggi rounded"
          type="submit"
          onClick={submitHandler}
        >
            Submit
          </button>
        </div>

        <div className='d-flex flex-column mt-3 mr-3'>
          <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7l10 10M7 17L17 7"></path></svg>

        </div>
        {/* </div> */}
      </div>
    );
  }
  