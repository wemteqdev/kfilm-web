import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import RelatedVideoList from '../RelatedVideoList';
import CategoryVideoList from '../CategoryVideoList';

class Video extends Component {

    showVideo = () => {
        let video = this.props.video
        if (video.embed === null && video.featured_video !== null) {
            return (
                <div className="flex-video widescreen">
                    <div
                        dangerouslySetInnerHTML={{
                        __html: video.featured_video.embed
                        }}>
                    </div>
                </div>
            )
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
                    { this.props.type === "unlogin" && 
                        <div className="click-here w-100 text-center">
                            <Link to={`/login`} className="btn button more-button">Click here to see full video</Link>
                        </div>
                    }
                </div>
            )
        }
    }

    videoURL(slug) {
        if (this.props.type === "pro") {
            return '/user/videos/' + slug;
        }
        else {
            return '/videos/' + slug;
        }
    }

    displaySeries = () => {
        if (this.props.video.series === null) {
            return;
        }
        let series_videos = this.props.video.series.videos;
        return (
            <div className="container my-3 series">
                {series_videos.map( (item, index) => {
                    return (
                        <Link key={index} to={this.videoURL(item.slug)} className={`series-index m-2 btn ${
                            item.slug === this.props.video.slug ? 'btn-light' : (item.is_pro ? 'btn-danger' : 'btn-secondary')}
                        `}>
                            {item.series_number}
                        </Link>
                    )
                })}
            </div>
        )
        
    }

    displayLike = () => {
        if (this.props.type === "pro") {
            if (this.props.like) {
                return <FontAwesomeIcon icon="heart" className="text-danger my-2 like-heart"/>
            } else {
                return <button className="like-button ml-5 btn btn-secondary" onClick={this.props.toggleLike}><FontAwesomeIcon icon="heart" /> Like</button>
            }
        }
    }

    displayVideoDetail = () => {
        return (
            <div className="container">
                <div className="d-flex my-3">
                    { this.props.type === "free" && 
                        <div className="w-100 text-center">
                            <Link to={`/user/plan`} className="btn button more-button">Click here to upgrade your profile</Link>
                        </div>
                    }
                </div>
                <div className="d-flex my-3">
                    { this.props.video.is_pro ? 
                        <div className="user-stats px-3 py-1 text-white">PRO</div>
                    :
                        <div className="free-stats px-3 py-1 text-white">FREE</div>
                    }
                    <div className="ml-5 line-height-props">
                        <FontAwesomeIcon icon="eye" /> { this.props.video.views  }
                    </div>
                    <div className="ml-5 line-height-props">
                        <FontAwesomeIcon icon="clock" /> { this.props.video.formatted_duration }
                    </div>
                </div>
                <div className="d-flex my-3">
                    <span className="video-name">{this.props.video.name}</span>&nbsp;&nbsp;&nbsp;
                    {this.displayLike()}
                </div>
            </div>
        )
    }
    
    render (){
        if (this.props.video === null) {
            return <div></div>;
        }
        return (
            <section className="fullwidth-single-video">
                <div className="bgBlack">
                    <div className="container">
                        { this.showVideo()}
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row stripe-even video-page">
                        {this.displayVideoDetail()}
                        {this.displaySeries()}
                    </div>
                    { this.props.video.related.length > 0 && 
                        <div className="row pt-5 stripe">
                            <RelatedVideoList videos={this.props.video.related} type={this.props.type === "pro" ? "pro" : "free"}/>
                        </div>
                    }
                    <div className="row pt-5 stripe">
                        <CategoryVideoList category={this.props.video.categories[0]} current_video_id={this.props.video.id} type={this.props.type === "pro" ? "pro" : "free"}/>
                    </div>
                </div>
            </section>
        );
    }
};

export default Video;
