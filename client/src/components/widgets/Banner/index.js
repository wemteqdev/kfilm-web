import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import JSON from '../../../banner.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const styles = [
    {
        top: '25%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%'
    },
    {
        top: '25%',
        left:'25%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '75%',
        left:'25%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '75%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '25%',
        left: '25%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '75%',
        left: '13%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
    {
        top: '25%',
        left: '13%',
        transform: 'translateY(-50%)',
        width: '75%'
    },
]

const Banner = () => {
    const showBanners = () => {
        return JSON.map((item, i) => {
            return (
                <div key={i} className="banner-mask">
                    <img src={`/images/${item.banner}`} width="100%" height="auto" alt="" />
                    <div className="banner-title" style={styles[i]}>
                        <p>{item.title}</p>
                        <div className="banner-watch">
                            <Link to="/">Watch Now <FontAwesomeIcon icon="play"/></Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <section>
            <Carousel autoPlay={true} interval={5000} showThumbs={false} showArrows={false} infiniteLoop={true} showStatus={false} emulateTouch={true}>
                { showBanners() }
            </Carousel>
        </section>
    );
};

export default Banner;