import React from 'react'
import { Link } from 'react-router-dom'

export const JobListSummary = (props) => {

    return (
        <div className='page-header'>
            <div className='container'>
                <div className='page-header__content'>
                    <h1 className='page-header__title'>Job List Summary</h1>
                    <Link to='/create' className='button'>
                        Add Application
                    </Link>
                </div>
            </div>
        </div>    
    )
}

export default JobListSummary