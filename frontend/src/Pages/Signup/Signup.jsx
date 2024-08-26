import { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Form, FloatingLabel } from 'react-bootstrap';
import logo from '../../assets/avatar.jpg';
import useAuth from '../../auth/hook.jsx';
import { useAddNewUserMutation } from '../../store/api.js';

const Signup = () => {
  // HOOKS
  const [errorSignup, setErrorSignUp] = useState({ isInvalid: false, error: '' });
  const [addNewUser] = useAddNewUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useAuth();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const fromPage = location?.state?.from?.pathname || '/';

  const onHandleSubmit = async (values) => {
    try {
      const { data } = await addNewUser({ username: values.username, password: values.password });
      localStorage.setItem('userId', data.token);
      localStorage.setItem('userName', data.username);
      logIn();
      navigate(fromPage);
      setErrorSignUp({ isInvalid: false, error: '' });
    } catch (e) {
      setErrorSignUp({ isInvalid: true, error: e.message });
      console.log(errorSignup);
    }
  };

  const signupSchema = yup.object().shape({
    username: yup.string().min(3).max(20).required('Обязательное поле'),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
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
                    <img src={logo} className="rounded-circle" alt="Регистрация" />
                  </div>
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <Form.Group controlId="validationUsername">
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <FloatingLabel className="form-floating mb-3" label="Имя пользователя">
                        <Form.Control
                          placeholder="От 3 до 20 символов"
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
                      <FloatingLabel className="form-floating mb-3" label="Пароль">
                        <Form.Control
                          placeholder="Не менее 6 символов"
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
                      <FloatingLabel className="form-floating mb-4" label="Подтвердите пароль">
                        <Form.Control
                          placeholder="Пароли должны совпадать"
                          name="confirmPassword"
                          type="password"
                          className="form-control"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isInvalid={errors.confirmPassword && touched.confirmPassword}
                          onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>{errors.confirmPassword}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
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
