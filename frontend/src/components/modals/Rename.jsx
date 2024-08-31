import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/api.js';

const Rename = ({
  modalType,
  closeModal,
  errorValidation,
  setErrorValidation,
  activeChannnelClick,
}) => {
  // HOOKS
  const [editChannel] = useEditChannelMutation();
  const { data } = useGetChannelsQuery();
  const { t } = useTranslation();

  const currentChannelId = modalType.currentChannel.id;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const channelsNames = await Object.entries(data).map(([, { name }]) => name);
      try {
        // VALIDATION BY YUP
        const channelSchema = object({
          body: string()
            .min(3, t('modal.validation.range'))
            .max(20, t('modal.validation.range'))
            .notOneOf(channelsNames, t('modal.validation.notOneOf')),
        });
        await channelSchema.validate(values);
        // EDIT CHANNEL
        const filteredName = filter.clean(values.body);
        const newName = await editChannel({ id: currentChannelId, name: filteredName });
        activeChannnelClick(newName.data);
        setErrorValidation({ isInvalid: false, error: '' });
        toast.success(t('toastify.success.channel.rename'));
        closeModal();
      } catch (err) {
        setErrorValidation({ isInvalid: true, error: err.message });
        toast.error(t('toastify.error.connectionErr'));
        throw err;
      }
    },
  });

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="body"
              name="body"
              type="text"
              data-testid="input-body"
              className="form-control mb-2"
              onChange={formik.handleChange}
              value={formik.values.body}
              isInvalid={errorValidation.isInvalid}
            />
            <label htmlFor="body" className="visually-hidden">{t('modal.label')}</label>
            <div className="invalid-feedback">{errorValidation.error}</div>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                type="button"
                className="me-2"
                onClick={closeModal}
              >
                {t('modal.rename.cancelButton')}
              </Button>
              <Button variant="primary" type="submit">{t('modal.rename.sendButton')}</Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default Rename;
