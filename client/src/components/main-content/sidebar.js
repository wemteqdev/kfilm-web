import React, { Component } from 'react';
import './sidebar.scss'
import SearchVideo from './sidebar/search-video';
import MostView from './sidebar/most-view';
import RecentPost from './sidebar/recent-post';
import Tags from './sidebar/tags';

class Sidebar extends Component {
  render() {
    return ( 
      <aside className="sidebar">
        <div className="sidebarBg"></div>
        <div className="row">
          <div className="col-12 px-0">
            <SearchVideo/>
          </div>
          <div className="col-12 px-0">
            <MostView/>
          </div>
          <div className="col-12 px-0">
            <RecentPost/>
          </div>
          <div className="col-12 px-0">
            <Tags/>
          </div>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
