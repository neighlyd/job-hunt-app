import React from 'react';
import { connect } from 'react-redux';

import JobForm from './JobForm';
import { deleteJob, editJob } from '../actions/jobs'

export class EditJobItem extends React.Component {
    onRemove = (e) => {
        this.props.deleteJob(this.props.job._id)
        this.props.history.push('/')
    };

    onSubmit = (updates) => {
        this.props.editJob(this.props.job._id, updates)
        this.props.history.push('/')
    };

    render() {
        return (
            <div>
                <div className='page-header'>
                    <div className='container'>
                        <h1 className='page-header__title'>Edit Job</h1>
                    </div>
                </div>
                <div className='container'>
                    <JobForm
                        job={this.props.job}
                        onSubmit={this.onSubmit}
                        buttonLabel='Save Edits'
                        onDelete={this.onRemove}
                    />           
                </div>
            </div>
    )}
    
} 

const mapStateToProps = (state, props) => ({
        job: state.jobs.jobs.find((job) => job._id === props.match.params.id),
        jobs: state.jobs.jobs
});

const mapDispatchToProps = (dispatch) => ({
    deleteJob: (id) => dispatch(deleteJob({id})),
    editJob: (id, updates) => dispatch(editJob({id, updates}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditJobItem);