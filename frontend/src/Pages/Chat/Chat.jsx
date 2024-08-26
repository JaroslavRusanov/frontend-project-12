import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeChannelSelector, setActiveChannel } from '../../store/Slices/channels.js';
import { messagesSelector } from '../../store/Slices/messages.js';
import Channels from '../../components/Channels/Channels.jsx';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import ChannelButtonSVG from '../../assets/ChannelButtonSVG.jsx';
import getModal from '../../components/modals/index.js';

const renderModal = (
  modalType,
  closeModal,
  activeChannnelClick,
  errorValidation,
  setErrorValidation,
) => {
  if (!modalType.type) {
    return null;
  }

  const Component = getModal(modalType.type);
  return (
    <Component
      modalType={modalType}
      closeModal={closeModal}
      activeChannnelClick={activeChannnelClick}
      errorValidation={errorValidation}
      setErrorValidation={setErrorValidation}
    />
  );
};

const Chat = () => {
  // HOOKS
  const activeChannel = useSelector(activeChannelSelector);
  const dispatch = useDispatch();
  const activeChannnelClick = (channel) => {
    dispatch(setActiveChannel(channel));
  };
  const messages = useSelector(messagesSelector);
  const [modalType, setModalType] = useState({ type: null, currentChannel: null });
  const [errorValidation, setErrorValidation] = useState({ isInvalid: false, error: '' });
  // const [messages, setMessages] = useState([]);

  const handleModal = (type, currentChannel) => (
    currentChannel
      ? setModalType({ type, currentChannel })
      : setModalType({ type, currentChannel: null }));
  const closeModal = () => (setModalType({ ...modalType, type: null }));

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => handleModal('adding')}>
              <ChannelButtonSVG />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels
            activeChannel={activeChannel}
            activeChannnelClick={activeChannnelClick}
            handleModal={handleModal}
          />
        </div>
        <ChatBox activeChannel={activeChannel} messages={messages} />
        {renderModal(
          modalType,
          closeModal,
          activeChannnelClick,
          errorValidation,
          setErrorValidation,
        )}
      </div>
    </div>
  );
};

export default Chat;
