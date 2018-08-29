import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TopBarRight extends Component {
  render() {
    return (
      <div className="top-bar-right">
        <div className="search">
          <Link to="search"><FontAwesomeIcon icon='search' /></Link>
        </div>
      </div>
    );
  }
}

export default TopBarRight;
