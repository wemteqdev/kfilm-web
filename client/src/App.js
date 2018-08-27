
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, 
         faAngleUp, faAngleDown, faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge,
         faClock, faEye, faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, faFacebook, faYoutube, faFlickr } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/js/bootstrap.js'
import './App.scss';

import Premium from './components/premium/premium'
import Movies from './components/movies/movies.js'

import SocialLinks from './components/header/social-links';
import LoginRegister from './components/header/login-register';
import NavMenu from './components/header/nav-menu';
import TopBarRight from './components/header/top-bar-right';
import MainImage from './components/vertical-slider/main-image';
import VideoContent from './components/main-content/video-content'
import Sidebar from './components/main-content/sidebar';
import Recent from './components/footer/recent';
import Tags from './components/footer/tags';
import Subscribe from './components/footer/subscribe';

library.add(faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, faYoutube, 
  faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, faAngleUp, faAngleDown,
  faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge, faClock, faEye, faPlay, faFacebook, faVideo, faFlickr);

class App extends Component {
  render() {
    return (
      <div id="App">
        <header>
          <section id="top" className="topBar">
            <div className="row">
              <div className="col-6">
                <SocialLinks/>
              </div>
              <div className="col-6">
                <LoginRegister/>
              </div>
            </div>
          </section>
          <section id="navBar">
            <nav>
              <div className="row">
                <div className="col-12">
                  <div className="top-bar-left float-left">
                    <a><img src="main-dark-logo.png" alt="logo"/></a>
                  </div>
                  <div className="float-right">
                    <TopBarRight/>
                  </div>
                  <div className="float-right">
                    <NavMenu/>
                  </div>
                </div>
              </div>
            </nav>
          </section>
        </header>
        <section id="verticalSlider">
          <div className="row">
            <div className="col-12">
              <MainImage/>
            </div>
          </div>
        </section>
        <Premium/>
        <section id="mainContent">
          <div className="row">
            <div id="mainContent" className="col-8">
              <VideoContent/>
            </div>
            <div className="col-4">
              <Sidebar/>
            </div>
          </div>
        </section>
        <Movies />
        <footer>
          <div className="row">
            <div className="col-3">
              <div className="widgetBox">
                <div className="widgetTitle">
                  <h5>About Betube</h5>
                </div>
                <div className="textwidget">
                  Betube video wordpress theme lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s book.
                </div>
              </div>
            </div>
            <div className="col-3">
              <Recent/>
            </div>
            <div className="col-3">
              <Tags/>
            </div>
            <div className="col-3">
              <Subscribe/>
            </div>
          </div>
        </footer>
        <div id="footer-bottom">
          <div className="logo text-center">
            <img src="footerlogo.png" alt="footer logo"/>
          </div>
          <div className="btm-footer-text text-center">
            <p>2016 © Betube video wordpress theme.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
