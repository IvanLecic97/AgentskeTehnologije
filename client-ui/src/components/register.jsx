import React from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  let onChangeUsername = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setUsername(newValue);
    console.log(username);
  };

  let onChangePassword = (event) => {
    event.preventDefault();
    const newValue = event.target.value;
    setPassword(newValue);
    console.log(password);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const url = "http://localhost:8080/WAR2022/rest/chat/users/register";
    axios.post(url, data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div id="regForm" style={{ justifyContent: "center" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <div>
            <input
              onChange={onChangeUsername}
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div>
            <input
              onChange={onChangePassword}
              type="text"
              name="password"
              placeholder="Password"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div>
            <Button type="submit">Register</Button>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Register;
