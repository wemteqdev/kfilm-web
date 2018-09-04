import React from 'react';
import { Container, Content } from 'rsuite';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import SearchPage from './SearchPage';
import LeftSidebar from './LeftSidebar';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/layout.scss';

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

    const mainContent = () => {
        if (props.login.user != null) {
            return (
                <Content className="page" style={ {
                    paddingLeft: '260px', 
                    transition: 'padding 0.5s'
                    } }
                >
                    {props.children}
                    <Footer/>
                </Content>
            )
        }
        else {
            return (
                <Content className="page" style={{
                    transition: 'padding 0.5s'
                }}>
                    {props.children}
                    <Footer/>
                </Content>
            )
        }
    }
    return(
        <div>
            <Container>
                <Header/>
                <Container>
                    { props.login.user != null && <LeftSidebar/> }
                    { mainContent() }
                </Container>
            </Container>
            <SearchPage/>           
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

  
export default withRouter( connect(mapStateToProps, null)(Layout));