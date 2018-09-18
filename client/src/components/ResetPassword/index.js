import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../variables';
import ResetForm from './resetForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ResetPassword extends Component {

    state = {
        errors : '',
        success: '',
    }

    handleResetPassword = (values) => {
        axios.post(`${serverURL}/api/user/password/reset?email=${values.email}&password=${values.new_password}&password_confirmation=${values.confirm_password}&token=${this.props.match.params.token}`)
        .then( (response) => {
            this.setState({
                success: response.data.message,
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
            <section className="loginPage">
                <div className="container bg-light">
                    <a className="float-right mt-3" onClick={this.goBack}> <FontAwesomeIcon icon='times'/> </a>
                    <div className="py-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                                <div className="text-center">
                                    <h2>Reset Password</h2>
                                </div>
                                <ResetForm onSubmit={this.handleResetPassword} errors={this.state.errors} success={this.state.success}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
