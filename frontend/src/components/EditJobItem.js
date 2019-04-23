import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Redirect } from 'react-router-dom'

import JobForm from './JobForm'
import { deleteJob, editJob } from '../actions/jobs'

export class EditJobItem extends React.Component {
    onRemove = (e) => {
        this.props.deleteJob(this.props.job._id)
        this.props.changePage('/')
    }

    onSubmit = (updates) => {
        this.props.editJob(this.props.job._id, updates)
        this.props.changePage('/')
    }

    render() {
        return (
        <div>
            <h1>Edit Job</h1>
            <JobForm
                job={this.props.job}
                onSubmit={this.onSubmit}
                buttonLabel='Edit'
            />
            <button 
                onClick={this.onRemove}>Delete</button>
        </div>
    )}
    
} 

const mapStateToProps = (state, props) => ({
        job: state.jobs.jobs.find((job) => job._id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    deleteJob: (id) => dispatch(deleteJob({id})),
    editJob: (id, updates) => dispatch(editJob({id, updates})),
    changePage: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditJobItem)