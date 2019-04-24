import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/rootReducer'

export const history = createHistory()

// const initialState = {}
const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history)
]

// Set up Redux inspection debugger if we're in development
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
enhancers.push(devToolsExtension())
if (process.env.NODE_ENV === 'dev') {

    if (typeof devToolsExtension === 'function') {
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

export default () => {
    const store = createStore(
        rootReducer(history),
        composedEnhancers
    )
    return store
}