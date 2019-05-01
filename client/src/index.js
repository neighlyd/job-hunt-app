import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import configureStore, { history } from './store/configureStore'
import * as serviceWorker from './serviceWorker'

// React-Dates initialization
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

import './styles/styles.scss'

import { setUser } from './actions/auth'
import { getJobs } from './actions/jobs'
import setAuthToken from './api/setAuthToken'
import AppRouter from './router/AppRouter'
import LoadingPage from './components/LoadingPage'

const target = document.querySelector('#root')
const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, target)
        hasRendered = true
    }
}

const checkAuth = async () => {
    const token = localStorage.getItem('token')
    const currentTime = Date.now() / 1000
    let decoded;
    if (token) {
        decoded = jwt_decode(token)
    }
    if (token && decoded && decoded.exp > currentTime) {
        const decoded = jwt_decode(token)
        setAuthToken(token)
        await store.dispatch(setUser(decoded))
        await store.dispatch(getJobs())
        renderApp()
        if(history.location.pathname === '/'){
            history.push('/dashboard')
        }
    } else {
        await store.dispatch(setUser())
        renderApp()
        history.push('/')
    }
}

ReactDOM.render(<LoadingPage />, target)
checkAuth()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
