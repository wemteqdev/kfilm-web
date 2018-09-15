import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccessAction } from '../../actions';
import serverURL from '../../variables';
import LoginForm from './loginForm';

class Login extends Component {

    state = {
        signing: false,
        errors: '',
        success: '', 
    }

    componentWillReceiveProps(nextProps) {
        let isLoggedIn = nextProps.login.user != null;
        if (isLoggedIn) {
            let isEmailVerified = nextProps.login.user.data.email_verified;
            if (isEmailVerified) {
                this.props.history.push('/');
            } else {
                this.props.history.push('/email-verification')
            }
        }
    }

    handleLogin = (values) => {
        this.setState({
            signing: true
        })
        axios.post(`${serverURL}/api/user/login?email=${values.email}&password=${values.password}`)
        .then(response => { 
            this.setState({
                signing: false
            })

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token

            cookie.save('user', response.data, { path: '/', maxAge: 3600 * 24 * 7 })
            this.props.loginSuccess(response.data)

            if (response.data.data.email_verified) {
                this.setState({
                    success: 'Login success',
                })
                setTimeout(() => {
                    this.props.history.push('/')
                }, 2000)
            } else {
                this.setState({
                    errors: 'Please verify your email',
                })
                setTimeout(() => {
                    this.props.history.push('/email-verification')
                }, 2000)
            }
        })
        .catch(error => {
            this.setState({
                signing: false,
                errors: error.response.data.error,
            })
        });
    }

    handleKeyEvent = (event) => {
        if (event.charCode === 13 || event.keyCode === 13) {
            this.login();
        }
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
                            <LoginForm onSubmit={this.handleLogin} errors={this.state.errors} success={this.state.success}/>
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
