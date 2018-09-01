
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const MediaObject = (props) => {
    return (
        <div className="media-object stack-for-small">
            <div className="media-object-section">
            <div className="recent-img">
                <img src={props.video.featured_image_url} alt="recent"/>
                <Link to={'/videos/' + props.video.slug} className="hover-posts">
                    <span><FontAwesomeIcon icon='play'/></span>
                </Link>
            </div>
            </div>
            <div className="media-object-section">
                <div className="media-content">
                    <h6><Link to={'/videos/' + props.video.slug}>{props.video.name}</Link></h6>
                    <p>
                        <FontAwesomeIcon icon="clock"/>
                        <span>{props.video.duration}</span>
                        <FontAwesomeIcon icon="calendar"/>
                        <span>{props.video.published_at}</span>
                        <FontAwesomeIcon icon="eye"/>
                        <span>{props.video.views}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default MediaObject;