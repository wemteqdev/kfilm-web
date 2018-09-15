import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../variables';
import VerifyForm from './verifyForm';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class EmailVerification extends Component {

    state = {
        errors: '',
        success: '', 
    }

    componentWillReceiveProps(nextProps) {
        let isLoggedIn = nextProps.login.user != null;
        if (isLoggedIn) {
            let isEmailVerified = nextProps.login.user.data.email_verified;
            if (isEmailVerified) {
                this.props.history.push('/');
            }
        } else {
            this.props.history.push('/login');
        }
    }

    handleResend = (values) => {
        axios.post(`${serverURL}/api/user/verification/resend?email=${values.email}`)
        .then( (response) => {
            if (response.data.data.email_verified) {
                this.setState({
                    success: 'Email was verified successfully',
                })
                setTimeout(() => {
                    this.props.history.push('/')
                }, 1000)
            } else {
                this.setState({
                    success: 'Check your email',
                })
            }
        })
        .catch(error => {
            this.setState({
                errors: error.response.data.error,
            })
        });
    }

    render() {
        if (this.props.login.user == null) {
            return <div></div>;
        }
        return (
            <section className="loginPage">
                <div className="container bg-light py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h2>Email Verification</h2>
                            </div>
                            <VerifyForm onSubmit={this.handleResend} errors={this.state.errors} success={this.state.success} email={this.props.login.user.data.email}/>
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
