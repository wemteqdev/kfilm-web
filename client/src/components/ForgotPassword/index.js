import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../variables';
import ForgotForm from './forgotForm';

export default class ForgotPassword extends Component {

    state = {
        errors: '',
        success: '',
    }

    handleResetPassword = (values) => {
        axios.post(`${serverURL}/api/user/password/email?email=${values.email}`)
        .then( (response) => {
            this.setState({
                success: 'Email sent. Please check your email.',
            })
            setTimeout(() => {
                this.props.history.push('/login')
            }, 2000)
        })
        .catch(error => {
            this.setState({
                errors: error.response.data.error,
            })
        });
    }

    render() {
        return (
            <section className="loginPage page-padding">
                <div className="container bg-light py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h1 className="title">Reset Password</h1>
                            </div>
                            <ForgotForm onSubmit={this.handleResetPassword} errors={this.state.errors} success={this.state.success}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
