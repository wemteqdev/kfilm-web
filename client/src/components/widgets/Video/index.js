import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VideoList from '../VideoList';

class Video extends Component {
    render (){
        return (
            <section className="fullwidth-single-video">
                <div className="flex-video widescreen">
                    <div
                        dangerouslySetInnerHTML={{
                        __html: this.props.video.embed
                        }}>
                    </div>
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-12 text-center">
                            {
                                this.props.type === "pro" && this.props.like && <button className="btn btn-primary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            {
                                this.props.type === "pro" && !this.props.like && <button className="btn btn-secondary like-button" onClick={this.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
                            }
                            <div className="mt-5 mb-5">
                                <VideoList videos={this.props.video.related}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

  
export default Video;
