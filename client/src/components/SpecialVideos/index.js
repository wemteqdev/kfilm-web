import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../widgets/VideoList';
import serverURL from '../../variables';

class SpeicalVideos extends Component {
    
    state = {
        videos:[]
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        axios.get(`${serverURL}/api/videos?view=${props.slug}`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="wrapper page-padding">
                <div className="container">
                    <div className="row">
                        <div className="col section-header">
                            <h1 className="title">{this.props.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <VideoList videos={this.state.videos}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default SpeicalVideos;
