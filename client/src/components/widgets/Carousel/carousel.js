import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.scss';
import 'owl.carousel/dist/assets/owl.theme.default.scss';

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
    return this.props.movies.map( (movie, i) => {
        return (
            <div key={i} className="item"><img src={movie.image} alt="1"></img></div>
        )
    })
  }
  render() {
    return (
      <section className="movies">
        <div className="row bgWhite pb-3">
            <div className="col-12">
                <div className="row">
                    <div className="heading category-heading clearfix">
                        <div className="cat-head float-left">
                        <FontAwesomeIcon icon={this.props.icon}/>
                        <h4>{this.props.title}</h4>
                        </div>
                        <div>
                        <div className="navText float-right show-for-large">
                            <a className="prev secondary-button" onClick={this.onPrev}><FontAwesomeIcon icon="angle-left"/></a>
                            <a className="next secondary-button" onClick={this.onNext}><FontAwesomeIcon icon="angle-right"/></a>
                        </div>
                        </div>
                    </div>
                </div>
                <OwlCarousel ref={this.owlCarousel} id="owl-carousel" className="owl-theme" autoplay autoplayTimeout="3000" loop dots={false} margin={10} items={6} >
                    { this.showCarousel() }
                </OwlCarousel>
            </div>
        </div>
      </section>
    );
  }
}

export default Carousel;
