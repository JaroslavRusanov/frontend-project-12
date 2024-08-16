import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import socket from '../../socket.js';

const Messages = ({ activeChannel, setCounterMessages }) => {
  const [messages, setMessages] = useState([]);

  const activeChannelId = activeChannel.id;
  socket.on('newMessage', (data) => {
    const addNewMessage = [...messages, data];
    setMessages(addNewMessage);
    setCounterMessages(addNewMessage.length);
  });

  if (!messages) return <Spinner animation="border" />;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelID }) => activeChannelId === channelID)
        .map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>
              {message.username}
            </b>
            {`: ${message.body.body}`}
          </div>
        ))}
    </div>
  );
};

export default Messages;
