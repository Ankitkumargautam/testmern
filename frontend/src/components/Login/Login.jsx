import React from 'react';
import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import './style.css';

const Login = ({ setShowLogin }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASEURL}/api/login`,
      values
    );
    console.log('data: ', data);
    setSubmitting(false);
  };
  return (
    <div className="login">
      <h3 className="login-heading">Login</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="login-field">
              <label>Email</label>
              <Field type="text" name="email" placeholder="email" />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <div className="login-field">
              <label>Password</label>
              <Field type="text" name="password" placeholder="password" />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="login-submit"
            >
              {isSubmitting ? 'Login...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        Click here to{' '}
        <span
          className="login-register"
          onClick={() => {
            setShowLogin(false);
          }}
        >
          register
        </span>
      </p>
    </div>
  );
};

export default Login;
