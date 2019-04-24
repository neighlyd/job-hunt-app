const isEmpty = require('is-empty')
const { AUTH_REQUEST, SET_CURRENT_USER } = require('../actions/auth')

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: {}
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
        default:
            return state
    }
}