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

import { isValid } from '../functions';

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
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        $('.page-loading').addClass('d-none')
        return response
    },
    (error) => {
        $('.page-loading').addClass('d-none')
        return Promise.reject(error)
    }
)

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class Layout extends Component {

    componentWillMount() {
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
    }

    logout = () => {
        this.props.logoutSuccess()
        cookie.remove('user', { path: '/' })
        axios.defaults.headers.common['Authorization'] = ''
        this.props.history.push('/')
    }

    mainContent = () => {
        let pageClass = "";
        if (isMobile) {
            pageClass = "mobile-page"
        }
        return (
            <div className={`page ${pageClass}`} style={{transition: 'margin 0.5s'}}>
                {this.props.children}
            </div>
        )
    }

    render () {
        return(
            <div>
                <Header/>
                <SearchPage/>
                { (isMobile || isValid(this.props.login.user)) && <LeftSidebar/> }
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