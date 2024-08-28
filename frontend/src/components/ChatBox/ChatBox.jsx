import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';

const ChatBox = ({ activeChannel, messages }) => {
  const { t } = useTranslation();
  const getCounterMessagesById = (id) => (
    messages
      .filter(({ channelID }) => channelID === id)
      .length
  );

  const counterMessages = getCounterMessagesById(activeChannel.id);

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.value = '';
  }, [activeChannel, messages]);

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
            {t('chatBox.messages', { count: counterMessages })}
          </span>
        </div>
        <Messages activeChannel={activeChannel} messages={messages} />
        <MessageInput inputEl={inputEl} channelID={activeChannel.id} />
      </div>
    </div>
  );
};

export default ChatBox;
