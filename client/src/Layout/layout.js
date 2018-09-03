import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/layout.scss';

import Header from './Header';
import Footer from './Footer';
import SearchPage from './SearchPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, 
         faAngleUp, faAngleDown, faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge,
         faClock, faEye, faPlay, faVideo, faHeart, faStar, faCalendar, faBurn, faThumbsUp, faSignature,
         faHistory, faLandmark, faCarCrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, 
         faFacebook, faYoutube, faFlickr } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, faYoutube, 
    faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, faAngleUp, faAngleDown,
    faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge, faClock, faEye, faPlay, faFacebook, faVideo, faFlickr, faHeart, 
    faStar, faCalendar, faBurn, faThumbsUp, faSignature, faHistory, faLandmark, faCarCrash, faTimes);
    
const Layout = (props) => {
    return(
        <div>
            <Header/>
            <SearchPage/>
            <div className="page">
            {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;