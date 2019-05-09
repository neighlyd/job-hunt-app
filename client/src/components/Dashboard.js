import React from 'react'

import JobListSummary from './JobListSummary'
import JobList from './JobList'
import SideBar from './SideBar';

const Dashboard = () => (
    <div className='main'>
        <SideBar />
        <div className='main__center-content'>
            <JobListSummary />
            <JobList />
        </div>
    </div>
)

export default Dashboard