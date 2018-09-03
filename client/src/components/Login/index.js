import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccessAction } from '../../actions';

class Login extends Component {

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
        this.login = this.login.bind(this)
    }

    handleEmailChange(event){
        this.setState({email:event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password:event.target.value})
    }

    login() {
        this.setState({
            signing: !this.state.signing
        })
        axios.post(`http://korfilm.loc/api/auth?email=${this.state.email}&password=${this.state.password}`)
        .then( (response) => {
                this.setState({
                    signing: !this.state.signing,
                })
                let data = response.data.data
                let token = response.data.access_token
                axios.defaults.headers.common['Authorization'] = token
                
                cookie.save('user-data', data, { path: '/' })
                cookie.save('user-token', token, { path: '/' })
                this.props.loginSuccess(response.data)
            },
            (error) => { 
                this.setState({
                    signing: !this.state.signing
                })
            }
        )
    }

    render() {
        return (
            <section className="loginPage">
                { this.props.login.user == null  ? null : <Redirect to="/"/> }
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-4">
                            <div className="text-center">
                                <h2>Profile Login</h2>
                            </div>
                            <Form className="login-form">
                                <FormGroup>
                                    <Label htmlFor="login-email">Email address:</Label>
                                    <Input type="email" id="login-email" onChange={this.handleEmailChange} placeholder="Email address"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="login-password">Password:</Label>
                                    <a className="float-right forgot-button">Forgot password?</a>
                                    <Input type="password" id="login-password" onChange={this.handlePasswordChange} placeholder="Password"/>
                                </FormGroup>
                                <FormGroup className="form-check d-flex align-items-center justify-content-between">
                                    <Label className="form-check-label">
                                        <Input type="checkbox"/> Remember me
                                    </Label>
                                    <Button className="login-button" onClick={this.login}>Login</Button>
                                </FormGroup>
                            </Form>
                            <div className="text-center">
                                <p className="">Don't have an account? 
                                    <Link to="/register" className="signup-button">  signup</Link>
                                </p>
                            </div>
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login) );
