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
            this.props.categories.map( (category, i) => {
                return (
                    <div key={i} className="item">
                        <figure className="premium-img">
                            <img src={category.featured_image_url} alt="carousel"/>>
                            <figcaption>
                                <h5>{category.name}</h5>
                            </figcaption>
                        </figure>
                        <Link to={'/category/' + category.slug} className='hover-posts'>
                            <span><FontAwesomeIcon icon='search'/></span>
                        </Link>
                    </div>
                )
            })
        )
    }


    render() {
        return (
            <section id="premium" className="container">
                <div className="row heading bgWhite">
                    <div className="col-11">
                        <h4><FontAwesomeIcon icon={this.props.icon}/>{this.props.name}</h4>
                    </div>
                    <div className="col-1">
                        <div className="navText show-for-large">
                        <a className="prev secondary-button mr-1" onClick={this.onPrev}><FontAwesomeIcon icon="angle-left"/></a>
                        <a className="next secondary-button" onClick={this.onNext}><FontAwesomeIcon icon="angle-right"/></a>
                        </div>
                    </div>
                </div>
                <div className="row bgWhite pb-2">
                    <div className='col-12'>
                        <OwlCarousel ref={this.owlCarousel} id="owl-carousel" className={"owl-theme " + this.props.style} autoplay autoplayTimeout="3000" loop dots={false} margin={10} items={6} >
                            { this.showCarousel() }
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        );
    }
}

export default Carousel;
