import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardSubtitle, Fade } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './categoriesPage.scss';

class CategoriesPage extends Component {
    
    state = {
        videos:[],
        category:null
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        axios.get(`http://korfilm.loc/api/categories/${props.match.params.slug}/videos`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
        axios.get(`http://korfilm.loc/api/categories/${props.match.params.slug}`)
        .then( response => {
            this.setState({category:response.data.data});
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    showVideos() {
        return this.state.videos.map( (item, i) => {
            return (
                <div key={i} className="col-3">
                    <Card>
                        <CardImg top width="100%" src={ item.featured_image_url } alt="Card image cap" />
                        <Link to={'/videos/' + item.slug} className='hover-posts'>
                            <span><FontAwesomeIcon icon='play'/>Watch Video</span>
                        </Link>
                        <CardBody>
                            <CardSubtitle>{ item.name }</CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            )
        } )
    }

    render() {
        return (
            <Fade in={true} tag="div">
            <div>
                <div className="banner">
                    { (this.state.category != null) && (<div className="banner-image row align-items-center text-center" style={ {
                        background: `url(${this.state.category.featured_image_url}) center center`,
                    }}>
                    <div className="banner-heading">
                        <h2 className="text-shadow-md">{this.state.category.name}</h2>
                    </div>
                    </div>)}
                </div>
                <div className="container videoList">
                    <div className="row">
                        { this.showVideos() }
                    </div>
                </div>
            </div>
            </Fade>
        )
    }
};

export default CategoriesPage;