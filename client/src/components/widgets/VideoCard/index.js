import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
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
            <Card className="video-card d-flex">
                <div className="card-img" style={{background:`url(${this.props.video.featured_image_url}) center center`}}></div>
                <Link to={this.videoURL(this.props.video.slug)} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                </Link>
                <div className="video-stats pt-1 px-0 align-self-end w-100 container">
                    <div className="mt-1 d-flex justify-content-end">
                        { this.props.video.is_pro ? 
                            <div className="user-stats px-3 py-1 text-white">PRO</div>
                        :
                            <div className="free-stats px-3 py-1 text-white">FREE</div>
                        }
                        <div className="mx-3 line-height-props">
                            <FontAwesomeIcon icon="heart" className="text-danger" /> { this.props.video.likes }
                        </div>
                        <div className="mx-3 line-height-props">
                            <FontAwesomeIcon icon="eye" /> { this.props.video.views  }
                        </div>
                        <div className="mx-3 line-height-props">
                            <FontAwesomeIcon icon="clock" /> { this.props.video.formatted_duration }
                        </div>
                    </div>
                    <h4>{ this.props.video.name }</h4>
                </div>
            </Card>
        )
    }
}
