import React from 'react'
import { Link } from 'react-router-dom'

export const JobListSummary = () => (
    <div>
        <h2>Job List Summary</h2>
        <Link to='/create' className='button'>Add Application</Link>
        
    </div>
)

export default JobListSummary