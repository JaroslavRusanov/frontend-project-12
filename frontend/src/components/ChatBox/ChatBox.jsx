import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { messagesSelector } from '../../store/Slices/messages.js';
import { activeChannelSelector } from '../../store/Slices/activeChannel.js';

const ChatBox = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelector.selectAll);
  const activeChannel = useSelector(activeChannelSelector);

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
        <Messages />
        <MessageInput inputEl={inputEl} channelID={activeChannel.id} />
      </div>
    </div>
  );
};

export default ChatBox;
