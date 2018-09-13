import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../variables';

class EmailVerification extends Component {

    state = {
        email: '',
        isSent: false,
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleResend() {
        axios.post(`${serverURL}/api/user/verification/resend?email=${this.state.email}`)
            .then( (response) => {
                if (response != null) {
                    this.setState({
                        isSent: true
                    })
                    if (response.data.data.email_verified) {
                        cookie.save('user', response.data, { path: '/', maxAge: 3600 * 24 * 7 });
                        this.props.history.push('/')
                    }
                }
            },
            (error) => { 
            }
        )
    }

    render() {
        if (this.props.login.user == null) {
            return <div></div>;
        }
        return (
            <section className="verificationPage">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h2>Email Verification</h2>
                            </div>
                            <Form className="verification-form">
                                <FormGroup>
                                    <Label htmlFor="verification-email">Email address:</Label>
                                    <Input 
                                        type="email" 
                                        id="verification-email" 
                                        placeholder="Email address"
                                        defaultValue={this.props.login.user.data.email}
                                        onChange={
                                            (event) => this.handleEmailChange(event)
                                        }
                                    />
                                </FormGroup>
                                { this.state.isSent ? 
                                    <FormGroup>
                                        <p className="">Your email was resent successfully</p>
                                        <p className="">Check your email</p>
                                    </FormGroup>
                                :
                                    null
                                }
                                <FormGroup className="form-check d-flex align-items-center justify-content-between">
                                    <Button className="resend-button" onClick={this.handleResend.bind(this)}>Resend</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

export default withRouter( connect(mapStateToProps, null)(EmailVerification) );
