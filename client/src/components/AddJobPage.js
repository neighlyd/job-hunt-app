import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import { addJob } from '../actions/jobs'
import JobForm from './JobForm'

export class AddJobPage extends React.Component {
    onSubmit = (job) => {
        this.props.addJob(job)
        this.props.push('/')
    }
    
    render(){
        return (
        <div>
            {console.log('ping')}
            <div className='page-header'>
                <div className='container'>
                    <h1 className='page-header__title'>Add Expense</h1>
                </div>
            </div>
            <div className="container">
                <JobForm
                    onSubmit={this.onSubmit}
                    buttonLabel='Add'
                />
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addJob: (job) => dispatch(addJob(job)),
    push: (url) => dispatch(push(url))
})

export default connect(undefined, mapDispatchToProps)(AddJobPage)