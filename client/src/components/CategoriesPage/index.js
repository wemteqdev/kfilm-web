import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../widgets/VideoList';
import './categoriesPage.scss';
import serverURL from '../../variables';

class CategoriesPage extends Component {
    
    state = {
        videos:[],
        category:{}
    }

    componentWillMount(){
        this.loadVideos(this.props)
    }

    loadVideos(props) {
        axios.get(`${serverURL}/api/categories/${props.match.params.slug}/videos`)
        .then( response => {
            this.setState({videos:response.data.data});
        })
        axios.get(`${serverURL}/api/categories/${props.match.params.slug}`)
        .then( response => {
            this.setState({category:response.data.data});
        })
    }

    componentWillReceiveProps(nextProps) {
        this.loadVideos(nextProps)
    }

    render() {
        return (
            <div className="page-padding">
                    <div className="section-header">
                        <h1 className="title">{this.state.category.name}</h1>
                    </div>
                <div>
                    <VideoList videos={this.state.videos} size="2"/>
                </div>
            </div>
        )
    }
};

export default CategoriesPage;