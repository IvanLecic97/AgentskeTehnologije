import axios from "axios";
import React, { useEffect, useState } from "react";

function AllMessages() {
  const [messages, setMessages] = useState(null);
  const [username, setUser] = useState(localStorage.getItem("username"));
  const [url, setUrl] = useState(
    `http://localhost:8080/WAR2022/rest/chat/messages/${username}`
  );
  const [loading, setLoading] = useState(true);

  const getMessages = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setMessages(json);
      //console.log(messages);
      const loading1 = false ? messages !== null : true;
      setLoading(loading1);
    } catch (error) {
      console.log("error", error);
    }
    console.log(url);
  };

  useEffect(() => {
    getMessages();

    console.log(messages);
  }, []);

  return (
    <div>
      <div>
        {messages &&
          messages.map((msg) => {
            <div key={msg.receiver} style={{ backgroundColor: "red" }}>
              <li>Sender : {msg.sender} </li>
              <li>Content : {msg.text} </li>
            </div>;
          })}
      </div>
    </div>
  );
}

export default AllMessages;
