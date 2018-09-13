import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VideoPosts from './VideoPosts';
import { Link } from 'react-router-dom';


class VideoContent extends Component {

    videoTypes = [
        {
            slug:'hot',
            title:'Hot',
            icon:'burn'
        },
        {
            slug:'popular',
            title:'Popular',
            icon:'thumbs-up'
        },
        {
            slug:'trending',
            title:'Trending',
            icon:'signal'
        },
    ]

    showAllCategories() {
        return this.videoTypes.map((item, i) => {
            return (
                <div className='container-fluid' key={i}>
                    <div className={'row even-' + (i%2 === 0)}>
                        <div className="container">
                            <section className="stripe videos">
                            <div className="main-heading mb-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="head-title">
                                            <h4 className='borderBottom'>
                                                <FontAwesomeIcon icon={item.icon} />{ item.title }
                                            </h4>
                                            <Link to={'/' + item.slug} className="radius float-right">View All</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="tab-content">
                                        <div>
                                            <VideoPosts type={item.slug}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        </div>
                    </div>
                </div>
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
