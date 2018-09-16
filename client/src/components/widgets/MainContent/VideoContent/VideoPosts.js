import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Card, CardImgOverlay } from 'reactstrap';
import axios from 'axios';
import serverURL from '../../../../variables';

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
            <Card className="post-thumb d-flex">
                <div className="card-img" style={{background:"url(" + item.featured_image_url + ") center"}}></div>
                <Link to={'/videos/' + item.slug} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                </Link>
                <CardImgOverlay className="video-stats px-3 py-1 align-self-end container d-flex justify-content-between">
                    { item.is_pro ? 
                        <div className="user-stats px-3 py-1 text-white">PRO</div>
                    :
                        <div className="free-stats px-3 py-1 text-white">FREE</div>
                    }
                    <div className="mx-3 text-white line-height-props">
                        <FontAwesomeIcon icon="clock" /> { item.formatted_duration }
                    </div>
                </CardImgOverlay>
            </Card>
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
        if (this.state.posts !== null) {
            return this.state.posts.map( (item, i) => {
                return (
                    <div key={i} className="item col-md-3 col-sm-6 col-12 group-item-secondary-button grid-medium">
                        <div className="post">
                            { this.showThum(item) }
                            { this.showDesc(item) }
                        </div>
                    </div>
                )
            } )
        } else {
            return <div></div>
        }
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





