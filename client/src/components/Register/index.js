import React from 'react';
import RegisterForm from './registerForm';
import axios from 'axios';
import serverURL from '../../variables';

const Register = (props) => {

    const handleSubmit = (values) => {
        axios.post(`${serverURL}/api/user/register?email=${values.email}&password=${values.password}&name=${values.firstname} ${values.lastname}&confirm_password=${values.confirm}`)
        .then( response => {
            props.history.push(`/login`)
        })
    }

    return (
        <section className="loginPage page-padding">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-4">
                        <div className="section-header text-center">
                            <h1 className="title">Sign UP</h1>
                        </div>
                        <RegisterForm onSubmit={handleSubmit}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
