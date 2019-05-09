import moment from 'moment'
const { 
    SET_TEXT_FILTER, 
    SET_START_DATE, 
    SET_END_DATE,
    SORT_BY_ARCHIVED,
    SORT_BY_DATE, 
    SORT_BY_COMPANY, 
    SORT_BY_JOB
} = require('../actions/jobFilters')

const initialState = {
    text: '',
    sortBy: 'Archived',
    archived: 'false',
    startDate: moment().startOf('year'),
    endDate: moment().endOf('month')
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text
            }
        case SORT_BY_ARCHIVED:
            return {
                ...state,
                sortBy: 'Archived'
            }
        case SORT_BY_DATE:
            return {
                ...state,
                sortBy: 'Date'
            }
        case SORT_BY_COMPANY:
            return {
                ...state,
                sortBy: 'Company'
            }
        case SORT_BY_JOB:
            return {
                ...state,
                sortBy: 'Job'
            }
        case SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate
            }
        case SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate
            }   
        default:
            return state
    }
}