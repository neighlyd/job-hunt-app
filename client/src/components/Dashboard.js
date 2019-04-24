import React from 'react'
import JobListSummary from './JobListSummary'
import JobList from './JobList'

const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <JobListSummary/>
        <JobList/>
    </div>
)

export default Dashboard