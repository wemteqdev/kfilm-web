import React, { Component } from 'react';
import VideoCard from '../VideoCard';

export default class RelatedVideoList extends Component {

    constructor(props) {
        super(props);
        this.showVideos = this.showVideos.bind(this)
    }


    showVideos() {
        if (this.props.videos === undefined) {
            return <div></div>
        }
        else {
            return this.props.videos.map( (item, i) => {
                return (
                    <div key={i} className="col-md-4 col-sm-6 col-12">
                        <VideoCard video={item} type={this.props.type} />
                    </div>
                )
            } )
        }
    }

    render() {
        return (
            <div className="row">
                { this.showVideos() }
            </div>
        )
    }
}
