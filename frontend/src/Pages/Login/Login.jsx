import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useGetAuthTokenMutation } from '../../RTKQueryAPI/api.js';
import logo from '../../assets/login.jpeg';
import useAuth from '../../auth/hook.jsx';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isInvalideAuth, setFailAuth] = useState(false);
  const { logIn } = useAuth();
  const [getToken] = useGetAuthTokenMutation();

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
      } catch (e) {
        setFailAuth(true);
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
                <img src={logo} className="rounded-circle" alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <h1 className="text-center mb-4">Войти</h1>
                  <FloatingLabel
                    className="form-floating mb-3"
                    label="Ваш ник"
                  >
                    <Form.Control
                      id="username"
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder="Ваш ник"
                      className="form-control"
                      onChange={formik.handleChange}
                      isInvalid={isInvalideAuth}
                      defaultValue={formik.values.username}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="form-floating mb-4"
                    label="Пароль"
                  >
                    <Form.Control
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder="Пароль"
                      type="password"
                      className="form-control"
                      label="password"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.password}
                      isInvalid={isInvalideAuth}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
