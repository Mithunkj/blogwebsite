import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function SingUp() {
  const [user, setuser] = useState("");
  const [userName, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const fetchSingup = async (e) => {
    e.preventDefault();
    const values = { user, userName, mobileNumber, email, password };
    if (!user || !userName || !email || !mobileNumber || !password) {
      setErrorMessage("Please add all fields");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:7000/auth/register",
          values
        );
        console.log(res);
        nav("/login");
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };
  return (
    <>
      <div className="container text-center">
        <form onSubmit={fetchSingup} className="col-md-6 m-auto">
          <h4> SingUp</h4>
          <p className="text-danger text-center">{errorMessage}</p>
          <input
            className="form-control m-2 p-2"
            placeholder="Enter user"
            type="text"
            onChange={(e) => {
              setuser(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter userName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter mobileNumber"
            type="number"
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="form-control m-2 p-2"
            placeholder="Enter password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-primary" type="submit ">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default SingUp;
