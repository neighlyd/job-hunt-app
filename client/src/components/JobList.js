import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import JobListItem from './JobListItem'

export const JobList = (props) => {

    return (
        <div className='list-container'>
            <div className='list-header'>
                <h3>Jobs</h3>
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

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs
    }
}

export default connect(mapStateToProps)(JobList)