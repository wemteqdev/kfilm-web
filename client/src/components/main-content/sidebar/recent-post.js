import React, { Component } from 'react';
import MediaObject from './media-object';

export default class RecentPost extends Component {

  render() {
    return (
      <div className="widgetBox">
        <div className="widgetTitle">
          <h5>Recent Post Videos</h5>
        </div>
        <div className="widgetContent">
          <MediaObject/>
        </div>
      </div>
    );
  }
}

