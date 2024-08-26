import { Modal, FormGroup } from 'react-bootstrap';
import {
  useRemoveChannelMutation,
  useRemoveMessageMutation,
  useGetMessagesQuery,
} from '../../store/api.js';

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

  const removeChannelsMessages = async (messages) => {
    messages
      .filter(({ channelID }) => channelID === currentChannelId)
      .forEach(async (message) => {
        await removeMessage(message.id);
      });
  };

  const defaultChannel = {
    id: 1,
    name: 'general',
    removable: false,
  };

  const handleDelete = async () => {
    try {
      await removeChannel(currentChannelId);
      removeChannelsMessages(data);
      activeChannnelClick(defaultChannel);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <FormGroup className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Удалить</button>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
