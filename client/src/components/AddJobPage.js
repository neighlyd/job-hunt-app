import React from 'react'
import { connect } from 'react-redux'

import { addJob } from '../actions/jobs'
import JobForm from './JobForm'

export class AddJobPage extends React.Component {
    onSubmit = (job) => {
        this.props.addJob(job)
        this.props.history.push('/')
    }
    
    render(){
        return (
        <div>
            <div className='page-header'>
                <div className='container'>
                    <h1 className='page-header__title'>Add Job</h1>
                </div>
            </div>
            <div className='container'>
                <JobForm
                    onSubmit={this.onSubmit}
                    buttonLabel='Add Job'
                />
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addJob: (job) => dispatch(addJob(job))
})

export default connect(undefined, mapDispatchToProps)(AddJobPage)