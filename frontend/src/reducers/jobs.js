const { 
    JOBS_LOADING, 
    ADD_JOB_SUCCESS, 
    GET_JOBS_SUCCESS,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_SUCCESS
} = require('../actions/jobs')

const initialState = {
    loading: false,
    jobs: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case JOBS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: [...state.jobs, action.payload]
            }
        case GET_JOBS_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: action.payload
            }
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: state.jobs.filter((job) => job._id !== action.payload)
            }
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
                jobs: state.jobs.map((job) => {
                    if (job._id === action.payload.id) {
                        return {
                            ...job,
                            ...action.payload.updates
                        }
                    } else {
                        return job
                    }
                })
            }
        default:
            return state
    }   
}