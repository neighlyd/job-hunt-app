import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import jobs from './jobs'
import auth from './auth'
import errors from './errors'

export default (history) => combineReducers ({
    router: connectRouter(history),
    jobs,
    auth,
    errors
})