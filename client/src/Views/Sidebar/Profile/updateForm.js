import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'reactstrap';
import validate from '../../../components/Validate/validate';
import asyncValidate from '../../../components/Validate/asyncValidate';
import renderField from '../../../components/widgets/renderField'

const UpdateForm = (props) =>{
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
            <Field name="old_password" type="password" component={renderField} label="Old password:" handleKeyEvent={handleKeyEvent}/>
            {errors.old_password && 
                <div className="alert alert-danger">{errors.password}</div>
            }
            <Field name="new_password" type="password" component={renderField} label="New password:" handleKeyEvent={handleKeyEvent}/>
            {errors.new_password && 
                <div className="alert alert-danger">{errors.password}</div>
            }
            <Field name="confirm_password" type="password" component={renderField} label="Confirm password:" handleKeyEvent={handleKeyEvent}/>
            {errors.confirm_password && 
                <div className="alert alert-danger">{errors.confirm_password}</div>
            }
            <Button type="submit" className="login-button" disabled={submitting}>Update</Button>
        </Form>
    )
}

export default reduxForm({
    form: 'asyncValidation', // a unique identifier for this form
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(UpdateForm)