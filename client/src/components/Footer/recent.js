import React, { Component } from 'react';
import MediaObject from './media-object';

class Recent extends Component {
  render() {
    return (
      <div className="widgetBox">
        <div className="widgetTitle">
          <h5>Recent Videos</h5>
        </div>
              
        <div className="widgetContent">
          <MediaObject/>
        </div>
      </div>
    );
  }
}

export default Recent;
