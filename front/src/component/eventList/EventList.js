import React from "react";
import { useStateValue } from "../../StateProvider";

import "./EventList.css";

const EventList = (props) => {
  const [{ userId, token, email }] = useStateValue();

  return (
    <>
      <div className="eventList">
        <h2>{props.title}</h2>
        {userId === props.creator ? (
          <h3>You Are Owner of Event</h3>
        ) : (
          <button onClick={props.onSelect.bind(this, props.id)}>
            View Detail
          </button>
        )}
      </div>
    </>
  );
};

export default EventList;
