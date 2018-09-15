import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'reactstrap';
import validate from '../Validate/validate';
import asyncValidate from '../Validate/asyncValidate';
import renderField from '../widgets/renderField'

const RegisterForm = (props) =>{
    const {handleSubmit, submitting, errors} = props
    console.log(props)
    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            <Field name="firstname" type="text" component={renderField} label="First Name:"/>
            {errors.firstname && 
                <div className="alert alert-danger">{errors.firstname}</div>
            }
            <Field name="lastname" type="text" component={renderField} label="Last Name:"/>
            {errors.lastname && 
                <div className="alert alert-danger">{errors.lastname}</div>
            }
            <Field name="email" type="email" component={renderField} label="Email address:"/>
            {errors.email && 
                <div className="alert alert-danger">{errors.email}</div>
            }
            <Field name="password" type="password" component={renderField} label="Password:"/>
            {errors.password && 
                <div className="alert alert-danger">{errors.password}</div>
            }
            <Field name="confirm" type="password" component={renderField} label="Confirm password:"/>
            {errors.confirm_password && 
                <div className="alert alert-danger">{errors.confirm_password}</div>
            }
            <div>
                <button type="submit" className="login-button btn btn-secondary" disabled={submitting}>Sign Up</button>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(RegisterForm)