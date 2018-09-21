import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSearchAction, logoutSuccessAction, loginSuccessAction, toggleSidebarAction } from '../../actions';
import cookie from 'react-cookies';
import serverURL from '../../variables';
import {isMobile} from 'react-device-detect';
import { isValid, justifyPageMargin } from '../../functions';

class Header extends Component {

    state = {
        categories:[]
    }

    onToggle = () => {
        this.props.toggleSidebar()

        let marginLeft = '0px'
        if (isValid(this.props.login.user)) {
            marginLeft = '42px'
        }
        if (!this.props.sidebar.toggleSidebar) {
            marginLeft = '140px'
        }
        justifyPageMargin(marginLeft);
    }

    componentWillMount(){
        axios.get(`${serverURL}/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }

    showCategories() {
        return this.state.categories.map( (item, i) => {
            return (
                <NavItem key={i} className="d-flex">
                    <NavLink to={"/categories/" + item.slug } activeClassName='active'>{ item.name }</NavLink>
                </NavItem>
            )
        } )
    }

    logout = () => {
        this.props.logoutSuccess()
        cookie.remove('user', { path: '/' })
        axios.defaults.headers.common['Authorization'] = ''
        this.props.history.push('/')

        if (this.props.sidebar.toggleSidebar === true) {
            this.props.toggleSidebar()
        }
        justifyPageMargin('0px');
    }

    render () {
        let logo, nav;
        if (isMobile || isValid(this.props.login.user)) {
            logo = {marginLeft: '42px'}
            if (this.props.sidebar.toggleSidebar) {
                nav = {marginLeft: '140px'}
            } else {
                nav = {marginLeft: '42px'}
            }
        }
        return (
            <header {...this.boundActions}>
                <div className="container-fluid">
                    <div className="row">
                        { (isMobile || isValid(this.props.login.user)) &&
                            <div id="toggle" className="col d-flex justify-content-center align-items-center text-center">
                                <a onClick={this.onToggle}>
                                    { this.props.sidebar.toggleSidebar &&
                                    <FontAwesomeIcon icon="times" /> }
                                    { !this.props.sidebar.toggleSidebar &&
                                    <FontAwesomeIcon icon="bars" /> }
                                </a>
                            </div>
                        }
                        <div id="logo" className="col text-center" style={logo}>
                            <Link to="/">
                                <div className="logo d-flex">
                                    <div className="justify-content-center align-self-center mx-auto">
                                        <h2 className="mb-0">KORFILM</h2>
                                    </div>
                                    
                                </div>
                            </Link>
                        </div>
                        { isMobile === false && 
                            <div id='categories-nav' className="col" style={nav}>
                                <div className="container px-2">
                                    <Nav>
                                        { this.showCategories() }
                                    </Nav>
                                </div>
                            </div>
                        }
                        <div className="login navButton d-flex justify-content-end align-items-center">
                            <a className="search" onClick={ this.props.toggleSearch }><FontAwesomeIcon icon='search' /></a>
                            { isMobile === false && isValid(this.props.login.user) && 
                                <span>Hi, {this.props.login.user.data.name}&nbsp;&nbsp;&nbsp;</span>
                            }
                            { isValid(this.props.login.user) ? 
                                <Link to="/" className="loginReg" onClick={this.logout}>Log out</Link>
                            :
                                <Link to="/login" className="loginReg">Log in</Link>
                            }
                            
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        sidebar: state.sidebar
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSearch: () => dispatch(toggleSearchAction()),
    logoutSuccess: () => dispatch(logoutSuccessAction()),
    loginSuccess: (payload) => dispatch(loginSuccessAction(payload)),
    toggleSidebar: () => dispatch(toggleSidebarAction())
}) 
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header) );