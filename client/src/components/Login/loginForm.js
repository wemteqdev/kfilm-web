import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import validate from '../Validate/validate';
import asyncValidate from '../Validate/asyncValidate';
import renderField from '../widgets/renderField'

const LoginForm = (props) =>{
    const {handleSubmit, submitting, errors, success} = props

    const handleKeyEvent = (event) => {
        if (event.charCode === 13 || event.keyCode === 13) {
            handleSubmit()
        }
    }

    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            {errors && 
                <div className="alert alert-danger">{errors}</div>
            }
            {success && 
                <div className="alert alert-success">{success}</div>
            }
            <Field name="email" type="email" component={renderField} label="Email address:" handleKeyEvent={handleKeyEvent}/>
            <Field name="password" type="password" component={renderField} label="Password:" handleKeyEvent={handleKeyEvent}/>
            <div className="forgot d-flex justify-content-end mb-5">
                <Link className="forgot-button" to="/login/forgot_password">Forgot password?</Link>
            </div>
            <FormGroup className="form-check d-flex align-items-center justify-content-between">
                <Label className="form-check-label">
                    <Input type="checkbox"/> Remember me
                </Label>
                <Button type="submit" className="login-button" disabled={submitting}>Login</Button>
            </FormGroup>
            <div className="text-center">
                <p className="">Don't have an account? &nbsp;&nbsp;&nbsp;
                    <Link to="/register">Signup Now</Link>
                </p>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(LoginForm)