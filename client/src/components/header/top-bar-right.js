import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.scss';

class TopBarRight extends Component {
  render() {
    return (
      <div className="top-bar-right">
        <div className="upl-btn">
          <a href="">UPLOAD VIDEO</a>
        </div>
        <div className="search">
          <a href=""><FontAwesomeIcon icon='search' /></a>
        </div>
      </div>
    );
  }
}

export default TopBarRight;
