import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import JobListItem from './JobListItem'
import selectJobs from '../selectors/jobs'

export const JobList = (props) => {

    return (
        <div className='list-body'>
            {props.jobs.length === 0 ? (
                <div className='list-item'>
                    <Link to='/create' className='link__hidden'>
                        <div className='list-item__body'>
                            <h3 className='list-item__title'>No Current Job Applications</h3>
                        </div>
                    </Link>
                </div>
            ) : (
                props.jobs.map((job) => (
                    <JobListItem
                        key={job._id}
                        {...job}
                    />
                ))
            )}
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