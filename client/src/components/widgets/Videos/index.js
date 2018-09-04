import React, { Component } from 'react';
import axios from 'axios';
import Carousel from './Carousel';


class Videos extends Component {

    state = {
        videos:[],
    }

    componentWillMount(){
        axios.get(`http://korfilm.loc/api/videos`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }

    showCarousel = () => {
        if (this.state.videos.length === 0)
            return <div></div>
        else
            return <Carousel name='Videos' videos={this.state.videos} icon='video'/> 
    }
    render() {
        return (
            <div className="videos-widget">
                { this.showCarousel() }
            </div>
        )
    }
}

export default Videos;
