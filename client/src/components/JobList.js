import React from 'react'
import { connect } from 'react-redux'

import JobListItem from './JobListItem'

export const JobList = (props) => {

    return (<div className="container">
        <div>
            <h3>Job List</h3>
        </div>
        <div>
            {props.jobs.length === 0 ? (
                <div className="list-item list-item__message">
                    <span>No Current Job Applications</span>
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
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs
    }
}

export default connect(mapStateToProps)(JobList)