import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const renderField = ({
        input,
        label,
        type,
        name,
        meta: { asyncValidating, touched, error }
    }) => (
    <div>
        <Label htmlFor={name}>{label}</Label>
        <div className={asyncValidating ? 'async-validating' : ''}>
            <Input {...input} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const Password = (props) => {
    const { handleSubmit, submitting } = props

    return (
        <div>
            <div className="text-center">
                <h2>Profile Password</h2>
            </div>
            <Form className="login-form" onSubmit={handleSubmit} method="post">
                <FormGroup>
                    <Field
                        name="current-password"
                        type="password"
                        component={renderField}
                        label="Enter your KORFILM password:"
                    />
                    <a className="float-right forgot-button mt-3">Forgot password?</a>
                </FormGroup>
                <FormGroup>
                    <Field 
                        name="new-password"
                        type="password"
                        component={renderField}
                        label="New password:"
                    />
                </FormGroup>
                <FormGroup>
                    <Field 
                        name="confirm-password"
                        type="password"
                        component={renderField}
                        label="Confirm new password:"
                    />
                </FormGroup>
                <FormGroup>
                    <Button className="login-button" type="Submit" disabled={submitting} >Save</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default reduxForm({
    form: 'password'
})(Password);