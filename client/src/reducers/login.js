const login = (state = {undefined}, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {...state, user: action.payload}
      case 'LOGOUT_SUCCESS':
        return {...state, user: undefined}
      default:
        return state
    }
}

export default login;