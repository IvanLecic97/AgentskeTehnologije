import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

import axios from "axios";
import Message from "./components/message";

const App = () => {
  const [usernameForDeletion, setUsernameForDeletion] = useState(
    localStorage.getItem("username")
  );
  const [msgCheck, setMsgCheck] = useState("asd");
  let onLogoutClick = (event) => {
    const url =
      "http://localhost:8080/WAR2022/rest/chat/users/loggedIn/" +
      usernameForDeletion;
    axios.delete(url).then((response) => {
      console.log("Izlogovan!!!");
    });

    localStorage.removeItem("username");
    console.log(localStorage.getItem("username"));
  };

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark">
        <Nav.Link
          style={{ color: "white" }}
          className="navLink"
          href="/register"
        >
          Register
        </Nav.Link>

        <Nav.Link className="navLink" style={{ color: "white" }} href="/login">
          Login
        </Nav.Link>
        <Nav.Link
          disabled={msgCheck == 0 ? "true" : ""}
          className="navLink"
          style={{ color: "white" }}
          href="/sendMessage"
        >
          Send Message
        </Nav.Link>

        <Nav.Link
          onClick={onLogoutClick}
          className="navLink"
          style={{ color: "white" }}
          href="/login"
        >
          Logout
        </Nav.Link>
      </Navbar>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sendMessage" element={<Message />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
