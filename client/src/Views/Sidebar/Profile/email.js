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

    handleEmailSubmit = () => {
        axios.post(`${serverURL}/api/user/verification/resend?email=${this.state.email}`)
            .then( (response) => {
                if (response != null) {
                    this.setState({
                        isSent: true
                    })
                    if (response.data.data.email_verified) {
                    }
                }
            },
            (error) => { 
            }
        )
    }

    render() {
        return (
            <Form className="verification-form">
                <FormGroup>
                    <Label htmlFor="verification-email">Email address:</Label>
                    <Input 
                        type="email" 
                        id="verification-email" 
                        placeholder="Email address"
                        defaultValue={this.props.login.user.data.email}
                        onChange={
                            (event) => this.handleEmailChange(event)
                        }
                    />
                </FormGroup>
                { this.state.isSent ? 
                    <FormGroup>
                        <p className="">Your email was resent successfully</p>
                        <p className="">Check your email</p>
                    </FormGroup>
                :
                    null
                }
                <FormGroup className="form-check d-flex align-items-center justify-content-between">
                    <Button className="resend-button" onClick={this.handleEmailSubmit}>Change Email</Button>
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
