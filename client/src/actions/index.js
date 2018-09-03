export const toggleSearchAction = () => {
    return {
        type: 'TOGGLE_SEARCH'
    }
}

export const loginSuccessAction = (payload) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: payload
    }
}

export const logoutSuccessAction = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}