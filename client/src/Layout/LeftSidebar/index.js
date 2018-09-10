import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebarAction, logoutSuccessAction } from '../../actions';
import axios from 'axios';
import serverURL from '../../variables';
import {isMobile} from 'react-device-detect';
import cookie from 'react-cookies';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class LeftSidebar extends Component {

    state = {
        categories:[]
    }
    
    constructor(props) {
        super(props)
        this.onNav = this.onNav.bind(this)
        this.showUserInfo = this.showUserInfo.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentWillMount = () => {
        axios.get(`${serverURL}/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }
    
    onToggle() {
    }

    onNav(selected) {
        this.props.history.push(selected)
    }

    showCategories() {
        let icons = [
            {
                name: "FT"
            },
            {
                name: "TV"
            },
            {
                name: "AN"
            }
        ]
        return this.state.categories.length === 0 
            ? 
            null : 
            this.state.categories.map((item, i) => {
            return (
                <NavItem key={i} eventKey={`/categories/${item.slug}`}>
                    <NavIcon>
                        {icons[i].name}
                    </NavIcon>
                    <NavText>
                            {item.name}
                    </NavText>
                </NavItem>
            )
        })
    }

    logout() {
        this.props.logoutSuccess()
        cookie.remove('user', { path: '/' })
        axios.defaults.headers.common['Authorization'] = ''
    }

    showUserInfo() {
        if (this.props.login.user == null) {
            return null;
        }
        return  <span className="pl-5">Hi, {this.props.login.user.data.name}&nbsp;&nbsp;&nbsp;
                    <Link to="/" className="loginReg" onClick={this.logout}>Logout</Link>
                </span>
    }
    render() {
        return (
            <SideNav
                onSelect={(selected) => {
                    this.onNav(selected)
                }}
                onToggle={this.onToggle}
                expanded={this.props.sidebar.toggleSidebar}
                className="sidebar"
            >
                <SideNav.Nav defaultSelected="home" className="sidenav">
                    { isMobile && this.props.sidebar.toggleSidebar && this.showUserInfo()}
                    { isMobile && this.showCategories()}
                    { this.props.login.user != null && <NavItem eventKey="/user/profile">
                        <NavIcon>
                            <FontAwesomeIcon icon="user"/>
                        </NavIcon>
                        <NavText>
                                Profile
                        </NavText>
                    </NavItem>}
                    { this.props.login.user != null && <NavItem eventKey="/user/favorites">
                        <NavIcon>
                            <FontAwesomeIcon icon="heart"/>
                        </NavIcon>
                        <NavText>
                            Favorites
                        </NavText>
                    </NavItem>}
                    { this.props.login.user != null && <NavItem eventKey="/user/history">
                        <NavIcon>
                            <FontAwesomeIcon icon="history"/>
                        </NavIcon>
                        <NavText>
                            History
                        </NavText>
                    </NavItem> }
                    { this.props.login.user != null && <NavItem eventKey="/user/pro-videos">
                        <NavIcon>
                            <FontAwesomeIcon icon="film"/>
                        </NavIcon>
                        <NavText>
                            Pro Videos
                        </NavText>
                    </NavItem> }
                    {
                       this.props.login.user != null &&  this.props.sidebar.toggleSidebar &&
                        <div className="d-flex text-center plan-nav-item">
                            <div className="justify-content-center align-self-center mx-auto plan-upgrade">
                                <h2>korfilm Pro</h2>
                                <div className="plan-button">
                                    <Link to="/user/plan" className="btn btn-danger btn-lg">Upgrade</Link>
                                </div>
                            </div>
                        </div>
                    }
                    </SideNav.Nav>
            </SideNav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      sidebar: state.sidebar,
      login: state.login,
    }
  }
  
const mapDispatchToProps = dispatch => ({
    toogleSidebar: () => dispatch(toggleSidebarAction()),
    logoutSuccess: () => dispatch(logoutSuccessAction())
})
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));
