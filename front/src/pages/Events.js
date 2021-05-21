import axios from "../axios";
import React, { useEffect, useState } from "react";
import Dropbox from "../component/dropbox/Dropbox";
import Modal from "../component/Modal/Modal";
import { useStateValue } from "../StateProvider";
import "./Events.css";
import EventList from "../component/eventList/EventList";

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [{ token }] = useStateValue();
  const [events, setEvents] = useState([]);
  const [createEvent, setCreateEvent] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectedEvent, setselectedEvent] = useState({});
  const [viewEvent, setViewEvent] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/graphql", {
        query: `query {
        events{
          title
          _id
          description
          price
          date
          creator{
            _id
          }
        }
      }`,
      })
      .then((result) => {
        setEvents(result.data.data.events);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log({ title, price, date, description });
    axios
      .post(
        "/graphql",
        {
          query: `mutation{
        createEvent(InputEvent:{title:"${title}",description:"${description}",price : ${price}, date:"${date}"}){
          _id
        }
      }`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        setCreateEvent(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleViewDetail = (eventId) => {
    const select = events.find((e) => e._id === eventId);

    setselectedEvent(select);
    setViewEvent(true);
  };

  const handelBook = (e) => {
    e.preventDefault();
  };

  const handleView = (e) => {
    setViewEvent(!viewEvent);
    axios
      .post(
        "/graphql",
        {
          query: `mutation{
          bookEvent(eventId: "${selectedEvent._id}"){
            _id
          }
        }`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setViewEvent(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const handelModal = (e) => {
    e.preventDefault();
    setCreateEvent(!createEvent);
  };
  return (
    <>
      <div className="events">
        <div className="events_box">
          <div className="createEvent_box">
            <h1>Create Your Own Events</h1>
            {(createEvent || viewEvent) && <Dropbox />}
            {viewEvent && (
              <Modal
                title="View Event"
                onConfirm={handelBook}
                onCancel={handleView}
                confirmText="Book"
              >
                <div className="viewEvent">
                  <h1>{selectedEvent.title}</h1>
                  <h2>
                    Date :
                    {
                      new Date(parseInt(selectedEvent.date))
                        .toISOString()
                        .split("T")[0]
                    }
                  </h2>
                  <h3>Price : {selectedEvent.price}</h3>
                  <h4>Description : {selectedEvent.description}</h4>
                </div>
              </Modal>
            )}
            {createEvent && (
              <Modal
                title="Create Event"
                onConfirm={handelSubmit}
                onCancel={handelModal}
                confirmText="Confirm"
              >
                <div className="createEvent">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <label>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                  <label>Description</label>
                  <input
                    type="textarea"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </Modal>
            )}

            <div className="event_create">
              <button onClick={handelModal}>createEvent</button>
            </div>
          </div>

          {loading && <div class="loader"></div>}

          {events.map((item) => {
            return (
              <EventList
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item.price}
                creator={item.creator._id}
                date={item.date}
                onSelect={handleViewDetail}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Events;
