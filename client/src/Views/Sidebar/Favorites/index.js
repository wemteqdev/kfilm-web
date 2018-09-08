import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../../../components/widgets/VideoList';
import serverURL from '../../../variables';

export default class Favorites extends Component {

    state = {
        videos : []
    }

    componentWillMount = () => {
        axios.get(`${serverURL}/api/user/favorite_videos`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }
    
    

    render() {
        return (
            <div className="container page-padding">
                <div className="row">
                    <div className="section-header text-center">
                        <h1 className="title">Your favorites</h1>
                    </div>
                </div>
                <div>
                    <VideoList videos={this.state.videos} size="3"/>
                </div>
            </div>
        )
    }
}
