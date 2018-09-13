import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class VideoCard extends Component {

    constructor(props) {
        super(props);
        this.videoURL = this.videoURL.bind(this)
    }

    videoURL(slug) {
        if (this.props.type === "pro") {
            return '/user/videos/' + slug;
        }
        else {
            return '/videos/' + slug;
        }
    }

    render() {
        return (
            <Card className="video-card">
                <div className="card-img" style={{background:`url(${this.props.video.featured_image_url}) center center`}}></div>
                <Link to={this.videoURL(this.props.video.slug)} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                </Link>
                <div className="video-stats clearfix">
                    { this.props.video.is_pro && <div className="thumb-stats pro-stats float-left">
                        <span className="">PRO</span>
                    </div>
                    }
                    <div className="thumb-stats float-right">
                        <span>{ this.props.video.formatted_duration }</span>
                    </div>
                </div>
                <CardBody>
                    <CardSubtitle>{ this.props.video.name }</CardSubtitle>
                </CardBody>
            </Card>
        )
    }
}
