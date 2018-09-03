import React from 'react';
import About from './about';
import Tags from './tags';
import Subscribe from './subscribe';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className="row">
                    <div className="col-4">
                        <About/>
                    </div>
                    <div className="col-4">
                        <Tags/>
                    </div>
                    <div className="col-4">
                        <Subscribe/>
                    </div>
                </div>
            </div>
            <div id="footer-bottom">
                    <div className="logo text-center">
                        <img src="/images/footerlogo.png" alt="footer logo"/>
                    </div>
                    <div className="btm-footer-text text-center">
                        <p>2016 © Powered By WEMTEQ</p>
                    </div>
                </div>
        </footer>
    )
}

export default Footer;




