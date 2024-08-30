import { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Form, FloatingLabel } from 'react-bootstrap';
import logo from '../../assets/avatar.jpg';
import useAuth from '../../auth/hook.jsx';
import { useAddNewUserMutation } from '../../store/api.js';

const Signup = () => {
  // HOOKS
  const [addNewUser, { error }] = useAddNewUserMutation();
  const navigate = useNavigate();
  // const location = useLocation();
  const { logIn } = useAuth();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const { t } = useTranslation();

  // const fromPage = location?.state?.from?.pathname || '/';

  const isErrStatus409 = (responseErr) => responseErr && responseErr.status === 409;

  const onHandleSubmit = async (values) => {
    console.log('boom');
    try {
      const { data } = await addNewUser({ username: values.username, password: values.password });
      localStorage.setItem('userId', data.token);
      localStorage.setItem('userName', data.username);
      logIn();
      navigate('/');
    } catch (err) {
      toast.error(t('toastify.error.connectionErr'));
      throw err;
    }
  };

  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('signupPage.form.errors.usernameRange'))
      .max(20, t('signupPage.form.errors.usernameRange'))
      .required(t('signupPage.form.errors.required')),
    password: yup
      .string()
      .min(6, t('signupPage.form.errors.passwordRange'))
      .required(t('signupPage.form.errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('signupPage.form.errors.passwordConfirm'))
      .required(t('signupPage.form.errors.required')),
  });

  return (
    <Formik
      validationSchema={signupSchema}
      onSubmit={onHandleSubmit}
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validateOnBlur
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img src={logo} className="rounded-circle" alt={t('signupPage.logoAlt')} />
                  </div>
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <Form.Group controlId="validationUsername">
                      <h1 className="text-center mb-4">{t('signupPage.header')}</h1>
                      <FloatingLabel className="form-floating mb-3" label={t('signupPage.form.username')}>
                        <Form.Control
                          placeholder={t('signupPage.form.username')}
                          name="username"
                          autoComplete="username"
                          className="form-control"
                          ref={inputRef}
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={errors.username && touched.username}
                          onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="validationPassword">
                      <FloatingLabel className="form-floating mb-3" label={t('signupPage.form.password')}>
                        <Form.Control
                          placeholder={t('signupPage.form.password')}
                          name="password"
                          type="password"
                          className="form-control"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={errors.password && touched.password}
                          onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId="validationConfirmPassword">
                      <FloatingLabel className="form-floating mb-4" label={t('signupPage.form.confirmPassword')}>
                        <Form.Control
                          placeholder={t('signupPage.form.confirmPassword')}
                          name="confirmPassword"
                          type="password"
                          className="form-control"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isInvalid={
                            isErrStatus409(error)
                            || (errors.confirmPassword && touched.confirmPassword)
                          }
                          onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.confirmPassword || t('signupPage.form.errors.usernameExist')}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <button type="submit" className="w-100 btn btn-outline-primary">{t('signupPage.form.button')}</button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
