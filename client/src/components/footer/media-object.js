import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class MediaObject extends Component {
  render() {
    return (
      <div className="media-object">
        <div className="media-object-section">
          <div className="recent-img">
            <img src="1.jpg" alt="recent"/>
            <a className="hover-posts">
              <span><FontAwesomeIcon icon="play"/></span>
            </a>
          </div>
        </div>
        <div className="media-object-section">
          <div className="media-content">
            <h6><a>The lorem Ipsumbeen the industry's standard.</a></h6>
            <p>
              <FontAwesomeIcon icon="user"/><span>admin</span>
              <FontAwesomeIcon icon="clock"/><span>5 january 16</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
