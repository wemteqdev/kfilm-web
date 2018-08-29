import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.scss';
import 'owl.carousel/dist/assets/owl.theme.default.scss';
import './premium.scss'

class Premium extends Component {

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
      <section id="premium" className="m-0">
        <div className="row heading bgWhite">
          <div className="col-11">
            <h4><FontAwesomeIcon icon="play-circle"/>Premium Videos</h4>
          </div>
          <div className="col-1">
            <div className="navText show-for-large">
              <a className="prev secondary-button mr-1" onClick={this.onPrev}><FontAwesomeIcon icon="angle-left"/></a>
              <a className="next secondary-button" onClick={this.onNext}><FontAwesomeIcon icon="angle-right"/></a>
            </div>
          </div>
        </div>
        <div className="row bgWhite">
          <OwlCarousel ref={this.owlCarousel} id="owl-carousel" className="owl-theme" autoplay autoplayTimeout="3000" loop dots={false} margin={10} items={5} >
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
      </section>
    );
  }
}

export default Premium;
