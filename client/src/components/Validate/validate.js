const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    if (!values.firstname) {
        errors.firstname = 'Required'
    }
    if (!values.lastname) {
        errors.lastname = 'Required'
    }
    return errors
}
  
export default validate  