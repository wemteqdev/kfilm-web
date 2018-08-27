import React, { Component } from 'react';
import './left-sidebar-content.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup } from 'reactstrap';
import VideoPost from './video-post';

class VideoContent extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onGridSystem = this.onGridSystem.bind(this);
  }

  onGridSystem(gSelected) {
    this.setState({ gSelected });
  }

  render() {
    return (
      <section className="content">
        <div className="main-heading borderBottom">
          <div className="row py-3">
            <div className="col-12">
              <div className="head-title">
                <FontAwesomeIcon icon="film" />
                <h4>Newest Videos</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row head-text">
              <p className="float-left my-0">All Videos : <span>1,862 Videos posted</span></p>
              <div className="grid-system float-right show-for-large">
                <ButtonGroup>
                  <Button onClick={() => this.onGridSystem(1)}><FontAwesomeIcon icon="th" /></Button>
                  <Button onClick={() => this.onGridSystem(2)}><FontAwesomeIcon icon="th-large" /></Button>
                  <Button onClick={() => this.onGridSystem(3)}><FontAwesomeIcon icon="th-list" /></Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="tab-content">
              <div className="row">
                <div className="item col-6 group-item-secondary-button grid-medium">
                  <VideoPost/>
                </div>        
              </div>
            </div>
            <div className="text-center row-btn">
              <a className="button radius">View All Video</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default VideoContent;
