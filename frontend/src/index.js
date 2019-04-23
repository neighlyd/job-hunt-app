import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import jwt_decode from 'jwt-decode'
import store, { history } from './store/configureStore'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import * as serviceWorker from './serviceWorker'

import { setCurrentUser } from './actions/auth'
import { getJobs } from './actions/jobs'
import setAuthToken from './api/setAuthToken'
import AppRouter from './router/AppRouter'
import LoadingPage from './components/LoadingPage'

const target = document.querySelector('#root')

const jsx = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <AppRouter/>
            </div>
        </ConnectedRouter>
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, target)
        hasRendered = true
    }
}

if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    const currentTime = Date.now() / 1000
    if (decoded.exp > currentTime){
        setAuthToken(token)
        store.dispatch(setCurrentUser(decoded))
        store.dispatch(getJobs())
    } else {
        store.dispatch(setCurrentUser())
    }
    // redirect here.
}

ReactDOM.render(jsx, target)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
