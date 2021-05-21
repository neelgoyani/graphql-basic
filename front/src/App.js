import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import MainNavbar from "./component/MainNavbar";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import Events from "./pages/Events";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ token }] = useStateValue();
  return (
    <>
      <BrowserRouter>
        <>
          <MainNavbar />
          <main>
            <Switch>
              <Redirect exact from="/" to="/auth" />
              {token && <Redirect exact from="/auth" to="/events" />}
              {!token && <Redirect exact from="/booking" to="/auth" />}
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/booking" component={Booking} />
            </Switch>
          </main>
        </>
      </BrowserRouter>
    </>
  );
};

export default App;
