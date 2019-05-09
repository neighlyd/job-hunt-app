export const SET_TEXT_FILTER = 'SET_TEXT_FILTER'
export const SET_START_DATE = 'SET_START_DATE'
export const SET_END_DATE  = 'SET_END_DATE'
export const SORT_BY_ARCHIVED = 'SORT_BY_ARCHIVED'
export const SORT_BY_COMPANY = 'SORT_BY_COMPANY'
export const SORT_BY_DATE = 'SORT_BY_DATE'
export const SORT_BY_JOB = 'SORT_BY_JOB'

export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER,
    text
})

export const setStartDate = (startDate = undefined) => ({
    type: SET_START_DATE,
    startDate
})

export const setEndDate = (endDate = undefined) => ({
    type: SET_END_DATE,
    endDate
})

export const sortByArchived = () => ({
    type: SORT_BY_ARCHIVED
})

export const sortByCompany = () => ({
    type: SORT_BY_COMPANY
})

export const sortByDate = () => ({
    type: SORT_BY_DATE
})

export const sortByJob = () => ({
    type: SORT_BY_JOB
})