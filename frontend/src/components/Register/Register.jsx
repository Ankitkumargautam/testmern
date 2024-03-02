import React from 'react';
import useLogin from '../../hooks/useLogin';
import './style.css';

const Register = ({ setShowLogin }) => {
  return (
    <div className="register">
      <h3 className="register-heading">Register</h3>
      <form>
        <div className="register-field">
          <label>Name</label>
          <input type="text" placeholder="name" />
        </div>
        <div className="register-field">
          <label>Email</label>
          <input type="text" placeholder="email" />
        </div>
        <div className="register-field">
          <label>Password</label>
          <input type="text" placeholder="password" />
        </div>
        <button type="submit" className="register-submit">
          Register
        </button>
      </form>
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
