import { justifyPageMargin } from "../functions";

declare var $;

export const toggleSearchAction = () => {
    return {
        type: 'TOGGLE_SEARCH'
    }
}

export const loginSuccessAction = (payload) => {
    $('footer').addClass('d-none');
    justifyPageMargin('42px')
    return {
        type: 'LOGIN_SUCCESS',
        payload: payload
    }
}

export const logoutSuccessAction = () => {
    $('footer').removeClass('d-none');
    justifyPageMargin('0px')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const toggleSidebarAction = () => {
    return {
        type: 'TOGGLE_SIDEBAR'
    }
}

export const billLoadingAction = () => {
    return {
        type: 'BILL_LOADING'
    }
}

export const bannerAction = () => {
    return {
        type: 'BANNER_LOAD'
    }
}