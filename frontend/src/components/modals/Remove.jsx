import { useTranslation } from 'react-i18next';
import { Modal, FormGroup } from 'react-bootstrap';
import {
  useRemoveChannelMutation,
  useRemoveMessageMutation,
  useGetMessagesQuery,
} from '../../store/api.js';
import defaultChannel from '../../utils/defaultChannel.js';

const Remove = ({
  modalType,
  closeModal,
  activeChannnelClick,
}) => {
  // HOOKS
  const currentChannelId = modalType.currentChannel.id;
  const [removeChannel] = useRemoveChannelMutation();
  const [removeMessage] = useRemoveMessageMutation();
  const { data } = useGetMessagesQuery();
  const { t } = useTranslation();

  const removeChannelsMessages = async (messages) => {
    messages
      .filter(({ channelID }) => channelID === currentChannelId)
      .forEach(async (message) => {
        console.log(message);
        await removeMessage(message.id);
      });
  };

  const handleDelete = async () => {
    try {
      await removeChannel(currentChannelId);
      removeChannelsMessages(data);
      activeChannnelClick(defaultChannel);
      console.log(data);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.body')}</p>
        <FormGroup className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>{t('modal.remove.cancelButton')}</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>{t('modal.remove.removeButton')}</button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
