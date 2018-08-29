
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const MediaObject = (props) => {
    return (
        <div className="media-object stack-for-small">
            <div className="media-object-section">
            <div className="recent-img">
                <img src={props.image} alt="recent"/>
                <a className="hover-posts">
                <span><FontAwesomeIcon icon="play"/></span>
                </a>
            </div>
            </div>
            <div className="media-object-section">
                <div className="media-content">
                    <h6><Link to={props.link}>{props.title}</Link></h6>
                    <p><FontAwesomeIcon icon="user"/><span>{props.author}</span><FontAwesomeIcon icon="clock"/><span>{props.date}</span></p>
                </div>
            </div>
        </div>
    );
}


export default MediaObject;