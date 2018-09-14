import React, { Component } from 'react';
import VideoCard from '../VideoCard';

export default class VideoList extends Component {

    constructor(props) {
        super(props);
        this.showVideos = this.showVideos.bind(this)
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

    showVideos() {
        if (this.props.videos === undefined) {
            return <div></div>
        }
        else {
            return this.props.videos.map( (item, i) => {
                return (
                    <div key={i} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                        <VideoCard video={item} type={this.props.type} />
                    </div>
                )
            } )
        }
    }

    render() {
        return (
            this.showVideos()
        )
    }
}
