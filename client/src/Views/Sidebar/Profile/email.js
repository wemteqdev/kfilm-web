import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serverURL from '../../../variables';

class Email extends Component{
    state = {
        email: '',
        isSent: false,
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }

    handleEmailSubmit = (event) => {
        axios.post(`${serverURL}/api/user/verification/resend?email=${this.state.email}`)
        .then(response => {
            this.setState({
                isSent: true
            })
        })
        .catch(error => {
            console.log(error.response)
            this.setState({
            })
        });
    }

    render() {
        return (
            <Form className="login-form">
                <FormGroup>
                    <Label htmlFor="login-email">Email address:</Label>
                    <Input 
                        type="email" 
                        id="login-email" 
                        placeholder="Email address"
                        defaultValue={this.props.login.user.data.email}
                        onChange={
                            (event) => this.handleEmailChange(event)
                        }
                    />
                </FormGroup>
                { this.state.isSent && 
                    <FormGroup>
                        <p className="alert alert-success">Please check your email</p>
                    </FormGroup>
                }
                <FormGroup>
                    <Button className="primary-button" 
                        onClick={(event) => this.handleEmailSubmit(event)}
                    >Change Email</Button>
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

export default withRouter( connect(mapStateToProps, null)(Email) );
