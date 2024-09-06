import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, FormGroup } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../store/api.js';
import defaultChannel from '../../utils/defaultChannel.js';

const Remove = ({
  modalType,
  closeModal,
  activeChannnelClick,
}) => {
  const currentChannelId = modalType.currentChannel.id;
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await removeChannel(currentChannelId);
      activeChannnelClick(defaultChannel);
      toast.success(t('toastify.success.channel.remove'));
      closeModal();
    } catch (err) {
      toast.error(t('toastify.error.connectionErr'));
      throw err;
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
