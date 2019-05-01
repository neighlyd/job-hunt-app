import React from 'react'

import JobListSummary from './JobListSummary'
import JobList from './JobList'
import Scores from './Scores'

const Dashboard = () => (
    <div>
        <JobListSummary/>
        <JobList/>
    </div>
)

export default Dashboard