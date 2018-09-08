import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Banner extends Component {

    state = {
        banners: []
    }
    componentWillMount = () => {
        axios.get(`http://korfilm.loc/api/slides`)
        .then( response => {
            this.setState({banners:response.data.data})
            console.log(response.data.data)
        })
    }

    showBanners = () => {
        return this.state.banners.map((item, i) => {
            return (
                <div key={i} className="banner-mask">
                    <img src={ item.image_url } width="100%" height="auto" alt="" />
                    <div className={`banner-title ${item.style}`}>
                        <p>{item.title}</p>
                        <div className="banner-watch">
                            <Link to={`/videos/${item.link_url}`}>Watch Now <FontAwesomeIcon icon="play"/></Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <section>
                { this.state.banners.length !== 0 && <Carousel autoPlay={true} interval={5000} showThumbs={false} showArrows={false} infiniteLoop={true} showStatus={false} emulateTouch={true}>
                    { this.showBanners() }
                </Carousel>}
            </section>
        )
    }
};

export default Banner;