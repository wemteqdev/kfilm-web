const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (values.password && values.password.length < 3){
        errors.password = 'Password must be more than 6 characters'
    }
    if (!values.confirm) {
        errors.confirm = 'Required'
    }
    if (values.password && values.confirm && values.confirm !== values.password){
        errors.confirm = "Your password doesn't match with your confirm password"
    }
    if (!values.firstname) {
        errors.firstname = 'Required'
    }
    if (values.firstname && values.firstname.length < 3){
        errors.firstname = 'First name must be more than 3 characters'
    }
    if (!values.lastname) {
        errors.lastname = 'Required'
    }
    if (values.lastname && values.lastname.length < 3){
        errors.lastname = 'Last name must be more than 3 characters'
    }
    return errors
}
  
export default validate  