import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccessAction } from '../../actions';
import serverURL from '../../variables';

class Login extends Component {

    state = {
        email: '',
        password: '',
        signing: false,
        userInfo: {},
        token: '',
        tryAgain: '',
        successForget: false
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

    componentWillReceiveProps(nextProps) {
        let isLoggedIn = nextProps.login.user != null;
        if (isLoggedIn) {
            let isEmailVerified = nextProps.login.user.data.email_verified;
            if (isEmailVerified) {
                this.props.history.goBack();
            } else {
                this.props.history.push('/email-verification')
            }
        }
    }

    handleForgetPassword = () => {
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

    login() {
        this.setState({
            signing: true
        })
        axios.post(`${serverURL}/api/user/login?email=${this.state.email}&password=${this.state.password}`)
        .then(response => { 
            this.setState({
                signing: false
            })

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token

            cookie.save('user', response.data, { path: '/', maxAge: 3600 * 24 * 7 })
            this.props.loginSuccess(response.data)

            if (response.data.data.email_verified) {
                this.props.history.push('/')
            } else {
                this.props.history.push('/email-verification')
            }
        })
        .catch(error => {
            this.setState({
                signing: false,
                tryAgain: error.response.data.error,
            })
        });
    }

    render() {
        return (
            <section className="loginPage">
                {/* { this.props.login.user == null  ? null : <Redirect to="/"/> } */}
                <div className="container bg-light py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-8 col-11">
                            <div className="text-center">
                                <h2>Profile Login</h2>
                            </div>
                            <Form className="login-form">
                                {this.state.tryAgain!='' ?
                                    <FormGroup>
                                        <p className="alert alert-danger">{this.state.tryAgain}</p>
                                    </FormGroup>
                                :
                                    null
                                }
                                <FormGroup>
                                    <Label htmlFor="login-email">Email address:</Label>
                                    <Input type="email" id="login-email" onChange={this.handleEmailChange} placeholder="Email address"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="login-password">Password:</Label>
                                    <a className="float-right forgot-button"
                                        onClick={this.handleForgetPassword}
                                    >
                                        Forgot password?
                                    </a>
                                    {this.state.successForget?
                                        <p className="alert alert-success">Please check your email</p>
                                    :
                                        null
                                    }
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
                                    <Link to="/register">  signup</Link>
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
