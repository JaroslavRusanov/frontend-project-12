import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetAuthTokenMutation } from '../../store/api.js';
import logo from '../../assets/login.jpeg';
import useAuth from '../../auth/hook.jsx';

const Login = () => {
  // HOOKS
  const navigate = useNavigate();
  const location = useLocation();
  const [isInvalidAuth, setFailAuth] = useState(false);
  const { logIn } = useAuth();
  const [getToken] = useGetAuthTokenMutation();
  const { t } = useTranslation();

  const fromPage = location?.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (inputData) => {
      try {
        const { data } = await getToken(inputData);
        localStorage.setItem('userId', data.token);
        localStorage.setItem('userName', data.username);
        setFailAuth(false);
        logIn();
        navigate(fromPage);
      } catch (err) {
        setFailAuth(true);
        toast.error(t('toastify.error.connectionErr'));
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img src={logo} className="rounded-circle" alt={t('loginPage.logoAlt')} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <h1 className="text-center mb-4">{t('loginPage.header')}</h1>
                  <FloatingLabel
                    className="form-floating mb-3"
                    label={t('loginPage.form.username')}
                  >
                    <Form.Control
                      id="username"
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder={t('loginPage.form.username')}
                      className="form-control"
                      onChange={formik.handleChange}
                      isInvalid={isInvalidAuth}
                      defaultValue={formik.values.username}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="form-floating mb-4"
                    label={t('loginPage.form.password')}
                  >
                    <Form.Control
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder={t('loginPage.form.password')}
                      type="password"
                      className="form-control"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.password}
                      isInvalid={isInvalidAuth}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('loginPage.form.error')}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('loginPage.form.button')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.footer.span')}</span>
                <Link to="/signup">{t('loginPage.footer.link')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
