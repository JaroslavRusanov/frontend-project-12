import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useAddMessageMutation } from '../../store/api.js';
import MessageInputButton from '../../assets/MessageInputButtonSVG.jsx';

const MessageInput = ({ inputEl, channelID }) => {
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();

  const username = localStorage.getItem('userName');

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (body) => {
      try {
        const newMessage = { body, channelID, username };
        await addMessage(newMessage);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <div className="input-group has-validation">
          <Form.Label htmlFor="body" />
          <Form.Control
            id="body"
            name="body"
            aria-label={t('messageInput.label')}
            placeholder={t('messageInput.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.body}
            ref={inputEl}
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <MessageInputButton />
            <span className="visually-hidden">{t('messageInput.button')}</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default MessageInput;
