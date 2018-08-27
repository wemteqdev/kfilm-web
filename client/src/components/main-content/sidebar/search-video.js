import React, { Component } from 'react';

export default class SearchVideo extends Component {

  render() {
    return (
      <div className="widgetBox">
        <div className="widgetTitle">
          <h5>Search Videos</h5>
        </div>
        <form id="searchform" method="get" role="search">
          <div className="input-group">
            <input className="input-group-field" type="text" placeholder="Enter your keyword"/>
            <div className="input-group-button">
              <input type="submit" className="button" value="Submit"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}






