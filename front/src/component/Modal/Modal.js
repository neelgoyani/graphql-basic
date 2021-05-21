import React from "react";

import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <div className="modal">
        <div className="modal_title">{props.title}</div>
        <div className="modal_body">{props.children}</div>
        <div className="modal_action">
          <button onClick={props.onConfirm}>{props.confirmText}</button>
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
