import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from '../../../../variables';
import TimeFormat from 'hh-mm-ss';

class VideoPosts extends Component {

    state = {
        posts:[],
        type:''
    }

    constructor(props) {
        super(props)

        this.state.type = props.type
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/videos?view=${this.state.type}&limit=4`)
        .then( response => {
            this.setState({posts:response.data.data});
        })
    }

    showThum = (item) => {
        return (
            <div className="post-thumb" style={{background:"url(" + item.featured_image_url + ") center"}}>
                
                <Link to={'/videos/' + item.slug} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                </Link>
                <div className="video-stats clearfix">
                    <div className="thumb-stats float-right">
                        <span>{ TimeFormat.fromS(item.duration) }</span>
                    </div>
                </div>
            </div>
        )
    }

    showDesc = (item) => {
        return (
            <div className="post-des">
                <h6 className="fixed"><Link to={'/videos/' + item.slug}>{item.name}</Link></h6>
                <div className="post-stats clearfix">
                    <div className="float-left">
                        <FontAwesomeIcon icon="calendar" />
                        <span>{item.published_at}</span>
                    </div>
                    <div className="float-left">
                        <FontAwesomeIcon icon="eye" />
                        <span>{item.views}</span>
                    </div>
                </div>
            </div>
        )
    }

    showAll = () => {
        return this.state.posts.map( (item, i) => {
            return (
                <div key={i} className="item col-lg-3 col-md-4 col-sm-6 col-12 group-item-secondary-button grid-medium">
                    <div className="post">
                        { this.showThum(item) }
                        { this.showDesc(item) }
                    </div>
                </div>
            )
        } )
    }
    render() {
        return (
            <div className="row">
                { this.showAll() }
            </div>
        )
    }
}

export default VideoPosts;





