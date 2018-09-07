import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import JSON from '../../../banner.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Banner = () => {
    const showBanners = () => {
        return JSON.map((item, i) => {
            return (
                <div key={i} className="banner-mask">
                    <img src={`/images/${item.banner}`} width="100%" height="auto" alt="" />
                    <div className="banner-title">
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
            <Carousel autoPlay={true} interval={5000} showThumbs={false} infiniteLoop={true} showStatus={false}>
                { showBanners() }
            </Carousel>
        </section>
    );
};

export default Banner;