import React, { Component } from 'react';
import VideoBox from './video-box';

export default class MostView extends Component {

  render() {
    return (
      <div className="widgetBox">
        <div className="widgetTitle">
          <h5>Most View Videos</h5>
        </div>
        <div className="widgetContent">
          <VideoBox/>
        </div>
      </div>
    );
  }
}

