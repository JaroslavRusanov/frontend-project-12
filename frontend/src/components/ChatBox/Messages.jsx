import Spinner from 'react-bootstrap/Spinner';
import socket from '../../utils/socket.js';

const Messages = ({ activeChannel, messages, setMessages }) => {
  const activeChannelID = activeChannel.id;

  socket.on('newMessage', (data) => {
    const addNewMessage = [...messages, data];
    setMessages(addNewMessage);
  });

  if (!messages) return <Spinner animation="border" />;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelID }) => activeChannelID === channelID)
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
