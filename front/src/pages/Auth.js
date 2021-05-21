import React, { useState } from "react";
import axios from "../axios";
import { useStateValue } from "../StateProvider";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/graphql", {
        query: `query {login(email:"${email}",password:"${password}"){token userId}
    }`,
      })
      .then((result) => {
        console.log(result.data.data.login.userId);
        dispatch({
          type: "ADD_USER",
          user: {
            token: result.data.data.login.token,
            userId: result.data.data.login.userId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("/graphql", {
        query: `mutation{
        createUser(userInput: {email: "${email}",password: "${password}"}){
          email
          _id
        }
      }`,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="auth">
        <div className="auth_box">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </>
  );
};

export default Auth;
