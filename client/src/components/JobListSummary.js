import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import JobListFilterModal from './JobListFilterModal'

import filterJobs from '../selectors/jobs'

export class JobListSummary extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }
    
    handleOpenModal () {
        this.setState({ showModal: true })
    }
      
    handleCloseModal () {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <div className='page-header'>
                <div className='page-header__content'>
                    <div className='page-header__title'>
                        <h1>My Job List</h1>
                        <div className='show-for-mobile'><span className='green'>Momentum: {this.props.momentum}</span></div>                        
                        <div className='show-for-mobile'><span className='purple'>Resiliency: {this.props.resiliency}</span></div>
                        <i>(Displaying: {this.props.displayed} out of {this.props.total} jobs)</i>
                    </div>
                    <div className='page-header__actions'>
                        <button className='button' onClick={this.handleOpenModal}>
                            <i className="fas fa-filter"></i>
                        </button>
                        <button className='button' onClick={() => this.props.history.push('/create')}>
                            <i className="fas fa-plus-square fa-lg"></i>
                        </button>
                    </div>
                </div>
                <JobListFilterModal 
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                />
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    const displayed = filterJobs(state.jobs.jobs, state.jobFilters).length
    const total = state.jobs.jobs.length
    const resiliency = state.auth.user.resiliency
    const momentum = state.auth.user.momentum
    return {
        displayed,
        total,
        resiliency,
        momentum
    }
}

export default withRouter(connect(mapStateToProps)(JobListSummary))