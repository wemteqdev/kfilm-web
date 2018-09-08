import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import serverURL from '../../variables';

class SpeicalVideos extends Component {
    
    state = {
        videos:[]
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        axios.get(`${serverURL}/api/videos?view=${props.match.params.slug}`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    showVideos() {
        return this.state.videos.map( (item, i) => {
            return (
                <div key={i} className="col-3">
                    <Card className="video-card">
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
            <div className="container videoList">
                <div className="row">
                    { this.showVideos() }
                </div>
            </div>
        )
    }
};

export default SpeicalVideos;