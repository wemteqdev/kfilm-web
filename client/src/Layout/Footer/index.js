import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-4 col-md-5 col-sm-6 col-8">
                        <div id="mc_embed_signup" className="widgetBox">
                            <form action="https://korfilm.us19.list-manage.com/subscribe/post?u=b9228a954d4acd6413a43eb8f&amp;id=de56d8558e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll">
                                    <div className="widgetTitle">
                                        <h5>Subscribe Now</h5>
                                    </div>
                                    <div className="widgetContent">
                                        <div className="mc-field-group input">
                                            <label for="mce-EMAIL">Email Address  <span className="asterisk">*</span>
                                            </label>
                                            <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL"/>
                                        </div>
                                        <div id="mce-responses" className="clear">
                                            <div className="response" id="mce-error-response" style={{display:'none'}}></div>
                                            <div className="response" id="mce-success-response" style={{display:'none'}}></div>
                                        </div>
                                        <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                                            <input type="text" name="b_b9228a954d4acd6413a43eb8f_de56d8558e" tabindex="-1" value=""/>
                                        </div>
                                        <div className="clear">
                                            <button type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
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




