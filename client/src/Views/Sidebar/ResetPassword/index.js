import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../../variables';

class ResetPassword extends Component {

    state = {
        email: '',
        new_password: '',
        confirm_password: '',
        successReset: false,
        tryAgain: '',
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleNewPassword = (event) => {
        this.setState({
            new_password: event.target.value,
        })
    }

    handleConfirmPassword = (event) => {
        this.setState({
            confirm_password: event.target.value,
        })
    }

    handleResetPassword = () => {
        if (this.state.new_password !== this.state.confirm_password) {
            return;
        }

        axios.post(`${serverURL}/api/user/password/reset?email=${this.state.email}&password=${this.state.new_password}&password_confirmation=${this.state.confirm_password}&token=${this.props.match.params.token}`)
        .then(response => { 
            this.setState({
                successReset: true,
            })
        })
        .catch(error => {
            this.setState({
                tryAgain: error.response.data.message,
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
                <FormGroup>
                    <Label htmlFor="new-password">New password:</Label>
                    <Input type="password" name="new-password" 
                        onChange={
                            (event) => this.handleNewPassword(event)
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="confirm-password">Confirm password:</Label>
                    <Input type="password" name="confirm-password" 
                        onChange={
                            (event) => this.handleConfirmPassword(event)
                        }
                    />
                </FormGroup>
                { this.state.new_password !== this.state.confirm_password ?
                    <FormGroup>
                        <p className="alert alert-danger">Password doesn't match</p>
                    </FormGroup>
                :
                    null
                }
                <FormGroup>
                    <Button className="primary-button float-right" onClick={this.handleResetPassword}>Reset</Button>
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
                                <h2>Reset Password</h2>
                            </div>
                            {this.state.successReset===false ?
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

export default withRouter( connect(mapStateToProps, null)(ResetPassword) );
