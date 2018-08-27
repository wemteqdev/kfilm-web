import React, { Component } from 'react';
import './vertical-thumbs.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VerticalThumbs extends Component {
  render() {
    return (
      <div className="thumbs">
        <div id="carouselControls" className="carousel vert slide thumbnails" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block mx-auto img-fluid" src="1.png" alt="First slide"/>
              <div className="item-title">
                <span>Technology</span>
                <h6>The standard chunk of Lorem Ipsum used since.</h6>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block mx-auto img-fluid" src="2.png" alt="Second slide"/>
              <div className="item-title">
                <span>Technology</span>
                <h6>The standard chunk of Lorem Ipsum used since.</h6>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block mx-auto img-fluid" src="3.png" alt="Third slide"/>
              <div className="item-title">
                <span>Technology</span>
                <h6>The standard chunk of Lorem Ipsum used since.</h6>
              </div>
            </div>
          </div>
          <a className="up" href="#carouselControls" role="button" data-slide="prev">
            <FontAwesomeIcon icon="angle-up" />
          </a>
          <a className="down" href="#carouselControls" role="button" data-slide="next">
            <FontAwesomeIcon icon="angle-down" />
          </a>
        </div>
      </div>
    );
  }
}

export default VerticalThumbs;
