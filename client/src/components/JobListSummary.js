import React from 'react'
import { withRouter } from 'react-router-dom'
import JobListFilterModal from './JobListFilterModal'
import ResiliencyScore from './ResiliencyScore'
import MomentumScore from './MomentumScore'

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
                    <h1 className='page-header__title'>My Job List</h1>
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

export default withRouter(JobListSummary)