import React from 'react';
import useLogin from '../../hooks/useLogin';
import './style.css';

const Login = ({ setShowLogin }) => {
  return (
    <div className="login">
      <h3 className="login-heading">Login</h3>
      <form>
        <div className="login-field">
          <label>Email</label>
          <input type="text" placeholder="email" />
        </div>
        <div className="login-field">
          <label>Password</label>
          <input type="text" placeholder="password" />
        </div>
        <button type="submit" className="login-submit">
          Login
        </button>
      </form>
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
