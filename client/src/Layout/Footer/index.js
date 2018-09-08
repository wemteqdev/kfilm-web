import React from 'react';
import Subscribe from './subscribe';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className="row align-items-center justify-content-center">
                    <div className="col-4">
                        <Subscribe/>
                    </div>
                </div>
            </div>
            <div id="footer-bottom">
                    <div className="logo text-center">
                        <h1>KORFILM</h1>
                    </div>
                    <div className="btm-footer-text text-center">
                        <p>2018 © Powered By WEMTEQ</p>
                    </div>
                </div>
        </footer>
    )
}

export default Footer;




