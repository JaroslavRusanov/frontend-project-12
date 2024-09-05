import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { useGetMessagesQuery } from '../../store/api.js';

const Messages = ({ activeChannel, messages }) => {
  const { data } = useGetMessagesQuery();

  const activeChannelID = activeChannel.id;

  const scrollRef = useRef(null);
  const scrollDown = () => {
    scrollRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollDown();
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {data && messages
        .filter(({ channelID }) => activeChannelID === channelID)
        .map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>
              {message.username}
            </b>
            {`: ${filter.clean(message.body.body)}`}
          </div>
        ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
