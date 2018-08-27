import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class VideoBox extends Component {
  render() {
    return (
      <div className="video-box thumb-border">
        <div className="video-img-thumb">
          <img src="2.jpg" alt="most viewed videos"/>
          <a className="hover-posts">
            <span><FontAwesomeIcon icon="play" />Watch Video</span>
          </a>
        </div>
        <div className="video-box-content">
          <h6><a>There are many variations of passage. </a></h6>
          <p>
            <span><FontAwesomeIcon icon="user" /><a>admin</a></span>
            <span><FontAwesomeIcon icon="clock" />5 January 16</span>
            <span><FontAwesomeIcon icon="eye" />1,862K</span>
          </p>
        </div>
      </div>
    );
  }
}

