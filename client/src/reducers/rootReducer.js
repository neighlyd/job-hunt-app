import { combineReducers } from 'redux'

import jobs from './jobs'
import auth from './auth'
import jobFilters from './jobFilters'

export default combineReducers ({
    jobs,
    auth,
    jobFilters
})