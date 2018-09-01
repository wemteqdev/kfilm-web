import React, { Component } from 'react';
import './videoPage.scss'
import axios from 'axios';

class VideoPage extends Component {
    
    state = {
        video : {},
    }

    componentWillMount(){
        axios.get(`http://korfilm.loc/api/videos/${this.props.match.params.slug}`)
        .then( response => {
            this.setState({video:response.data.data});
        })
    }

    render (){
        console.log(this.state.video)
        return (
            <section className="fullwidth-single-video">
                <div className='container'>
                    <div className="row">
                    <div className="col-12">
                        <div className="flex-video widescreen">
                            { console.log(this.state.video) }
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



