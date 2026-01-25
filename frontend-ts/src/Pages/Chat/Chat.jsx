import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import useAuth from '../../auth/hook';
import { activeChannelSelector, setActiveChannel } from '../../store/Slices/activeChannel';
import { useGetChannelsQuery, useGetMessagesQuery } from '../../store/api';
import Channels from '../../components/Channels/Channels';
import ChatBox from '../../components/ChatBox/ChatBox';
import ChannelButtonSVG from '../../assets/ChannelButtonSVG';
import getModal from '../../components/modals/index';
import { setChannels } from '../../store/Slices/channels';
import { setMessages } from '../../store/Slices/messages';

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
  const dispatch = useDispatch();
  const activeChannel = useSelector(activeChannelSelector);

  const activeChannnelClick = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  const initChannels = useGetChannelsQuery();
  const initMessages = useGetMessagesQuery();
  const { t } = useTranslation();
  const { logOut } = useAuth();

  useEffect(() => {
    if (initChannels.error?.status === 401
      || initMessages.error?.status === 401) {
      logOut();
    } else if (initChannels.data && initMessages.data) {
      dispatch(setChannels(initChannels.data));
      dispatch(setMessages(initMessages.data));
    }
  }, [dispatch, logOut, initChannels, initMessages]);

  const [modalType, setModalType] = useState({ type: null, currentChannel: null });
  const [errorValidation, setErrorValidation] = useState({ isInvalid: false, error: '' });

  const handleModal = (type, currentChannel) => (
    currentChannel
      ? setModalType({ type, currentChannel })
      : setModalType({ type, currentChannel: null }));
  const closeModal = () => (setModalType({ ...modalType, type: null }));

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {initChannels.isLoading
      && initMessages.isLoading
      && <Spinner animation="border" variant="primary" className="position-fixed top-50 start-50 bottom-50 end-50 " />}
      {initChannels.data
      && initMessages.data
      && (
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('chatPage.header')}</b>
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
          <ChatBox activeChannel={activeChannel} />
          {renderModal(
            modalType,
            closeModal,
            activeChannnelClick,
            errorValidation,
            setErrorValidation,
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
