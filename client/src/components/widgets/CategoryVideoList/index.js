import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../../variables';
import VideoCard from '../VideoCard';

declare var lg;
declare var xl;

class CategoryVideoList extends Component {
    state = {
        videos: null,
    }

    componentWillMount() {
        this.loadVideos(this.props.category);
    }

    loadVideos(category) {
        axios.get(`${serverURL}/api/categories/${category}/videos`)
        .then( response => {
            if (response.data.data.length > 0) {
                let category_videos = response.data.data;
                for (let i = 0; i < category_videos.length; i ++) {
                    if (category_videos[i].id === this.props.current_video_id) {
                        category_videos.splice(i, 1);
                        break;
                    }
                }
                category_videos.splice(4);
                this.setState({
                    videos: category_videos,
                });
                window.scrollTo(0, 0)
            }
        })
    }

    render() {
        if (this.state.videos !== null && this.state.videos.length > 0) {
            return (
                <div className="videos container">
                    <div className="row">
                        <div className="col head-title mb-4">
                            <h4 className='borderBottom text-left'>{this.props.category} Videos</h4>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.videos.map( (item, i) => {
                            return (
                                <div key={i} className="col-lg-3 col-md-6 col-12">
                                    <VideoCard video={item} type={this.props.type} />
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
}

export default CategoryVideoList;