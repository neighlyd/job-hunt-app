import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import AddJobPage from '../components/AddJobPage'
import Dashboard from '../components/Dashboard'
import EditJobItem from '../components/EditJobItem'
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Header from '../components/Header'

export const history = createHistory()

const AppRouter = () => (
    <Router history={ history }>
            <Header />
            <Switch>
                <PublicRoute exact path='/' component={LoginPage}/>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/create' component={AddJobPage}/>
                <PrivateRoute path="/edit/:id" component={EditJobItem} />
                <Route component={NotFoundPage} />
            </Switch>
    </Router>
)

export default AppRouter