import React, { Component } from 'react';
import axios from 'axios';
import './videoPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoList from '../widgets/VideoList';

class VideoPage extends Component {
    
    state = {
        video : {},
        like: false
    }

    constructor(props) {
        super(props)
        this.addHistory = this.addHistory.bind(this)
        this.toggleLike = this.toggleLike.bind(this)
    }

    toggleLike() {
        let like = !this.state.like
        this.setState({like: like})
        if (like) {
            axios.post(`http://korfilm.loc/api/user/videos/${this.state.video.slug}/like`)
            .then( response => {
            })    
        }
        else {
            axios.delete(`http://korfilm.loc/api/user/videos/${this.state.video.slug}/unlike`)
            .then( response => {
            })
        }
    }
    addHistory() {
        axios.post(`http://korfilm.loc/api/user/videos/${this.state.video.slug}/add_history`)
        .then( response => {
        })
    }

    loadVideo(props, history) {
        axios.get(`http://korfilm.loc/api/user/videos/${props.match.params.slug}`)
        .then( response => {
            this.setState({video:response.data.data, like:response.data.data.is_favorited});
            if (history) {
                setTimeout(
                    this.addHistory,
                    this.state.video.duration / 2
                );
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideo(nextProps, true)

    }

    componentWillMount = () => {
        this.loadVideo(this.props, false)
    }
    

    render (){
        return (
            <section className="fullwidth-single-video">
                <div className='container'>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="flex-video widescreen">
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: this.state.video.embed
                                    }}>
                                </div>
                            </div>
                            {
                                this.state.like && <button className="btn btn-primary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            {
                                !this.state.like && <button className="btn btn-secondary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            <div className="mt-5 mb-5">
                                <VideoList videos={this.state.video.related} size="3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default VideoPage;



