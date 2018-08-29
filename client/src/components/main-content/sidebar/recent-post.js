import React from 'react';
import MediaObject from './media-object';

const RecentPost = () => {
    const items = [
        {
            title: 'Hong Gil Dong',
            link: 'videos/1',
            image: 'images/6.jpg',
            reviews: 506,
            duration: '05:67',
            author: 'admin',
            authorLink: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'Family Basketball Team',
            link: 'videos/2',
            image: 'images/7.jpg',
            reviews: 506,
            duration: '65:67',
            author: 'admin',
            authorLink: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
            title: 'O, Youth!',
            link: 'videos/3',
            image: 'images/8.jpg',
            reviews: 506,
            duration: '65:67',
            author: 'admin',
            authorLink: 'admin',
            date: '5 January 16',
            views: '1862K',
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }
    ]

    const showAll = () => {
        return items.map( (item, i) => {
            return (
                <MediaObject key={i} {...item}/>
            )
        })
    }

    return (
        <div className="widgetBox">
            <div className="widgetTitle">
                <h5>Recent Post Videos</h5>
            </div>
            <div className="widgetContent">
                { showAll() }
            </div>
        </div>
    );
}


export default RecentPost;