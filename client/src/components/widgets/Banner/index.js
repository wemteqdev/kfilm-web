import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import serverURL from '../../../variables';
import { bannerAction } from '../../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
declare var $;

class Banner extends Component {

    state = {
        banners: []
    }
    componentWillMount = () => {
        $("body").addClass('loading-banner')
        axios.get(`${serverURL}/api/slides`)
        .then( response => {
            this.setState({banners:response.data.data})
            this.props.bannerLoad()
        })
    }

    imageLoaded() {
        $("body").removeClass('loading-banner')
    }

    showBanners = () => {
        return this.state.banners.map((item, i) => {
            return (
                <div key={i} className="banner-mask">
                    <img src={ item.image_url } width="100%" height="auto" alt="" onLoad={this.imageLoaded.bind(this)} />
                    <div className={`banner-title ${item.style}`}>
                        <p style={{fontFamily: "Anton"}}>{item.title}</p>
                        <div className="banner-watch my-4">
                            <Link to={`/videos/${item.link_url}`} className="btn watch-button"><span>Watch Now</span> <FontAwesomeIcon icon="chevron-right"/></Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <section className="banner" >
                { this.state.banners.length !== 0 && <Carousel autoPlay={false} interval={5000} showThumbs={false} showArrows={false} infiniteLoop={true} showStatus={false} emulateTouch={true}>
                    { this.showBanners() }
                </Carousel>}
            </section>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    bannerLoad: (payload) => dispatch(bannerAction(payload)),
})

export default withRouter( connect(null, mapDispatchToProps)(Banner) );
