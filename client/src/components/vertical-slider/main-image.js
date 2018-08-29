import React, { Component } from 'react';
import './vertical-slider.scss'

class MainImage extends Component {
  render() {
    return (
      <div className="main-image">
        <div className="image">
          <img src="images/1.png" width="800px" alt="sample"/>
        </div>
      </div>
    );
  }
}

export default MainImage;
