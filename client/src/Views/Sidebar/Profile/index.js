import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../../variables';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import VerifyForm from './verifyForm';
import UpdateForm from './updateForm';

class Profile extends Component {
    state = {
        email_errors: '',
        email_success: '', 
        password_errors: '',
        password_success: '', 
    }

    handleResend = (values) => {
        axios.post(`${serverURL}/api/user/verification/resend?email=${values.email}`)
        .then( (response) => {
            if (response.data.data.email_verified) {
                this.setState({
                    email_success: 'Email was verified successfully',
                })
            } else {
                this.setState({
                    email_success: 'Check your email',
                })
            }
        })
        .catch(error => {
            this.setState({
                email_errors: error.response.data.error,
            })
        });
    }

    handleUpdatePassword = (values) => {
        axios.post(`${serverURL}/api/user/update_password?email=${this.props.login.user.data.email}&old_password=${values.old_password}&new_password=${values.new_password}`)
        .then( (response) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token

            this.props.login.user.access_token = response.data.access_token
            cookie.save('user', this.props.login.user, { path: '/', maxAge: 3600 * 24 * 7 })
            this.props.loginSuccess(this.props.login.user.data)

            this.setState({
                password_success: response.data.message,
            })
            setTimeout(() => {
                this.props.history.push('/')
            }, 2000)
        })
        .catch(error => {
            console.log(error.response);
            this.setState({
                password_errors: error.response.data.error,
            })
        });
    }

    render() {
        return (
            <section className="loginPage">
                <div className="container bg-light py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h2>Profile</h2>
                            </div>
                            <VerifyForm onSubmit={this.handleResend} errors={this.state.email_errors} success={this.state.email_success} email={this.props.login.user.data.email}/>
                            <UpdateForm onSubmit={this.handleUpdatePassword} errors={this.state.password_errors} success={this.state.password_success}/>
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

export default withRouter( connect(mapStateToProps, null)(Profile) );
