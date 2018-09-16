import React, { Component } from 'react';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header';
import SearchPage from './SearchPage';
import LeftSidebar from './LeftSidebar';
import serverURL from '../variables';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/layout.scss';
import {isMobile} from 'react-device-detect';
import {loginSuccessAction} from '../actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faHome, faFilm, faTh, faEdit, faUser, 
         faAngleUp, faAngleDown, faPlayCircle, faAngleLeft, faAngleRight,
         faClock, faEye, faPlay, faVideo, faHeart, faStar, faCalendar, faBurn, faThumbsUp,
         faHistory, faTimes, faCalendarCheck, faBars, faSignal, faCaretLeft, faCaretRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faHome, faFilm, faTh, faEdit,faUser, faAngleUp, faAngleDown,
    faPlayCircle, faAngleLeft, faAngleRight, faClock, faEye, faPlay, faVideo,faHeart, 
    faStar, faCalendar, faBurn, faThumbsUp, faHistory, faTimes, faCalendarCheck, faBars, faSignal, faCaretLeft, faCaretRight, faChevronRight);

// import {faFacebook} from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

declare var $;

axios.interceptors.request.use(
    request => {
        $(".page").css('opacity', '.5')
        return request
    },
    (error) => {
        return Promise.reject(error)
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
        $("body").removeClass('all-loading')
        setTimeout(() => {
            $(".page").css('opacity', '1')
        }, 1000)
        return Promise.reject(error)
    }
)

class Layout extends Component {

    componentWillMount() {
        setTimeout(()=>{
            let user = cookie.load('user')
            if (user !== undefined) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
    
                axios.get(`${serverURL}/api/user`)
                .then( (response) => {
                    if (response === undefined) {
                        this.logout()
                    } else {
                        this.props.loginSuccess(user)
                    }
                })
                .catch( error => {
                })
            }
        }, 1000)
    }

    logout = () => {
        this.props.logoutSuccess()
        cookie.remove('user', { path: '/' })
        axios.defaults.headers.common['Authorization'] = ''
        this.props.history.push('/')
    }

    isUserValid = () => {
        return this.props.login.user !== null && this.props.login.user !== undefined;
    }

    mainContent = () => {
        let marginLeft = 0;
        if (isMobile || this.isUserValid()) {
            marginLeft = '6.4rem'
            $("footer").css('margin-left', '6.4rem') 
        }
        if (this.props.sidebar.toggleSidebar){
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
                {this.props.children}
            </div>
        )
    }

    render () {
        return(
            <div>
                <Header/>
                <SearchPage/>
                { (isMobile || this.isUserValid()) && <LeftSidebar/> }
                { this.mainContent() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login,
      sidebar: state.sidebar,
      banner: state.banner
    }
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (payload) => dispatch(loginSuccessAction(payload)),
})
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Layout));