import React, { useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    console.log(username);
  };

  let onSubmitData = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const url = "http://localhost:8080/WAR2022/rest/chat/users/login";
    axios.post(url, data).then((response) => {
      console.log(response.data.id);
      console.log(response.data.username);
      localStorage.setItem("username", response.data.username);
      console.log(localStorage.getItem("username") + "asdad");
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmitData}>
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
            <Button type="submit">Login</Button>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Login;
