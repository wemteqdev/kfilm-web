import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header';
import SearchPage from './SearchPage';
import LeftSidebar from './LeftSidebar';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/layout.scss';
import {isMobile} from 'react-device-detect';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHome, faFilm, faTh, faEdit, faUser, 
         faAngleUp, faAngleDown, faPlayCircle, faAngleLeft, faAngleRight,
         faClock, faEye, faPlay, faVideo, faHeart, faStar, faCalendar, faBurn, faThumbsUp,
         faHistory, faTimes, faCalendarCheck, faBars, faSignal } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faHome, faFilm, faTh, faEdit,faUser, faAngleUp, faAngleDown,
    faPlayCircle, faAngleLeft, faAngleRight, faClock, faEye, faPlay, faVideo,faHeart, 
    faStar, faCalendar, faBurn, faThumbsUp, faHistory, faTimes, faCalendarCheck, faBars, faSignal);
    
declare var $;

axios.interceptors.request.use(
    request => {
        $(".page").css('opacity', '.5')
        return request
    },
    (error) => {
    }
)

axios.interceptors.response.use(
    response => {
        $("body").removeClass('all-loading')
        setTimeout(() => {
            $(".page").css('opacity', '1')
        }, 1000)
        return response
    },
    (error) => {
    }
)



const Layout = (props) => {

    const mainContent = () => {
        let marginLeft = 0;
        if (isMobile || props.login.user !== undefined) {
            marginLeft = '6.4rem'
            $("footer").css('margin-left', '6.4rem') 
        }
        if (props.sidebar.toggleSidebar){
            marginLeft = '20rem'
            $("footer").css('margin-left', '20rem')
        }
        let pageClass = "";
        if (isMobile) {
            pageClass = "mobile-page"
        }
        return (
            <div className={`page ${pageClass}`} style={ {
                marginLeft: marginLeft, 
                transition: 'padding 0.5s'
                } }
            >
                {props.children}
            </div>
        )
    }
    return(
        <div>
            <Header/>
            <SearchPage/>
            { (isMobile || props.login.user != null) && <LeftSidebar/> }
            { mainContent() }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      login: state.login,
      sidebar: state.sidebar,
      banner: state.banner
    }
}

  
export default withRouter( connect(mapStateToProps, null)(Layout));