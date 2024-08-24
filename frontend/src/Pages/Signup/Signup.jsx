import { useState } from 'react';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import { Form, FloatingLabel } from 'react-bootstrap';
import logo from '../../assets/avatar.jpg';

const Signup = () => {
  // HOOKS
  const [errorSignup, setErrorSignUp] = useState({ isInvalid: false, error: '' });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      setErrorSignUp({ isInvalid: false, error: '' });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={logo} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form className="w-50" noValidate onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <FloatingLabel className="form-floating mb-3" label="Имя пользователя">
                    <Form.Control
                      placeholder="От 3 до 20 символов"
                      id="username"
                      name="username"
                      autoComplete="username"
                      required
                      className="form-control"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={errorSignup.isInvalid}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>Код ошибки</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel className="form-floating mb-3" label="Пароль">
                    <input
                      placeholder="Не менее 6 символов"
                      id="password"
                      name="password"
                      aria-describedby="passwordHelpBlock"
                      required
                      autoComplete="new-password"
                      type="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={errorSignup.isInvalid}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>Код ошибки</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel className="form-floating mb-3" label="Подтвердите пароль">
                    <Form.Control
                      placeholder="Пароли должны совпадать"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      autoComplete="new-password"
                      type="password"
                      className="form-control"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={errorSignup.isInvalid}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>Код ошибки</Form.Control.Feedback>
                  </FloatingLabel>
                  <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
