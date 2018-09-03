import React, { Component } from 'react';

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
                        <input type="email" placeholder="Enter your email addres" required=""/>
                        <span className="form-error">
                          I'm required!
                        </span>
                    </div>
                    <button className="button" type="submit" value="Submit">Sign up Now</button>
                </form>
            </div>
        </div>
    );
  }
}

export default Subscribe;
