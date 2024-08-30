import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAddChannelMutation, useGetChannelsQuery } from '../../store/api.js';

const Add = ({
  closeModal,
  activeChannnelClick,
  errorValidation,
  setErrorValidation,
}) => {
  // HOOKS
  const [addChannel] = useAddChannelMutation();
  const { data } = useGetChannelsQuery();
  const { t } = useTranslation();

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
        // ADD CHANNEL
        filter.loadDictionary('en');
        const filteredName = filter.clean(values.body);
        const newChannel = await addChannel({ name: filteredName });
        activeChannnelClick(newChannel.data);
        setErrorValidation({ isInvalid: false, error: '' });
        toast.success(t('toastify.success.channel.add'));
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
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="body"
              name="body"
              data-testid="input-body"
              onChange={formik.handleChange}
              value={formik.values.body}
              isInvalid={errorValidation.isInvalid}
            />
            <label htmlFor="body" className="visually-hidden">{t('modal.label')}</label>
            <Form.Control.Feedback type="invalid" tooltip>{errorValidation.error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={closeModal}>{t('modal.add.cancelButton')}</Button>
          <Button variant="primary" type="submit">{t('modal.add.sendButton')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Add;
