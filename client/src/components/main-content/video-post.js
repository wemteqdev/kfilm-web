import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VideoPost extends Component {

  render() {
    return (
      <div className="post thumb-border">
        <div className="post-thumb">
          <img src="1.jpg" alt="new video"/>
          <a href="single-video-v2.html" className="hover-posts">
            <span><i className="fa fa-play"></i>Watch Video</span>
          </a>
          <div className="video-stats clearfix">
            <div className="thumb-stats float-left">
                <h6>HD</h6>
            </div>
            <div className="thumb-stats float-left">
                <i className="fa fa-heart"></i>
                <span>506</span>
            </div>
            <div className="thumb-stats float-right">
                <span>05:56</span>
            </div>
          </div>
        </div>
        <div className="post-des">
          <h6><a href="single-video-v2.html">There are many variations of passage.</a></h6>
          <div className="post-stats clearfix">
            <p className="float-left">
              <FontAwesomeIcon icon="user" />
              <span><a>admin</a></span>
            </p>
            <p className="float-left">
              <FontAwesomeIcon icon="clock" />
              <span>5 January 16</span>
            </p>
            <p className="float-left">
              <FontAwesomeIcon icon="eye" />
              <span>1,862K</span>
            </p>
          </div>
          <div className="post-summary">
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPost;





