const isEmpty = require('is-empty')
const { AUTH_REQUEST, SET_CURRENT_USER, AUTH_ERROR, CLEAR_AUTH_ERROR } = require('../actions/auth')

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {},
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return state
    }
}