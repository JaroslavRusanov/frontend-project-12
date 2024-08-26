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
          body: string().min(3).max(20).notOneOf(channelsNames),
        });
        await channelSchema.validate(values);
        // EDIT CHANNEL
        const newName = await editChannel({ id: currentChannelId, name: values.body });
        activeChannnelClick(newName.data);
        setErrorValidation({ isInvalid: false, error: '' });
        closeModal();
      } catch (e) {
        setErrorValidation({ isInvalid: true, error: e.message });
      }
    },
  });

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="body"
              name="body"
              type="text"
              data-testid="input-body"
              onChange={formik.handleChange}
              value={formik.values.body}
              required
              isInvalid={errorValidation.isInvalid}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errorValidation.error}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={closeModal}>Отменить</Button>
          <Button variant="primary" type="submit">Отправить</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
