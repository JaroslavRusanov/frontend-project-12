import { Formik, Field, Form } from 'formik';
import logo from './download.jpeg';

const Login = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img src={logo} className="rounded-circle" alt="Войти" />
            </div>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={({ setSubmitting }) => {
                console.log('Form is validated! Submitting the form...');
                setSubmitting(false);
              }}
            >
              {() => (
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <Field
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder="Ваш ник"
                      id="username"
                      className="form-control"
                      label="username"
                    />
                  </div>
                  <div className="form-floating mb-4">
                    <Field
                      name="password"
                      autoComplete="current-password"
                      required=""
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      className="form-control"
                      label="password"
                    />
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </Form>
              )}
            </Formik>
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

export default Login;
