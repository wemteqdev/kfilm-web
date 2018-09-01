import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';

class CategoriesPage extends Component {
    
    state = {
        videos:[]
    }

    componentWillMount(){
        this.loadVideos()
    }

    loadVideos() {
        axios.get(`http://korfilm.loc/api/categories/${this.props.match.params.slug}/videos`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos()
    }

    showVideos() {
        return this.state.videos.map( (item, i) => {
            return (
                <div key={i} className="col-3">
                    <Card>
                        <CardImg top width="100%" src={ item.featured_image_url } alt="Card image cap" />
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
            <div className="container">
                <div className="row">
                    { this.showVideos() }
                </div>
            </div>
        )
    }
};

export default CategoriesPage;