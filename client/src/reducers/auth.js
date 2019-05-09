const isEmpty = require('is-empty')
const { 
    AUTH_REQUEST, 
    SET_CURRENT_USER, 
    AUTH_ERROR, 
    CLEAR_AUTH_ERROR, 
    SET_SCORES 
} = require('../actions/auth')

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
        case SET_SCORES:
            return {
                ...state,
                user: {
                    ...state.user,
                    momentum: action.payload.momentum,
                    resiliency: action.payload.resiliency,
                    social: action.payload.social,
                }
            }
        default:
            return state
    }
}