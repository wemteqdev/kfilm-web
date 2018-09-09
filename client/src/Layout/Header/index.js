import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSearchAction, logoutSuccessAction, loginSuccessAction } from '../../actions';
import cookie from 'react-cookies';
import serverURL from '../../variables';
declare var xs;
declare var sm;
declare var md;

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
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token

            axios.get(`${serverURL}/api/user`)
            .then( (response) => {
                this.props.loginSuccess(user)
                },
                (error) => {
                    cookie.remove('user')
                    axios.defaults.headers.common['Authorization'] = ''
                }
            )
        }
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
                <div className="login navButton d-flex justify-content-center align-items-center">
                    <a className="search" onClick={ this.props.toggleSearch }><FontAwesomeIcon icon='search' /></a>
                    { this.props.login.user == null
                            ? <Link to="/login" className="loginReg">Log in / Register</Link>
                            : <span>Hi, {this.props.login.user.data.name}&nbsp;&nbsp;&nbsp;
                                <Link to="/" className="loginReg" onClick={this.logout}>Logout</Link>
                                </span>
                    }
                </div>
                <Nav id='categories-nav'>
                    { this.showCategories() }
                </Nav>
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