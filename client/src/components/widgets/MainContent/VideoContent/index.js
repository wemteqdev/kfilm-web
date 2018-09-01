import React, { Component } from 'react';
import './videoContent.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VideoPosts from './VideoPosts';
import axios from 'axios';


class VideoContent extends Component {

    state = {
        categories:[],
    }

    icons = {
        action: 'car-crash',
        historical: 'history',
        feature: 'landmark'

    }
    
    componentWillMount(){
        axios.get(`http://korfilm.loc/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }

    showAllCategories() {
        return this.state.categories.map((item, i) => {
            return (
                <section key={i} className="content mb-4">
                    <div className="main-heading mb-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="head-title">
                                    <h4 className='borderBottom'>
                                        <FontAwesomeIcon icon={this.icons[item.slug]} />{ item.name }
                                    </h4>
                                    <a className="radius float-right">View All ({item.videos_count})</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-content">
                                <div>
                                    <VideoPosts category={item.id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        })
    }
    render() {
        return (
            <div>
                { this.showAllCategories() }
            </div>
        );
    }
}

export default VideoContent;
