import React from 'react';
import VideoCard from '../VideoCard';

const RelatedVideoList = (props) => {
    if (props.videos !== undefined && props.videos.length > 0) {
        return (
            <div className="my-5 videos container-fluid">
                <div className="row">
                    <div className="col head-title mb-4">
                        <h4 className='borderBottom text-left'>Related</h4>
                    </div>
                </div>
                <div className="row">
                    {props.videos.map( (item, i) => {
                        return (
                            <div key={i} className="col-lg-3 col-md-6 col-12">
                                <VideoCard video={item} type={props.type} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default RelatedVideoList;