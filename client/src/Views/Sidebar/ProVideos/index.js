import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../../../components/widgets/VideoList';
import serverURL from '../../../variables';

export default class ProVideos extends Component {

    state = {
        videos : []
    }

    componentWillMount = () => {
        axios.get(`${serverURL}/api/videos?type=pro`)
        .then( response => {
            if (response.data.data.length > 0){
                this.setState({videos:response.data.data});
            }
        })
    }

    render() {
        return (
            <div className="container page-padding">
                <div className="row">
                    <div className="section-header text-center">
                        <h1 className="title">Pro Videos</h1>
                    </div>
                </div>
                <div>
                    <VideoList videos={this.state.videos} size="3"/>
                </div>
            </div>
        )
    }
}
