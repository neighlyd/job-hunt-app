import getErrors from './errors'
const axios = require('axios')

export const JOBS_LOADING = 'JOBS_LOADING'
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS'
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS'
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS'
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS'
export const CLEAR_JOBS_SUCCESS = 'CLEAR_JOBS_SUCCESS'

const jobsLoading = () => ({
    type: JOBS_LOADING
})

const addJobSuccess = job => ({
    type: ADD_JOB_SUCCESS,
    payload: {
        ...job
    }
})

const getJobsSuccess = jobs => ({
    type: GET_JOBS_SUCCESS,
    payload: jobs
})

const deleteJobSuccess = id => ({
    type: DELETE_JOB_SUCCESS,
    payload: id
})

const editJobSuccess = (id, updates) => ({
    type: EDIT_JOB_SUCCESS,
    payload: {
        id,
        updates
    }
})

const clearJobsSuccess = () => ({
    type: CLEAR_JOBS_SUCCESS
})

export const getJobs = () => {
    return dispatch => {
        dispatch(jobsLoading())
    
        axios
            .get('/jobs')
            .then(res => {
                dispatch(getJobsSuccess(res.data.jobs))
            })
            .catch(err => {
                dispatch(getErrors(err.message))
            })
    }

}

export const addJob = (job) => {
    return dispatch => {
        dispatch(jobsLoading())
        axios
            .post('/jobs', job)
            .then(res => {
                dispatch(addJobSuccess(res.data))
            })
            .catch(err => {
                dispatch(getErrors(err.message))
            })
    }
}

export const deleteJob = ({
    id
}) => {
    return dispatch => {
        dispatch(jobsLoading())
        axios
            .delete(`/jobs/${id}`)
            .then(res => {
                dispatch(deleteJobSuccess(id))
            })
            .catch(err => {
                dispatch(getErrors(err.message))
            })
    }
}

export const editJob = ({
    id,
    updates
}) => {
    return dispatch => {
        dispatch(jobsLoading())
        axios
            .patch(`jobs/${id}`, updates)
            .then(res => {
                dispatch(editJobSuccess(res.data.job._id, res.data.job))
            })
            .catch(err => {
                dispatch(getErrors(err.message))
            })
    }
}

export const clearJobs = () => {
    return dispatch => {
        dispatch(clearJobsSuccess())
    }
}