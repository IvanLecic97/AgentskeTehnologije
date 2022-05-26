import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

function Message() {
  const [reciever, setReciever] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [onlineUsers, setOnlineUsers] = useState(null);
  const [usersUrl, setUsersUrl] = useState(
    "http://localhost:8080/WAR2022/rest/chat/users/loggedIn"
  );

  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:8080/WAR2022/ws/:" + localStorage.getItem("username")
  );

  const [messagesUrl, setMessagesUrl] = useState(
    `http://localhost:8080/WAR2022/rest/chat/messages/${username}`
  );

  const [currUser, setCurrUser] = useState(null);
  const [messsages, setMessages] = useState(null);

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

  const fetchUsers = async () => {
    try {
      const response = await fetch(usersUrl);

      const json = await response.json();
      const value = json.filter(
        (user) => user.username !== localStorage.getItem("username")
      );
      console.log(value);

      console.log(currUser);

      setOnlineUsers(value);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useWebSocket(socketUrl, {
  //  onOpen: () => console.log("opened"),
  //  shouldReconnect: (closeEvent) => true,
  // });

  let onSubmitMessage = (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/WAR2022/rest/chat/messages/user";
    const data = {
      sender: localStorage.getItem("username"),
      receiver: reciever,
      text: message,
    };
    axios.post(url, data);
  };

  let onSubmitAll = (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/WAR2022/rest/chat/messages/all";
    const data = {
      sender: localStorage.getItem("username"),
      receiver: "ALL",
      text: message,
    };
    axios.post(url, data);
  };

  const initWebSocket = () => {
    let connection = new WebSocket(socketUrl);
    connection.onopen = function () {
      console.log("socket is opened!");
    };

    connection.onmessage = function (event) {
      //const json = JSON.parse(event.data);
      console.log("Data :" + event.data);
    };
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(messagesUrl);

      const json = await response.json();

      setMessages(json);
    } catch (error) {
      console.log("error", error);
    }
    console.log(messsages);
  };

  useEffect(() => {
    initWebSocket();
    fetchUsers();
    fetchMessages();

    console.log(socketUrl);
  }, []);

  return (
    <div>
      <Form className="messageForm">
        <FormGroup>
          <div>
            <Form.Label>Reciever</Form.Label>
            <Form.Select onChange={changeRecieverValue}>
              <option>Open this to select reciever</option>
              {onlineUsers &&
                onlineUsers.map((user) => (
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
            <Button type="submit" onClick={onSubmitMessage}>
              Send
            </Button>
            <Button
              style={{ backgroundColor: "red" }}
              type="submit"
              onClick={onSubmitAll}
            >
              Send to all users
            </Button>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}

export default Message;
