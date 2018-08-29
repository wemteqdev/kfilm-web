import React from 'react';
import { Link } from 'react-router-dom';

import LoginRegister from './login-register';
import TopBarRight from './top-bar-right';
import NavMenu from './nav-menu';
import './header.scss';

const Header = () => {
    return (
        <header>
            <section id="top" className="topBar">
                <div className="row">
                    <div className="col-12">
                        <LoginRegister/>
                    </div>
                </div>
            </section>
            <section id="navBar">
                <nav>
                    <div className="row">
                        <div className="col-12">
                            <div className="top-bar-left float-left">
                                <Link to="/">
                                    <img src="images/main-dark-logo.png" alt="logo"/>
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
        </header>
    )
}

export default Header;