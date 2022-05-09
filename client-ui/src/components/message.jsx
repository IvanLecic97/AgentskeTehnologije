import React, { useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";

function Message() {
  const [reciever, setReciever] = useState("");
  const [message, setMessage] = useState("");
  const users = [
    {
      username: "Ivan",
    },
    {
      username: "Kosa",
    },
    {
      username: "Zorica",
    },
    {
      username: "Slavisa",
    },
  ];
  let changeRecieverValue = (event) => {
    // event.preventDefault();
    const newValue = event.target.value;
    setReciever(event.target.value);
    console.log(reciever);
  };

  let changeMessageText = (event) => {
    setMessage(event.target.value);
    console.log(message);
  };

  return (
    <div>
      <Form className="messageForm">
        <FormGroup>
          <div>
            <Form.Label>Reciever</Form.Label>
            <Form.Select onChange={changeRecieverValue}>
              <option>Open this to select reciever</option>
              <option value="ALL">All users</option>
              {users.map((user) => (
                <option value={user.username}>{user.username}</option>
              ))}
            </Form.Select>
          </div>
        </FormGroup>
        <FormGroup>
          <div>
            <Form.Label>Enter your message</Form.Label>
            <Form.Control onChange={changeMessageText} as="textarea" />
          </div>
        </FormGroup>
        <FormGroup>
          <div style={{ alignContent: "center" }}>
            <Button type="submit">Send</Button>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Message;
