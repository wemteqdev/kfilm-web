import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccessAction } from '../../actions';

class Profile extends Component {

    state = {
        email: '',
        password: '',
        signing: false,
        userInfo: {},
        token: ''
    }

    constructor(props){
        super(props)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleEmailChange(event){
        this.setState({email:event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password:event.target.value})
    }

    render() {
        return (
            <section className="loginPage bgWhite">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-4">
                            <div className="text-center">
                                <h2>Profile Password</h2>
                            </div>
                            <Form className="login-form">
                                <FormGroup>
                                    <Label htmlFor="current-password">Enter your KORFILM password:</Label>
                                    <Input type="password" id="current-password" onChange={this.handleEmailChange}/>
                                    <a className="float-right forgot-button mt-3">Forgot password?</a>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="new-password">New password:</Label>
                                    <Input type="password" id="new-password" onChange={this.handleEmailChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="confirm-password">Confirm new password:</Label>
                                    <Input type="password" id="confirm-password" onChange={this.handlePasswordChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button className="login-button"     >Save</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
                { this.state.signing &&
                <div className="loading-page">
                    <ReactLoading className="loading" type={'spinningBubbles'} color={'white'} height={40} width={40} />
                </div>}
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      login: state.login
    }
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (payload) => dispatch(loginSuccessAction(payload)),
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Profile) );
