import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class VideoList extends Component {

    constructor(props) {
        super(props);
        this.showVideos = this.showVideos.bind(this)
    }

    showVideos() {
        if (this.props.videos === undefined) {
            return <div></div>
        }
        else {
            return this.props.videos.map( (item, i) => {
                return (
                    <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <Card className="video-card">
                            <CardImg top width="100%" src={ item.featured_image_url } alt="Card image cap" />
                            <Link to={'/videos/' + item.slug} className='hover-posts' onClick={this.props.toggleSearch}>
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
    }

    render() {
        return (
            <div className="row">
                { this.showVideos() }
            </div>
        )
    }
}
