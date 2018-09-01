import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

class VideoPosts extends Component {

    state = {
        posts:[],
        category:0
    }

    constructor(props) {
        super(props)

        this.state.category = props.category
    }

    componentWillMount(){
        axios.get(`http://korfilm.loc/api/categories/${this.state.category}/videos`)
        .then( response => {
            this.setState({posts:response.data.data});
        })
    }

    showThum = (item) => {
        return (
            <div className="post-thumb">
                <img src={item.featured_image_url} alt="new video"/>
                <Link to={'/videos/' + item.slug} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                </Link>
                <div className="video-stats clearfix">
                    <div className="thumb-stats float-right">
                        <span></span>
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
                    <p className="float-left">
                        <FontAwesomeIcon icon="clock" />
                        <span>{item.duration}</span>
                    </p>
                    <p className="float-left">
                        <FontAwesomeIcon icon="calendar" />
                        <span>{item.published_at}</span>
                    </p>
                    <p className="float-left">
                        <FontAwesomeIcon icon="eye" />
                        <span>{item.views}</span>
                    </p>
                </div>
            </div>
        )
    }

    showAll = () => {
        return this.state.posts.map( (item, i) => {
            return (
                <div key={i} className="item col-4 group-item-secondary-button grid-medium">
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





