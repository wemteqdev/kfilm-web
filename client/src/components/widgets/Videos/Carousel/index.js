import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './carousel.scss'


class Carousel extends Component {

  constructor(props) {
    super(props);
    this.owlCarousel = React.createRef();    
  }

  onNext = () => {
    this.owlCarousel.current.next(100);
  };

  onPrev = () => {
    this.owlCarousel.current.prev(100);
  };

  showCarousel = () => {
      return ( 
        this.props.videos.map( (video, i) => {
          return (
            <div key={i} className="item-movie item">
                <figure className="premium-img">
                    <img src={video.featured_image_url} alt="carousel"/>
                    <figcaption>
                        <h3>{video.name}</h3>
                    </figcaption>
                </figure>
                <Link to={'/videos/' + video.slug} className='hover-posts'>
                    <span><FontAwesomeIcon icon='play'/></span>
                </Link>
            </div>
          )
        })
    );
  }

    render() {
        return (
            <section className="movies container">
                <div className="row">
                    <div className="col-12">
                        <div className="heading category-heading clearfix">
                            <div className="cat-head float-left">
                            <FontAwesomeIcon icon={this.props.icon}/>
                            <h4>{this.props.name}</h4>
                            </div>
                            <div>
                            <div className="navText float-right show-for-large">
                                <a className="prev secondary-button" onClick={this.onPrev}>
                                    <FontAwesomeIcon icon="angle-left"/>
                                </a>
                                <a className="next secondary-button" onClick={this.onNext}>
                                    <FontAwesomeIcon icon="angle-right"/>
                                </a>
                            </div>
                            </div>
                        </div>
                        <OwlCarousel ref={this.owlCarousel} id="owl-carousel" className={"owl-theme"} autoplay autoplayTimeout="3000" loop dots={false} margin={10} items={4} >
                            { this.showCarousel() }
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        );
    }
}

export default Carousel;
