import React from 'react'
import { Link } from 'react-router-dom'
import JobListFilterModal from './JobListFilterModal'
import ResiliencyScorePage from './ResiliencyScorePage'
import MomentumScorePage from './MomentumScorePage'

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
            <div className='page-header__inline'>
                <ResiliencyScorePage />
                <div>
                    <div className='page-header__content'>
                        <h1 className='page-header__title'>Job List Summary</h1>
                    </div>
                    <div className='page-header__actions'>
                        <Link to='/create' className='button'>
                            Add Application
                        </Link>
                        <button className='button' onClick={this.handleOpenModal}>
                            Filter Jobs
                        </button>
                    </div>
                </div>
                <JobListFilterModal 
                    showModal={this.state.showModal}
                    handleCloseModal={this.handleCloseModal}
                />
                <MomentumScorePage/>
            </div>    
        )
    }
}

export default JobListSummary