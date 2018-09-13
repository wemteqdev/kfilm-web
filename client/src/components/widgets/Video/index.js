import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import RelatedVideoList from '../RelatedVideoList';

class Video extends Component {
    
    constructor(props) {
        super(props)
        this.showVideo = this.showVideo.bind(this)
    }

    showVideo() {
        let video = this.props.video
        if (video.embed === null && video.featured_video !== null) {
            return (
                <div className="flex-video widescreen">
                    <div
                        dangerouslySetInnerHTML={{
                        __html: video.featured_video.embed
                        }}>
                    </div>
                </div>)
        }
        if( video.embed !== null) {
            return (
                <div className="flex-video widescreen">
                    <div
                        dangerouslySetInnerHTML={{
                        __html: video.embed
                        }}>
                    </div>
                </div>)
        }
        if (video.embed === null && video.featured_video === null) {
            let style = {
                background:`url(${video.featured_image_url}) center center`,
                height: '50vh',
                backgroundSize: 'cover'
            }
           return ( 
                <div style={style}>
                </div>
            )
        }
    }
    
    render (){
        return (
            <section className="fullwidth-single-video">
                <div className="bgBlack">
                    <div className="container">
                        
                        { this.showVideo()}
                    </div>
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            
                            { this.props.type === "free" && 
                                <div className="mt-2 mb-5">
                                    <Link to={`/user/videos/${this.props.slug}`} className="btn button more-button">To see full video Click here</Link>
                                </div>
                            }
                            {
                                this.props.type === "pro" && this.props.like && <button className="btn btn-primary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            {
                                this.props.type === "pro" && !this.props.like && <button className="btn btn-secondary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            
                            <div className="mt-5 mb-5 videos">
                                <div className="head-title mb-4">
                                    <h4 className='borderBottom text-left'>Related</h4>
                                </div>
                                <RelatedVideoList videos={this.props.video.related} type={this.props.type === "pro" ? "pro" : "free"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

  
export default Video;
