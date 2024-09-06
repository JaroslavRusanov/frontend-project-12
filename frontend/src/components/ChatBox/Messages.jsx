import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../store/api.js';
import { activeChannelSelector } from '../../store/Slices/activeChannel.js';

const Messages = ({ messages }) => {
  const activeChannel = useSelector(activeChannelSelector);

  const { data } = useGetMessagesQuery();

  const activeChannelID = activeChannel.id;

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [messages]);

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
