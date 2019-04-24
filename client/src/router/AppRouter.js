import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AddJobPage from '../components/AddJobPage'
import Dashboard from '../components/Dashboard'
import EditJobItem from '../components/EditJobItem'
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => (
    <div>
        <main>
            <Switch>
                <PublicRoute exact path='/' component={LoginPage}/>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/create' component={AddJobPage}/>
                <PrivateRoute path="/edit/:id" component={EditJobItem} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    </div>
)

export default AppRouter