import React, { Component } from 'react';
import './topbar.scss';

class LoginRegister extends Component {
  render() {
    return (
      <div className="top-button">
        <ul className="menu float-right">
          <li>
              <a href="login-register.html">Register</a>
          </li>
          <li className="dropdown-login">
              <a className="loginReg" href="login.html">login</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default LoginRegister;
