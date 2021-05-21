import React, { useEffect, useState } from "react";
import axios from "../axios";
import BookingItem from "../component/bookingList/BookingItem";
import { useStateValue } from "../StateProvider";
import "./Booking.css";

const Booking = () => {
  const [{ token }] = useStateValue();
  const [booking, setBooking] = useState([]);
  const [change, setChange] = useState(true);
  useEffect(() => {
    if (change) {
      axios
        .post(
          "/graphql",
          {
            query: `query {
          booking{
            _id
            event{
              title
            }
            createdAt
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
          // console.log(result.data.data.booking);
          setBooking(result.data.data.booking);
          setChange(false);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [change]);

  const handelCancel = (bookingId) => {
    axios
      .post(
        "/graphql",
        {
          query: `mutation{
          cancelBooking(bookingId : "${bookingId}"){
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
        setChange(true);
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <>
      <div className="booking">
        {booking.map((item) => {
          return (
            <BookingItem
              key={item._id}
              title={item.event.title}
              date={item.createdAt}
              id={item._id}
              onCancel={handelCancel}
            />
          );
        })}
      </div>
    </>
  );
};

export default Booking;
