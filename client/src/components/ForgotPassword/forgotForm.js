import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import validate from '../Validate/validate';
import asyncValidate from '../Validate/asyncValidate';
import renderField from '../widgets/renderField'

const ForgotForm = (props) =>{
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
            <FormGroup className="d-flex justify-content-end">
                <Link to="/login" className="btn btn-secondary btn-lg"> Login</Link>
                <Button type="submit" className="btn btn-secondary btn-lg ml-5" disabled={submitting}>Reset Password</Button>
            </FormGroup>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(ForgotForm)