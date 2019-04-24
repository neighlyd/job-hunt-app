export const GET_ERRORS = 'GET_ERRORS'

const getErrors = error => ({
    type: GET_ERRORS,
    payload: error
})

export default getErrors
