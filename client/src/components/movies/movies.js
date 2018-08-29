import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.scss';
import 'owl.carousel/dist/assets/owl.theme.default.scss';

class Movies extends Component {

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

  render() {
    return (
      <section className="movies">
        <div className="row bgWhite pb-3">
          <div className="col-12">
            <div className="row">
              <div className="heading category-heading clearfix">
                <div className="cat-head float-left">
                  <FontAwesomeIcon icon="video"/>
                  <h4>Watch Movies</h4>
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
              <div className="item"><img src="images/premium1.png" alt="1"></img></div>
              <div className="item"><img src="images/premium2.png" alt="1"></img></div>
              <div className="item"><img src="images/premium3.png" alt="1"></img></div>
              <div className="item"><img src="images/premium4.png" alt="1"></img></div>
              <div className="item"><img src="images/premium1.png" alt="1"></img></div>
              <div className="item"><img src="images/premium2.png" alt="1"></img></div>
              <div className="item"><img src="images/premium3.png" alt="1"></img></div>
              <div className="item"><img src="images/premium4.png" alt="1"></img></div>
              <div className="item"><img src="images/premium1.png" alt="1"></img></div>
              <div className="item"><img src="images/premium2.png" alt="1"></img></div>
              <div className="item"><img src="images/premium3.png" alt="1"></img></div>
              <div className="item"><img src="images/premium4.png" alt="1"></img></div>
            </OwlCarousel>
          </div>
        </div>
        
      </section>
    );
  }
}

export default Movies;
