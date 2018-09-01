import React from 'react';
import { Link } from 'react-router-dom';

import TopBarRight from './top-bar-right';
import NavMenu from './nav-menu';
import CategoriesNav from './categories-nav';
import './header.scss';

const Header = () => {
    return (
        <header>
            <section id="navBar">
                <nav className='container'>
                    <div className="row">
                        <div className="col-12">
                            <div className="top-bar-left float-left">
                                <Link to="/">
                                    <img src="/images/main-dark-logo.png" alt="logo"/>
                                </Link>
                            </div>
                            <div className="float-right">
                                <TopBarRight/>
                            </div>
                            <div className="float-right mr-5">
                                <NavMenu/>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
            <CategoriesNav />
        </header>
    )
}

export default Header;