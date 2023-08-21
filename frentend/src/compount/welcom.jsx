import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Welcom() {
  return (
    <div className="container ">
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "80vh" }}
      >
        <p className="display-3">Welcome to bloging app</p>
        <Nav.Link href="/">
          <button className="btn btn-primary">Go Home page</button>
        </Nav.Link>
      </div>
    </div>
  );
}

export default Welcom;
