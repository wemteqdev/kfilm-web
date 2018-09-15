import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'reactstrap';
import validate from '../../../components/Validate/validate';
import asyncValidate from '../../../components/Validate/asyncValidate';
import renderField from '../../../components/widgets/renderField'

const VerifyForm = (props) =>{
    const {handleSubmit, submitting, errors, success, email} = props

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
            {errors.email && 
                <div className="alert alert-danger">{errors.email}</div>
            }
            <Button type="submit" className="login-button" disabled={submitting}>Resend</Button>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(VerifyForm)