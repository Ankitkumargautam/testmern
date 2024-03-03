import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import axios from 'axios';

const Register = ({ setShowLogin }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASEURL}/api/register`,
      values
    );
    console.log('data: ', data);
    setSubmitting(false);
  };

  return (
    <div className="register">
      <h3 className="register-heading">Register</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="register-field">
              <label>Name</label>
              <Field type="text" name="name" placeholder="name" />
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="error-message"
            />
            <div className="register-field">
              <label>Email</label>
              <Field type="text" name="email" placeholder="email" />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <div className="register-field">
              <label>Password</label>
              <Field type="password" name="password" placeholder="password" />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
            <button
              type="submit"
              className="register-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Click here to{' '}
        <span
          className="register-login"
          onClick={() => {
            setShowLogin(true);
          }}
        >
          login
        </span>
      </p>
    </div>
  );
};

export default Register;
