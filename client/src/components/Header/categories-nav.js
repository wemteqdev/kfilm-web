import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './header.scss';

class CategoriesNav extends Component {

    state = {
        categories:[]
    }

    pages = [
        {
            name: 'Hot',
            slug: 'hot'
        },
        {
            name: 'Popular',
            slug: 'popular'
        },
        {
            name: 'Trending',
            slug: 'trending'
        },
        {
            name: 'Latest',
            slug: 'recent'
        },
        {
            name: 'Promotion',
            slug: 'promotion'
        }
    ]

    componentWillMount(){
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

    showSpeicficCategories() {
        return this.pages.map( (item, i) => {
            return (
                <NavItem key={i}>
                    <NavLink to={"/filter/" + item.slug } activeClassName='active'>{ item.name }</NavLink>
                </NavItem>
            )
        } )
    }

    render () {
        return (
            <Navbar id='categories-nav' light expand="md">
                <Collapse navbar className='container'>
                    <Nav navbar>
                        <NavItem key={-1}>
                            <NavLink to={"/"} exact activeClassName='active'><FontAwesomeIcon icon='home'/> Home</NavLink>
                        </NavItem>
                        { this.showCategories() }
                        { this.showSpeicficCategories() }
                    </Nav>
                    <div className="search">
                        <Link to="search"><FontAwesomeIcon icon='search' /></Link>
                    </div>
                </Collapse>
            </Navbar>
        )
    }
}

export default CategoriesNav;