import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSearchAction, logoutSuccessAction, loginSuccessAction } from '../../actions';
import cookie from 'react-cookies';

class Header extends Component {

    state = {
        categories:[]
    }

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    componentWillMount(){
        let user = cookie.load('user')
        if (user !== undefined) {
            this.props.loginSuccess(user)
            axios.defaults.headers.common['Authorization'] = user.access_token
        }
        axios.get(`http://korfilm.loc/api/categories`)
        .then( response => {
            this.setState({categories:response.data.data});
        })
    }

    showCategories() {
        return this.state.categories.map( (item, i) => {
            return (
                <NavItem key={i}>
                    <NavLink to={"/categories/" + item.slug } activeClassName='active'>{ item.name }</NavLink>
                </NavItem>
            )
        } )
    }

    logout() {
        this.props.logoutSuccess()
        cookie.remove('user', { path: '/' })
        axios.defaults.headers.common['Authorization'] = ''
    }

    render () {
        return (
            <header {...this.boundActions}>
                <div id="logo" className="text-center">
                    <Link to="/">
                        <div className="logo d-flex">
                            <div className="justify-content-center align-self-center mx-auto">
                                <h2 className="mb-0">KORFILM</h2>
                            </div>
                            
                        </div>
                    </Link>
                </div>
                <Navbar id='categories-nav' light expand="md">
                    <Collapse navbar className="d-flex justify-content-between">
                        <Nav navbar>
                            { this.showCategories() }
                        </Nav>
                        <div className="login navButton">
                            <a className="search" onClick={ this.props.toggleSearch }><FontAwesomeIcon icon='search' /></a>
                            { this.props.login.user == null
                                    ? <Link to="/login" className="loginReg">Log in / Register</Link>
                                    : <span>Hi, {this.props.login.user.data.name}&nbsp;&nbsp;&nbsp;
                                        <Link to="/" className="loginReg" onClick={this.logout}>Logout</Link>
                                        </span>
                            }
                        </div>
                    </Collapse>
                </Navbar>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSearch: () => dispatch(toggleSearchAction()),
    logoutSuccess: () => dispatch(logoutSuccessAction()),
    loginSuccess: (payload) => dispatch(loginSuccessAction(payload))
}) 

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header) );