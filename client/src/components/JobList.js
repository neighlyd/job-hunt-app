import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import JobListItem from './JobListItem'
import selectJobs from '../selectors/jobs'

export const JobList = (props) => {

    return (
        <div className='list-container'>
            <div className='list-header'>
                <div className='show-for-mobile'>Jobs</div>
                <div className='show-for-desktop'>Job Title</div>
                <div className='show-for-desktop'>Company</div>
            </div>
            <div className='list-body'>
                {props.jobs.length === 0 ? (
                    <Link to='/create' className='list-item list-item__message'>
                            No Current Job Applications
                    </Link>
                ) : (
                    props.jobs.map((job) => (
                        <JobListItem
                            key={job._id}
                            {...job}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

// Only pass in the jobs we want to see, based on our current filters.
const mapStateToProps = (state) => {
    return {
        jobs: selectJobs(state.jobs.jobs, state.jobFilters)
    }
}

export default connect(mapStateToProps)(JobList)