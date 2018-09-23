import React, { Component } from 'react';
import axios from 'axios';
import serverURL from '../../variables';
import RegisterForm from './registerForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

declare var $;

export default class Register extends Component {

    state = {
        errors: {},
    }

    handleRegister = (values) => {
        $('.page-loading').removeClass('d-none')

        axios.post(`${serverURL}/api/user/register?email=${values.email}&password=${values.password}&name=${values.firstname} ${values.lastname}&confirm_password=${values.confirm}`)
        .then( response => {
            this.setState({
                success: 'You have been registered successfully',
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

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <section className="loginPage page-padding">
                <div className="container bg-light">
                    <a className="float-right mt-3" onClick={this.goBack}> <FontAwesomeIcon icon='times'/> </a>
                    <div className="py-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                                <div className="text-center">
                                    <h1 className="title">Sign UP</h1>
                                </div>
                                <RegisterForm onSubmit={this.handleRegister} errors={this.state.errors}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
