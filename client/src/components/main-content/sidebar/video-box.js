import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const VideoBox = (props) => {
    return (
        <div className="video-box thumb-border">
            <div className="video-img-thumb">
                <img src={props.image} alt="most viewed videos"/>
                <a className="hover-posts">
                    <span><FontAwesomeIcon icon="play" />Watch Video</span>
                </a>
            </div>
            <div className="video-box-content">
            <h6><Link to={props.link}>{props.title}</Link></h6>
            <p>
                <span><FontAwesomeIcon icon="user" /><Link to={props.authorLink}>{props.author}</Link></span>
                <span><FontAwesomeIcon icon="clock" />{props.date}</span>
                <span><FontAwesomeIcon icon="eye" />{props.views}</span>
            </p>
            </div>
        </div>
    );
}

export default VideoBox;