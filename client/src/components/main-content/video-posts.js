import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const VideoPosts = () => {

    const items = [
        {
            title: 'Hong Gil Dong',
            link: 'videos/1',
            image: 'images/1.jpg',
            reviews: 506,
            duration: '05:67',
            author: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'Family Basketball Team',
            link: 'videos/2',
            image: 'images/2.jpg',
            reviews: 506,
            duration: '65:67',
            author: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'O, Youth!',
            link: 'videos/3',
            image: 'images/3.jpg',
            reviews: 506,
            duration: '65:67',
            author: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }
    ]

    const showThum = (item) => {
        return (
            <div className="post-thumb">
                <img src={item.image} alt="new video"/>
                <div className="video-stats clearfix">
                    <div className="thumb-stats float-left">
                        <FontAwesomeIcon icon='heart'/>
                        <span>{item.reviews}</span>
                    </div>
                    <div className="thumb-stats float-right">
                        <span>{item.duration}</span>
                    </div>
                </div>
            </div>
        )
    }

    const showDesc = (item) => {
        return (
            <div className="post-des">
                <h6><Link to={item.link}>{item.title}</Link></h6>
                <div className="post-stats clearfix">
                    <p className="float-left">
                    <FontAwesomeIcon icon="user" />
                    <span><Link to={item.author}>{item.author}</Link></span>
                    </p>
                    <p className="float-left">
                    <FontAwesomeIcon icon="clock" />
                    <span>{item.date}</span>
                    </p>
                    <p className="float-left">
                    <FontAwesomeIcon icon="eye" />
                    <span>{item.views}</span>
                    </p>
                </div>
                <div className="post-summary">
                    <p>{item.summary}</p>
                </div>
            </div>
        )
    }

    const showAll = () => {
        return items.map( (item, i) => {
            return (
                <div key={i} className="item col-6 group-item-secondary-button grid-medium">
                    <div className="post thumb-border">
                        { showThum(item) }
                        { showDesc(item) }
                    </div>
                </div>
            )
        } )
    }
    return (
        <div className="row">
            { showAll() }
        </div>
    );
}

export default VideoPosts;





