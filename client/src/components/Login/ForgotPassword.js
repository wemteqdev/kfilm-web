import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../variables';

class ForgotPassword extends Component {

    state = {
        email: '',
        successForgot: false,
        tryAgain: '',
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleForgotPassword = () => {
        axios.post(`${serverURL}/api/user/password/email?email=${this.state.email}`)
        .then( (response) => {
            this.setState({
                tryAgain: '',
                successForget: true,
            })
        })
        .catch(error => {
            this.setState({
                tryAgain: error.response.data.error,
            })
        });
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    displayError = () => {
        return (
            <FormGroup>
                <p className="alert alert-danger">{this.state.tryAgain}</p>
            </FormGroup>
        )
    }

    displayForm = () => {
        return (
            <Form className="reset-form">
                {this.state.tryAgain !== '' ? 
                    this.displayError()
                :
                null
                }
                <FormGroup>
                    <Label htmlFor="email">Email address:</Label>
                    <Input 
                        type="email" 
                        id="email" 
                        placeholder="Email address"
                        onChange={
                            (event) => this.handleEmailChange(event)
                        }
                    />
                </FormGroup>
                {this.state.successForget?
                    <p className="alert alert-success">Please check your email</p>
                :
                    null
                }
                <FormGroup>
                    <Button className="primary-button float-right" 
                        onClick={
                            (event) => this.handleForgotPassword()
                        }>Send</Button>
                </FormGroup>
            </Form>
        )
    }

    displaySuccess = () => {
        return (
            <Form>
                <FormGroup>
                    <p className="alert alert-success">Password has been reset successfuly</p>
                </FormGroup>
                <FormGroup>
                    <Button className="primary-button float-right" onClick={this.handleLogin}>Login</Button>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return (
            <section className="resetPage">
                <div className="container bg-light py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h2>Forgot Password</h2>
                            </div>
                            {this.state.successForgot === false ?
                                this.displayForm()
                            :
                                this.displaySuccess()
                            }
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

export default withRouter( connect(mapStateToProps, null)(ForgotPassword) );
