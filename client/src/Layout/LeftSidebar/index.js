import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebarAction, logoutSuccessAction } from '../../actions';
import axios from 'axios';
import serverURL from '../../variables';
import {isMobile} from 'react-device-detect';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class LeftSidebar extends Component {

    state = {
        categories:[]
    }
    
    componentWillMount = () => {
        axios.get(`${serverURL}/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }

    isUserValid = () => {
        return this.props.login.user !== null && this.props.login.user !== undefined;
    }

    onToggle = () => {
    }

    onNavSelected = (selected) => {
        this.props.history.push(selected)
    }

    showCategories() {
        let icons = [
            {name: "FT"},
            {name: "TV"},
            {name: "AN"}
        ]
        let categories = this.state.categories;
        return (
            categories.length > 0 && 
                categories.map((item, i) => {
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
        )
    }

    showUserInfo = () => {
        let userInfo = [
            {
                eventKey: "/user/profile",
                icon: "user",
                text: "Profile",
            },
            {
                eventKey: "/user/favorites",
                icon: "heart",
                text: "Favorites",
            },
            {
                eventKey: "/user/history",
                icon: "history",
                text: "History",
            },
            {
                eventKey: "/user/pro-videos",
                icon: "film",
                text: "Pro Videos",
            },
        ]
        return (
            userInfo.map((item, index) => {
                return (
                    <NavItem key={index} eventKey={item.eventKey}>
                        <NavIcon>
                            <FontAwesomeIcon icon={item.icon}/>
                        </NavIcon>
                        <NavText>
                            {item.text}
                        </NavText>
                    </NavItem>
                )
            })
        )
    }

    showUpgrade = () => {
        return (
            <div className="d-flex text-center plan-nav-item">
                <div className="justify-content-center align-self-center mx-auto plan-upgrade">
                    <h2>korfilm Pro</h2>
                    <div className="plan-button">
                        <Link to="/user/plan" className="btn btn-danger btn-lg">Upgrade</Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <SideNav
                onSelect={(selected) => {this.onNavSelected(selected)}}
                expanded={this.props.sidebar.toggleSidebar}
                onToggle={this.onToggle}
                className="sidebar"
            >
                <SideNav.Nav defaultSelected="home" className="sidenav">
                    { isMobile && this.props.sidebar.toggleSidebar && this.isUserValid() && 
                        <span className="pl-5 pb-3">Hi, {this.props.login.user.data.name}</span>
                    }
                    { isMobile && 
                        this.showCategories()
                    }
                    { this.isUserValid() && 
                        this.showUserInfo()
                    }
                    { this.isUserValid() && this.props.sidebar.toggleSidebar && 
                        this.showUpgrade()
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
