import { combineReducers } from 'redux'

import jobs from './jobs'
import auth from './auth'
import errors from './errors'

export default combineReducers ({
    jobs,
    auth,
    errors
})