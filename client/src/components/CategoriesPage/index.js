import React, { Component } from 'react';
import axios from 'axios';
import VideoList from '../widgets/VideoList';
import serverURL from '../../variables';

declare var xs;
declare var sm;
declare var md;
declare var lg;

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
            if (response.data.data.length > 0) {
                this.setState({videos:response.data.data});
            }
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
        let size = 2;
        if (xs) {
            size = 12;
        }
        if (sm) {
            size = 6;
        }
        if (md) {
            size = 4;
        }
        if (lg) {
            size = 3;
        }
        return (
            <div className="page-padding">
                    <div className="section-header">
                        <h1 className="title">{this.state.category.name}</h1>
                    </div>
                <div>
                    <VideoList videos={this.state.videos} size={size}/>
                </div>
            </div>
        )
    }
};

export default CategoriesPage;