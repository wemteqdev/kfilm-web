import React, { Component } from 'react';
import 'bootstrap/scss/bootstrap.scss'
import './navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavMenu extends Component {
  render() {
    return (
      <div className="top-bar-middle">
        <ul className="menu">
          <li className="selected">
            <a href="" tabIndex="0"><FontAwesomeIcon icon='home' /> Home</a>
          </li>
          <li>
            <a href="" tabIndex="1"><FontAwesomeIcon icon='film' /> Videos</a>
          </li>
          <li>
            <a href="" tabIndex="2"><FontAwesomeIcon icon='th' /> Category</a>
          </li>
          <li>
            <a href="" tabIndex="3"><FontAwesomeIcon icon='edit' /> Blog</a>
          </li>
          <li>
            <a href="" tabIndex="4"><FontAwesomeIcon icon='magic' /> Features</a>
          </li>
          <li>
            <a href="" tabIndex="5"><FontAwesomeIcon icon='user' /> About</a>
          </li>
          <li>
            <a href="" tabIndex="6"><FontAwesomeIcon icon='envelope' /> Contact</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavMenu;
