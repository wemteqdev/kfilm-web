import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'reactstrap';
import validate from '../Validate/validate';
import asyncValidate from '../Validate/asyncValidate';
import renderField from '../widgets/renderField'

const RegisterForm = (props) =>{
    const {handleSubmit, submitting, errors, success} = props

    const handleKeyEvent = (event) => {
        if (event.charCode === 13 || event.keyCode === 13) {
            handleSubmit()
        }
    }

    return (
        <Form className="login-form" onSubmit={handleSubmit}>
            {success && 
                <div className="alert alert-success">{success}</div>
            }
            <Field name="firstname" type="text" component={renderField} label="First Name:" handleKeyEvent={handleKeyEvent}/>
            {errors.firstname && 
                <div className="alert alert-danger">{errors.firstname}</div>
            }
            <Field name="lastname" type="text" component={renderField} label="Last Name:" handleKeyEvent={handleKeyEvent}/>
            {errors.lastname && 
                <div className="alert alert-danger">{errors.lastname}</div>
            }
            <Field name="email" type="email" component={renderField} label="Email address:" handleKeyEvent={handleKeyEvent}/>
            {errors.email && 
                <div className="alert alert-danger">{errors.email}</div>
            }
            <Field name="password" type="password" component={renderField} label="Password:" handleKeyEvent={handleKeyEvent}/>
            {errors.password && 
                <div className="alert alert-danger">{errors.password}</div>
            }
            <Field name="confirm" type="password" component={renderField} label="Confirm password:" handleKeyEvent={handleKeyEvent}/>
            {errors.confirm_password && 
                <div className="alert alert-danger">{errors.confirm_password}</div>
            }
            <Button type="submit" className="login-button" disabled={submitting}>Sign Up</Button>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(RegisterForm)