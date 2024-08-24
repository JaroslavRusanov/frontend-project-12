import { useState } from 'react';
import Channels from '../../components/Channels/Channels.jsx';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import ChannelButtonSVG from '../../assets/ChannelButtonSVG.jsx';
import getModal from '../../components/modals/index.js';

const renderModal = (
  modalType,
  closeModal,
  setActiveChannel,
  defaultChannel,
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
      setActiveChannel={setActiveChannel}
      defaultChannel={defaultChannel}
      errorValidation={errorValidation}
      setErrorValidation={setErrorValidation}
    />
  );
};

const Chat = ({ messages }) => {
  // HOOKS
  const defaultChannel = { id: 1, name: 'general', removable: false };
  const [activeChannel, setActiveChannel] = useState(defaultChannel);
  const [modalType, setModalType] = useState({ type: null, currentChannel: null });
  const [errorValidation, setErrorValidation] = useState({ isInvalid: false, error: '' });

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
            setActiveChannel={setActiveChannel}
            handleModal={handleModal}
          />
        </div>
        <ChatBox activeChannel={activeChannel} messages={messages}/>
        {renderModal(
          modalType,
          closeModal,
          setActiveChannel,
          defaultChannel,
          errorValidation,
          setErrorValidation,
        )}
      </div>
    </div>
  );
};

export default Chat;
