import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Subscribe extends Component {
  render() {
    return (
        <div className="widgetBox">
            <div className="widgetTitle">
                <h5>Subscribe Now</h5>
            </div>
            <div className="widgetContent">
                <form data-abide="xmtddr-abide" method="post">
                    <p>Subscribe to get exclusive videos</p>
                    <div className="input">
                        <input type="text" placeholder="Enter your full Name" required=""/>
                        <span className="form-error">
                            Yo, you had better fill this out, it's required.
                        </span>
                    </div>
                    <div className="input">
                        <input type="email" id="email" placeholder="Enter your email addres" required=""/>
                        <span className="form-error">
                          I'm required!
                        </span>
                    </div>
                    <button className="button" type="submit" value="Submit">Sign up Now</button>
                </form>
                <div className="social-links">
                    <h5>We’re a Social Bunch</h5>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'google-plus']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'vimeo']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'youtube']} /></a>
                    <a className="secondary-button"><FontAwesomeIcon icon={['fab', 'flickr']} /></a>
                </div>
            </div>
        </div>
    );
  }
}

export default Subscribe;
