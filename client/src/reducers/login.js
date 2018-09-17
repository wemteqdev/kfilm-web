const login = (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {...state, user: action.payload}
      case 'LOGOUT_SUCCESS':
        return {...state, user: null}
      default:
        return state
    }
}

export default login;