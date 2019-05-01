import setAuthToken from '../api/setAuthToken'
import getErrors from './errors'
import { getJobs, clearJobs } from './jobs'
const axios = require('axios')

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const AUTH_REQUEST = 'AUTH_REQUEST'

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
})

const authRequest = () => ({
    type: AUTH_REQUEST
})

export const setUser = (user) => {
    return dispatch => {
        dispatch(authRequest())
        if (user) {
            axios
                .get('/users/me')
                    .then(res => {
                        dispatch(setCurrentUser(res.data))
                    })
                    .catch(err => {
                        dispatch(getErrors(err.message))
                    })
        } else {
            dispatch(setCurrentUser(user))
        }
    }
} 

export const login = ({
    email,
    password
}) => {
    return dispatch => {
        dispatch(authRequest())
        
        axios
            .post('/users/login', {
                email,
                password
            })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                setAuthToken(res.data.token)
                dispatch(setCurrentUser(res.data))
                dispatch(getJobs())
            })
            .catch(err => {
                dispatch(getErrors(err.message))
            })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(authRequest())
        axios
            .post('/users/logout')
            .then(res => {
                localStorage.removeItem('token')
                setAuthToken(false)
                dispatch(setCurrentUser({}))
                dispatch(clearJobs())
            })
            .catch(err => {
                dispatch(getErrors(err))
            })

    }
}