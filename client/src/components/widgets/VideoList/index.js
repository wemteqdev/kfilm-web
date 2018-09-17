import React from 'react';
import VideoCard from '../VideoCard';

const VideoList = (props) => {
    if (props.videos !== undefined && props.videos.length > 0) {
        return props.videos.map( (item, i) => {
            return (
                <div key={i} className={`col-md-6 col-xs-12 col-lg-${props.size}`}>
                    <VideoCard video={item} type={props.type} />
                </div>
            )
        } )
    } else {
        return <div></div>
    }
}

export default VideoList;