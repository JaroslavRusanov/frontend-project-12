import Spinner from 'react-bootstrap/Spinner';
import { useGetMessagesQuery } from '../../RTKQueryAPI/Api.js';

const Messages = ({ activeChannel, setCounterMessages }) => {
  const { data, error, isLoading } = useGetMessagesQuery;

  const activeChannelId = activeChannel.id;

  const getMessages = (response) => {
    if (!response) {
      return null;
    }

    const messages = Object.entries(response)
      .filter(([, { channelId }]) => channelId === activeChannelId)
      .map(([, message]) => (
        <div key={message.id} className="text-break mb-2">
          <b>
            {message.username}
          </b>
          :
          {message.body}
        </div>
      ));
    setCounterMessages(messages.length);
    return messages;
  };

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {isLoading && <Spinner animation="border" />}
      {getMessages(data)}
      {error && console.log(error)}
    </div>
  );
};

export default Messages;
