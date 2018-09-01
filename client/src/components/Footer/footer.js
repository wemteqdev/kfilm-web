import React from 'react';
import About from './about';
import Recent from './recent';
import Tags from './tags';
import Subscribe from './subscribe';

import './footer.scss';

const Footer = () => {
    return (
        <footer>
            <div  className='container'>
                <div className="row">
                    <div className="col-3">
                        <About/>
                    </div>
                    <div className="col-3">
                        <Recent/>
                    </div>
                    <div className="col-3">
                        <Tags/>
                    </div>
                    <div className="col-3">
                        <Subscribe/>
                    </div>
                </div>
            </div>
            <div id="footer-bottom">
                    <div className="logo text-center">
                        <img src="/images/footerlogo.png" alt="footer logo"/>
                    </div>
                    <div className="btm-footer-text text-center">
                        <p>2016 © Betube video wordpress theme.</p>
                    </div>
                </div>
        </footer>
    )
}

export default Footer;




