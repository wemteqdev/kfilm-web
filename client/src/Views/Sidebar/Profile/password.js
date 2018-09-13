import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../../variables';
import cookie from 'react-cookies';

class Password extends Component {

    state = {
        old_password: '',
        new_password: '',
        confirm_password: '',
        successUpdate: false
    }

    handleOldPassword = (event) => {
        this.setState({
            old_password: event.target.value,
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

    handleUpdatePassword = () => {
        axios.post(`${serverURL}/api/user/update_password?email=${this.props.login.user.data.email}&old_password=${this.state.old_password}&new_password=${this.state.new_password}`)
        .then(response => {
            console.log(response.data)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
            this.props.login.user.access_token = response.data.access_token
            cookie.save('user', this.props.login.user, { path: '/', maxAge: 3600 * 24 * 7 })
            this.props.loginSuccess(this.props.login.user.data)
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error.response)
            this.setState({
            })
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label htmlFor="old-password">Enter your KORFILM password:</Label>
                    <Input type="password" name="old-password" 
                        onChange={
                            (event) => this.handleOldPassword(event)
                        }
                    />
                    <a className="float-right forgot-button mt-3">Forgot password?</a>
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
                    <Button className="primary-button float-right" onClick={this.handleUpdatePassword}>Update</Button>
                </FormGroup>
            </Form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

export default withRouter( connect(mapStateToProps, null)(Password) );
