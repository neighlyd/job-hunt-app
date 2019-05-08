import setAuthToken from '../api/setAuthToken'
import getErrors from './errors'
import { getJobs, clearJobs } from './jobs'
const axios = require('axios')

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_ERROR = 'AUTH_ERROR'
export const CLEAR_AUTH_ERROR = 'CLEAR_ERROR'

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
})

const authRequest = () => ({
    type: AUTH_REQUEST
})

const authError = error => ({
    type: AUTH_ERROR,
    payload: error
})

export const clearAuthError = () => ({
    type: CLEAR_AUTH_ERROR
})

export const setUser = (user) => {
    return dispatch => {
        dispatch(authRequest())
        
        if (user) {
            axios
                .get('/users/me')
                    .then(res => {
                        dispatch(setCurrentUser(res.data))
                        dispatch(getErrors())
                    })
                    .catch(err => {
                        dispatch(authError(err.response.data.error))
                    })
        } else {
            dispatch(setCurrentUser(user))
        }
    }
} 

export const login = ({
    email,
    password,
    rememberMe
}) => {
    return dispatch => {
        dispatch(authRequest())
        
        axios
            .post('/users/login', {
                email,
                password
            })
            .then(res => {
                if (rememberMe) {
                    localStorage.setItem('token', res.data.token)
                }
                setAuthToken(res.data.token)
                dispatch(setCurrentUser(res.data))
                dispatch(getJobs())
            })
            .catch(err => {
                dispatch(authError(err.response.data.error))
            })
    }
}

export const register = ({
    name,
    email,
    password,
    rememberMe
}) => {
    return dispatch => {
        dispatch(getErrors())
        dispatch(authRequest())

        axios
            .post('/users/', {
                name,
                email,
                password
            })
            .then(res => {
                if(rememberMe){
                    localStorage.setItem('token', res.data.token)
                }
                setAuthToken(res.data.token)
                dispatch(setCurrentUser(res.data))
                dispatch(getJobs())
            })
            .catch(err => {
                dispatch(authError(err.response.data.error))
            })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(authRequest())
        localStorage.removeItem('token')
        setAuthToken(false)
        dispatch(setCurrentUser({}))
        dispatch(clearJobs())
    }
}