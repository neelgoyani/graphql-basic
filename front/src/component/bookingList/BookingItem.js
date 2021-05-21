import React from "react";
import "./BookingItem.css";

const BookingItem = (props) => {
  return (
    <>
      <div className="bookingitem">
        <div className="bookingitem_detail">
          <h2>{props.title}</h2>
          <h4>{new Date(props.date).toString()}</h4>
        </div>
        <button onClick={props.onCancel.bind(this, props.id)}>Cancel</button>
      </div>
    </>
  );
};

export default BookingItem;
