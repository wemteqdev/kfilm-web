import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
declare var sm;
declare var xs;
declare var md;

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
    if (this.props.videos.length > 0) {
        return (
            this.props.videos.map( (video, i) => {
            return (
                <div key={i} className="item-movie item" style={{background:"url(" + video.featured_image_url + ") center"}}>
                    <figure className="premium-img">
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
        )
    } else {
        return <div></div>
    }
  }

    render() {
        
        let count = 4;
        if (sm || xs) {
            count = 2;
        }
        if (md) {
            count = 3;
        }

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
                        <OwlCarousel ref={this.owlCarousel} id="owl-carousel" className={"owl-theme"} autoplay autoplayTimeout="3000" loop dots={false} margin={10} items={ count } >
                            { this.showCarousel() }
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        );
    }
}

export default Carousel;
