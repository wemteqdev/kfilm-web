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
        if (cookie.load('user') !== undefined) {
            this.props.loginSuccess(cookie.load('user'))
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
                <Navbar id='categories-nav' light expand="md">
                    <Collapse navbar className='container'>
                        <Nav navbar>
                            <NavItem key={-1}>
                                <NavLink to={"/"} exact activeClassName='active'><FontAwesomeIcon icon='home'/> Home</NavLink>
                            </NavItem>
                            { this.showCategories() }
                        </Nav>
                        <div className="login navButton">
                            <a className="search" onClick={ this.props.toggleSearch }><FontAwesomeIcon icon='search' /></a>
                            { this.props.login.user == null
                                    ? <Link to="/login" className="loginReg">Log in / Register</Link>
                                    : <Link to="/" className="loginReg" onClick={this.logout}>Logout</Link>
                            }
                        </div>
                    </Collapse>
                </Navbar>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSearch: () => dispatch(toggleSearchAction()),
    logoutSuccess: () => dispatch(logoutSuccessAction()),
    loginSuccess: (payload) => dispatch(loginSuccessAction(payload))
})


const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Header) );