export const GET_ERRORS = 'GET_ERRORS'

export const getErrors = (error = '') => {
    return {
    type: GET_ERRORS,
    payload: error
}}

export default getErrors
