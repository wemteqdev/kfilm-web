import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../Validate/validate';
import asyncValidate from '../Validate/asyncValidate';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
    <FormGroup>
        <Label htmlFor="login-email">{label}</Label>

    <div className={asyncValidating ? 'async-validating' : ''}>
        <Input type={type} {...input}/>
        {touched && error && <span>{error}</span>}
    </div>
    </FormGroup>
)

const Register = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <section className="loginPage page-padding">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-4">
                        <div className="section-header text-center">
                            <h1 className="title">Sign UP</h1>
                        </div>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Field name="firstname" type="text" component={renderField} label="First Name:"/>
                            <Field name="lastname" type="text" component={renderField} label="Last Name:"/>
                            <Field name="email" type="email" component={renderField} label="Email address:"/>
                            <Field name="password" type="password" component={renderField} label="Password:"/>
                            <div>
                                <button type="submit" className="login-button" disabled={submitting}>Sign Up</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default reduxForm({
  form: 'asyncValidation', // a unique identifier for this form
  validate,
  asyncValidate,
  asyncBlurFields: [ 'email' ]
})(Register)
