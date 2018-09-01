import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopBarRight extends Component {
  render() {
    return (
      <div className="top-bar-right">
        <div className="login ml-5">
          <Link to="/login" className="loginReg">Log in / Register</Link>
        </div>
      </div>
    );
  }
}

export default TopBarRight;
