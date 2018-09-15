import React, { Component } from 'react';
import RegisterForm from './registerForm';
import axios from 'axios';
import serverURL from '../../variables';
import _ from 'lodash';

class Register extends Component {

    state = {
        errors: {},
    }

    handleSubmit = (values) => {
        axios.post(`${serverURL}/api/user/register?email=${values.email}&password=${values.password}&name=${values.firstname} ${values.lastname}&confirm_password=${values.confirm}`)
        .then( response => {
            this.props.history.push('/login')
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
                                <h1 className="title">Sign UP</h1>
                            </div>
                            <RegisterForm onSubmit={this.handleSubmit} errors={this.state.errors}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Register;