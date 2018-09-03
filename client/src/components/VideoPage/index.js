import React, { Component } from 'react';
import './videoPage.scss'
import axios from 'axios';

class VideoPage extends Component {
    
    state = {
        video : {},
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        axios.get(`http://korfilm.loc/api/videos/${props.match.params.slug}`)
        .then( response => {
            this.setState({video:response.data.data});
        })
    }
    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    render (){
        return (
            <section className="fullwidth-single-video">
                <div className='container'>
                    <div className="row">
                    <div className="col-12">
                        <div className="flex-video widescreen">
                            <div
                                dangerouslySetInnerHTML={{
                                __html: this.state.video.embed
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        );
    }
};

export default VideoPage;



