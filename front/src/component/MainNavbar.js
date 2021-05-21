import React from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./MainNavbar.css";

const MainNavbar = () => {
  const [{ token }, dispatch] = useStateValue();

  const handelLogout = () => {
    dispatch({
      type: "REMOVE_USER",
    });
  };
  return (
    <>
      <nav>
        <div className="main-nav-title">Event App</div>
        <div className="main-nav-links">
          {token ? (
            <h3 className="logout" onClick={handelLogout}>
              Logout
            </h3>
          ) : (
            <h3>
              {" "}
              <NavLink to="/auth">Authenticate</NavLink>{" "}
            </h3>
          )}
          <h3>
            <NavLink to="events">Events</NavLink>
          </h3>
          {token && (
            <h3>
              {" "}
              <NavLink to="/booking">Booking</NavLink>{" "}
            </h3>
          )}
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
