import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import './layout.scss';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, 
         faAngleUp, faAngleDown, faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge,
         faClock, faEye, faPlay, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, faFacebook, faYoutube, faFlickr } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faGooglePlus, faInstagram, faVimeo, faFacebookF, faYoutube, 
    faSearch, faHome, faFilm, faTh, faEdit, faMagic, faUser, faEnvelope, faAngleUp, faAngleDown,
    faPlayCircle, faAngleLeft, faAngleRight, faThList, faThLarge, faClock, faEye, faPlay, faFacebook, faVideo, faFlickr, faHeart);
    
const Layout = (props) => {
    return(
        <div>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout;