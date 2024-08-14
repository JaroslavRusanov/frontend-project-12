import { useState, useRef, useEffect } from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';

const ChatBox = ({ activeChannel }) => {
  const [counterMessages, setCounterMessages] = useState(0);
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, [activeChannel]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`# ${activeChannel.name}`}
            </b>
          </p>
          <span className="text-muted">
            {`${counterMessages} сообщений`}
          </span>
        </div>
        <Messages activeChannel={activeChannel} setCounterMessages={setCounterMessages} />
        <MessageInput inputEl={inputEl} />
      </div>
    </div>
  );
};

export default ChatBox;
